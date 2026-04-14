/* ============================================================
   script.js  —  Tôi Ăn Cơm trailer engine

   This file contains NO data. All module data lives in
   modules.js (the single source of truth). This engine:

     1. Reads window.MODULES
     2. Clones the <template id="tacModuleTemplate"> for each entry
     3. Sets per-card CSS custom properties (accent color,
        shelf position, breathe delay) so styles.css stays
        slot-agnostic
     4. Wires up swap/add behavior: flip-rotate animation, two
        interaction modes (auto / user), idle auto-pull
     5. Centers the active content: SWAP uses a 1fr|auto|1fr
        grid; ADD uses flex-centered segments inside
        .mod-word-active.

   Adding a new card: append an object to window.MODULES.
   No edits to this file or styles.css are needed if the card
   uses an existing type ("swap" or "add").

   Adding a new card TYPE: register a new RENDERER and a new
   BEHAVIOR. The dispatch table at the bottom routes events
   by `module.type`.
   ============================================================ */

(() => {

  // ----- Tunables -----
  const SWAP_INTERVAL_MS = 4000;
  const FLIP_HALF_MS     = 350;
  const IDLE_AUTO_MS     = 20000;
  // Auto demo now runs indefinitely until the user interacts — the
  // page boots into auto mode so there's a live card on load, and it
  // keeps swapping until the first tap / Esc / close.
  const AUTO_DEMO_LENGTH = Infinity;

  // ----- DOM -----
  const library  = document.getElementById("tacLibrary");
  const template = document.getElementById("tacModuleTemplate");
  const hint     = document.getElementById("tacHint");

  if (!library || !template || !window.MODULES) {
    console.error("Tôi Ăn Cơm trailer: missing DOM or MODULES data");
    return;
  }

  // ----- Shelf layout: rectangular ring around the active card -----
  // Cards are distributed evenly along the PERIMETER of a rectangle
  // (not by angle — equal-angle distribution would be uneven on a
  // rectangle because the four edges have different lengths). Works
  // for any N >= 1: top/bottom edges are longer than the sides, so
  // they naturally receive proportionally more cards as N grows.
  //
  // Start offset is W/2 so the first card lands dead-center on the
  // top edge, which anchors the ring visually.
  //
  // Each card also picks up a small DETERMINISTIC pseudo-random
  // offset on top of its base rectangle position (y, z, rotY, rotZ).
  // This breaks the mechanical grid feel and makes the shelf read as
  // hand-placed rather than stamped from a stencil. Determinism (via
  // a sin-based hash of the index) means the layout is identical on
  // every reload — the "jitter" is part of the design, not a reroll.
  function computeShelf(n) {
    // Ring must be large enough to cleanly FRAME the active card.
    // The active card is scaled 1.1 with min-height 320px, so its
    // vertical half-extent is roughly 176px. H must leave clearance
    // above/below that, or the active card will occlude the top row.
    //
    // Ring center = library center = active card center = 0. Keeping
    // all three aligned means the library can be symmetric around
    // the ring with zero wasted space at top or bottom.
    const W = 1240;
    const H = 680;
    const Y_OFFSET = 0;
    const perim = 2 * (W + H);
    const step  = perim / n;
    const start = W / 2;

    // Hash 01: deterministic pseudo-random in [0, 1) from (i, salt).
    const r01 = (i, salt) => {
      const s = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    const positions = [];
    for (let i = 0; i < n; i++) {
      const d = (start + i * step) % perim;
      let x, y, rotY;

      if (d < W) {
        x = -W / 2 + d;
        y = -H / 2;
        rotY = 0;
      } else if (d < W + H) {
        x =  W / 2;
        y = -H / 2 + (d - W);
        rotY = -14;
      } else if (d < 2 * W + H) {
        x =  W / 2 - (d - W - H);
        y =  H / 2;
        rotY = 0;
      } else {
        x = -W / 2;
        y =  H / 2 - (d - 2 * W - H);
        rotY = 14;
      }

      const jy  = (r01(i, 1) - 0.5) * 44;   // ±22 px vertical drift
      const jz  = (r01(i, 2) - 0.5) * 120;  // ±60 px depth
      const jrY = (r01(i, 3) - 0.5) * 10;   // ±5° extra yaw
      const jrZ = (r01(i, 4) - 0.5) * 4;    // ±2° tilt

      positions.push({
        x,
        y:    y + jy + Y_OFFSET,
        z:    -120 + jz,
        rotY: rotY + jrY,
        rotZ: jrZ,
      });
    }
    return positions;
  }

  // ----- Display lowercase transform -----
  // RULE: everything rendered on a card is lowercase except
  // actual proper nouns. The cards are fragments, not complete
  // sentences, so capitalizing them lies about their status.
  // We apply this at display time so the data files stay
  // readable in their natural form — authors don't have to
  // manually lowercase every nuance_vi / nuance_en they write,
  // and kinship rank combos ("Bác Cả", "Anh Hai") come out of
  // their generator normally. The preserve list below restores
  // a handful of real proper nouns after the lowercase pass.
  // See CLAUDE.md "Content rules (hardcoded)".
  const PROPER_NOUNS = [
    "Tết",
    "Chí Phèo",
    "Tèo",
    "Hertz",
    "MAML",
    "Bắc Bộ", "Trung Bộ", "Nam Bộ",
  ];
  const PROPER_LC_MAP = PROPER_NOUNS.map(p => [p.toLowerCase(), p]);

  // Southern kinship-rank compound: "dì Tám", "anh Hai", "bác
  // Cả". The kinship role word stays lowercase (dì, anh, bác),
  // but the rank is a proper-name suffix and stays capitalized
  // — "dì Tám" is literally how she's addressed, like a name.
  // Also catches the same rank when it appears in quotes
  // ("thứ 'Hai'"), where it's a referential name.
  const KIN_PREFIX = "ông|bà|bác|chú|cô|dì|cậu|mợ|thím|dượng|anh|chị|má|ba|cha|o";
  const RANK_WORD  = "cả|hai|ba|tư|năm|sáu|bảy|tám|chín|mười|út";
  const KIN_RANK_RE    = new RegExp(`(^|[^\\p{L}])(${KIN_PREFIX}) (${RANK_WORD})(?![\\p{L}])`, "gu");
  const QUOTED_RANK_RE = new RegExp(`(["'\`])(${RANK_WORD})(["'\`])`, "g");
  const cap = w => w.charAt(0).toUpperCase() + w.slice(1);

  function lcDisplay(s) {
    if (typeof s !== "string" || !s) return s;
    let out = s.toLowerCase();
    for (const [lc, pn] of PROPER_LC_MAP) {
      if (out.includes(lc)) out = out.split(lc).join(pn);
    }
    out = out.replace(KIN_RANK_RE, (_, pre, kin, rank) => `${pre}${kin} ${cap(rank)}`);
    out = out.replace(QUOTED_RANK_RE, (_, q1, rank, q2) => `${q1}${cap(rank)}${q2}`);
    return out;
  }

  // ----- Segment rendering helper -----
  // ADD cards describe each bank entry as an array of segments:
  //   [{ text: "tôi",    hit: false },
  //    { text: "có",     hit: true  },
  //    { text: "ăn cơm", hit: false },
  //    { text: "đâu",    hit: true  }]
  // `hit: true` segments get the accent color (.seg-hit); others
  // are muted context (.seg-mute). This supports template pairs
  // where BOTH halves of a two-word clamp are highlighted at once.
  function renderSegments(el, segments) {
    el.replaceChildren();
    for (const seg of segments) {
      const span = document.createElement("span");
      span.className = seg.hit ? "seg-hit" : "seg-mute";
      span.textContent = lcDisplay(seg.text);
      el.appendChild(span);
    }
  }

  // ----- Entry → DOM writer -----
  // Writes a bank entry into a card's DOM without animation. Used
  // both for the initial preview (each inactive card shows a
  // different non-canonical variant so the shelf doesn't read as
  // ten copies of "tôi ăn cơm") and for reset() when a card is
  // released from active state — it returns to its own preview,
  // not the generic baseline.
  function applyEntry(card, entry) {
    if (card.module.type === "swap") {
      card.wordEl.textContent = lcDisplay(entry.word);
    } else if (card.module.type === "add") {
      renderSegments(card.wordEl, entry.segments);
    }
    card.footEnEl.textContent = lcDisplay(entry.en);
    card.footViEl.textContent = lcDisplay(entry.vi);
    card.current = entry;
  }

  // ----- Renderers (one per module type) -----
  // Both types reuse #tacModuleTemplate. The differences:
  //   SWAP — the module owns a fixed sentence [left, active, right].
  //          Only the middle .mod-word-active rotates per swap; left
  //          and right stay constant. Uses a 1fr|auto|1fr grid so
  //          the active word is pinned to the card center.
  //   ADD  — each bank entry brings its own segment list. All content
  //          lives inside .mod-word-active as child spans; left and
  //          right are empty and hidden (:empty). On flip we rebuild
  //          the segments at the midpoint and let the whole word
  //          container rotate as one.
  const RENDERERS = {
    swap(module) {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.slot = module.slot;
      node.dataset.id   = module.id;
      node.dataset.type = module.type;

      node.querySelector(".mod-kind").textContent   = "SWAP";
      node.querySelector(".mod-target").textContent = `"${lcDisplay(module.target)}"`;
      node.querySelector(".mod-left").textContent   = lcDisplay(module.sentence[0]);
      node.querySelector(".mod-word-active").textContent = lcDisplay(module.sentence[1]);
      node.querySelector(".mod-right").textContent  = lcDisplay(module.sentence[2]);
      node.querySelector(".mod-foot-en").textContent = lcDisplay(module.role.en);
      node.querySelector(".mod-foot-vi").textContent = lcDisplay(module.role.vi);

      return node;
    },

    add(module) {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.slot = module.slot;
      node.dataset.id   = module.id;
      node.dataset.type = module.type;

      const first = module.bank[0];         // canonical: usually the bare sentence

      node.querySelector(".mod-kind").textContent   = "ADD";
      node.querySelector(".mod-target").textContent = `"${lcDisplay(module.target)}"`;
      renderSegments(node.querySelector(".mod-word-active"), first.segments);
      node.querySelector(".mod-foot-en").textContent = lcDisplay(module.role.en);
      node.querySelector(".mod-foot-vi").textContent = lcDisplay(module.role.vi);

      return node;
    },
  };

  // ----- Behaviors (one per module type) -----
  // Each behavior knows how to advance / reset its own card state.

  // Fisher-Yates shuffle, returns a NEW array
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Shared queue helpers: both SWAP and ADD use Fisher-Yates on the
  // whole bank and compare by `word` for uniqueness. Within one cycle
  // no word repeats.
  function buildQueueGeneric(card) {
    const q = shuffle(card.module.bank);
    if (q.length > 1 && card.current && q[0].word === card.current.word) {
      [q[0], q[1]] = [q[1], q[0]];
    }
    return q;
  }

  function pickNextGeneric(card) {
    if (!card.queue || card.queue.length === 0) {
      card.queue = buildQueueGeneric(card);
    }
    let next = card.queue.shift();
    if (next.word === card.current.word && card.queue.length > 0) {
      card.queue.push(next);
      next = card.queue.shift();
    }
    return next;
  }

  const BEHAVIORS = {
    // SWAP: only the middle .mod-word-active rotates. Left and right
    // stay constant per card (module.sentence[0] and [2]).
    swap: {
      buildQueue: buildQueueGeneric,
      pickNext:   pickNextGeneric,

      flip(card, entry) {
        if (card.flipping) return;
        card.flipping = true;

        const el = card.wordEl;
        el.classList.remove("flip-out", "flip-in");
        void el.offsetWidth;

        el.classList.add("flip-out");
        card.current = entry;

        setTimeout(() => {
          el.textContent = lcDisplay(entry.word);
          el.classList.remove("flip-out");
          void el.offsetWidth;
          el.classList.add("flip-in");

          card.footEnEl.textContent = lcDisplay(entry.en);
          card.footViEl.textContent = lcDisplay(entry.vi);

          setTimeout(() => { card.flipping = false; }, FLIP_HALF_MS);
        }, FLIP_HALF_MS);
      },

      reset(card) {
        const target = card.preview || card.module.bank[0];
        if (card.current.word === target.word) return;
        card.wordEl.classList.remove("flip-out", "flip-in");
        applyEntry(card, target);
        card.flipping = false;
      },
    },

    // ADD: .mod-word-active holds the whole sentence as segment
    // children. At the midpoint of the flip — when the container
    // is edge-on and invisible — we rebuild the segments in a
    // single synchronous pass. The user sees the whole sentence
    // rotate as one unit, with the new content appearing after
    // the fold. Template pairs (two highlights at once) fall out
    // for free because rebuild takes a segment list of any shape.
    add: {
      buildQueue: buildQueueGeneric,
      pickNext:   pickNextGeneric,

      flip(card, entry) {
        if (card.flipping) return;
        card.flipping = true;

        const el = card.wordEl;
        el.classList.remove("flip-out", "flip-in");
        void el.offsetWidth;

        el.classList.add("flip-out");
        card.current = entry;

        setTimeout(() => {
          renderSegments(el, entry.segments);

          el.classList.remove("flip-out");
          void el.offsetWidth;
          el.classList.add("flip-in");

          card.footEnEl.textContent = lcDisplay(entry.en);
          card.footViEl.textContent = lcDisplay(entry.vi);

          setTimeout(() => { card.flipping = false; }, FLIP_HALF_MS);
        }, FLIP_HALF_MS);
      },

      reset(card) {
        const target = card.preview || card.module.bank[0];
        if (card.current.word === target.word) return;
        card.wordEl.classList.remove("flip-out", "flip-in");
        applyEntry(card, target);
        card.flipping = false;
      },
    },
  };

  // ----- Build cards from MODULES -----
  // Defensive: if a module references a bank that hasn't been wired
  // up yet (e.g. data file still in progress), skip it with a warning
  // instead of throwing. One missing bank must not break the whole
  // trailer — the remaining cards still render and position correctly.
  const cards = window.MODULES.map(module => {
    const renderer = RENDERERS[module.type];
    if (!renderer) {
      console.warn(`No renderer for module type "${module.type}"`);
      return null;
    }
    if (!Array.isArray(module.bank) || module.bank.length === 0) {
      console.warn(`Module "${module.id}" has no bank yet — skipping`);
      return null;
    }
    const el = renderer(module);
    library.appendChild(el);

    return {
      module,
      el,
      leftEl:   el.querySelector(".mod-left"),
      wordEl:   el.querySelector(".mod-word-active"),
      rightEl:  el.querySelector(".mod-right"),
      footEnEl: el.querySelector(".mod-foot-en"),
      footViEl: el.querySelector(".mod-foot-vi"),
      modeEl:   el.querySelector(".mod-mode"),
      current:  module.bank[0],   // canonical = first bank entry
      flipping: false,
    };
  }).filter(Boolean);

  // Apply shelf positions + breathe delays + derived accent color.
  //
  // RULE: a card's --accent is DERIVED from its index via HSL,
  // never hardcoded in modules.js. With N cards evenly spaced
  // around the hue wheel (+ a starting offset so we avoid pure
  // red), every card is guaranteed a visually distinct hue no
  // matter how many cards you add. Saturation/lightness are
  // tuned once here for the Japanese/Swiss restraint palette —
  // rich but not neon.
  const shelf = computeShelf(cards.length);
  const HUE_OFFSET = 15;        // start past pure red
  const SAT        = 62;        // %
  const LIGHT      = 42;        // %
  cards.forEach((card, i) => {
    const p = shelf[i];
    card.el.style.setProperty("--shelf-x",    `${p.x}px`);
    card.el.style.setProperty("--shelf-y",    `${p.y}px`);
    card.el.style.setProperty("--shelf-z",    `${p.z}px`);
    card.el.style.setProperty("--shelf-roty", `${p.rotY}deg`);
    card.el.style.setProperty("--shelf-rotz", `${p.rotZ}deg`);
    card.el.style.setProperty("--breathe-delay", `${i * 0.6}s`);
    // z-index lives in a CSS variable so the .is-active stylesheet rule
    // (which uses a higher specificity selector) can override it without
    // fighting an inline style.
    card.el.style.setProperty("--shelf-z-index", i + 1);

    const hue = (i / cards.length) * 360 + HUE_OFFSET;
    card.el.style.setProperty("--accent", `hsl(${hue} ${SAT}% ${LIGHT}%)`);
  });

  // ----- Per-card preview ---------------------------------------
  // Each card picks a non-canonical entry from its bank as the
  // displayed preview, so the shelf at rest doesn't read as ten
  // copies of "tôi ăn cơm". Deterministic by card index — same
  // variant every reload, so the layout stays stable.
  cards.forEach((card, i) => {
    const bank = card.module.bank;
    card.preview = bank.length > 1
      ? bank[1 + (i % (bank.length - 1))]
      : bank[0];
    applyEntry(card, card.preview);
  });

  // ----- State -----
  let activeCard = null;
  let activeMode = null;          // 'auto' | 'user' | null
  let cycleTimer = null;
  let idleTimer  = null;
  let autoDemoSwapsLeft = 0;

  // ----- Mode indicator helpers -----
  function setModeIndicator(card, mode) {
    if (!card.modeEl) return;
    if (mode === "auto")      card.modeEl.textContent = "auto · 4s · tap to control";
    else if (mode === "user") card.modeEl.textContent = "tap card to swap →";
    else                      card.modeEl.textContent = "";
  }

  // ----- Behavior dispatch -----
  function advance(card) {
    const beh = BEHAVIORS[card.module.type];
    if (!beh) return;
    const next = beh.pickNext(card);
    beh.flip(card, next);
  }

  function resetCard(card) {
    BEHAVIORS[card.module.type]?.reset(card);
  }

  // ----- Engage / release -----
  function engageCard(card, mode) {
    if (activeCard && activeCard !== card) {
      stopCycle();
      resetCard(activeCard);
      activeCard.el.classList.remove("is-active");
      setModeIndicator(activeCard, null);
    }

    activeCard = card;
    activeMode = mode;
    card.el.classList.add("is-active");
    library.classList.add("has-active");
    setModeIndicator(card, mode);

    // Fresh cycle = fresh shuffle. Wipes any leftover queue from a prior engage.
    card.queue = null;

    // First swap right away — gives instant feedback that the card is alive
    advance(card);

    stopCycle();
    if (mode === "auto") {
      autoDemoSwapsLeft = AUTO_DEMO_LENGTH - 1;
      cycleTimer = setInterval(() => {
        if (!activeCard) return;
        advance(activeCard);
        autoTickReleaseIfDone();
      }, SWAP_INTERVAL_MS);
    } else {
      autoDemoSwapsLeft = 0;
    }
  }

  function releaseCard() {
    if (!activeCard) return;
    stopCycle();
    resetCard(activeCard);
    activeCard.el.classList.remove("is-active");
    setModeIndicator(activeCard, null);
    activeCard = null;
    activeMode = null;
    library.classList.remove("has-active");
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  function autoTickReleaseIfDone() {
    if (autoDemoSwapsLeft > 0) {
      autoDemoSwapsLeft -= 1;
      if (autoDemoSwapsLeft === 0) {
        setTimeout(() => {
          if (activeMode === "auto") {
            releaseCard();
            scheduleIdleAutoPull();
          }
        }, SWAP_INTERVAL_MS - 200);
      }
    }
  }

  // ----- Idle auto-pull -----
  function scheduleIdleAutoPull() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (activeCard) return;
      const card = cards[Math.floor(Math.random() * cards.length)];
      engageCard(card, "auto");
    }, IDLE_AUTO_MS);
  }

  function noteUserActivity() {
    if (idleTimer) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  // ----- Click handler: heart of the user/auto mode logic -----
  function handleCardClick(card) {
    noteUserActivity();

    if (activeCard !== card) {
      engageCard(card, "user");
      return;
    }

    // Click on the active card
    if (activeMode === "auto") {
      stopCycle();
      activeMode = "user";
      setModeIndicator(card, "user");
      autoDemoSwapsLeft = 0;
    }

    if (!card.flipping) advance(card);
  }

  // ----- Wire events -----
  cards.forEach(card => {
    card.el.addEventListener("click", (e) => {
      if (e.target.closest(".mod-close")) return;
      handleCardClick(card);
    });

    card.el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleCardClick(card);
      }
    });

    const closeBtn = card.el.querySelector(".mod-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        noteUserActivity();
        releaseCard();
      });
    }
  });

  library.addEventListener("mouseleave", () => {
    if (activeMode === "user") releaseCard();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeCard) {
      noteUserActivity();
      releaseCard();
    }
  });

  // ----- Boot -----
  // Open the page with a live auto-mode card so the trailer never
  // starts cold. A random card gets engaged immediately and keeps
  // cycling until the user interacts (click, Esc, close button). On
  // release, the idle scheduler takes over and auto-pulls again
  // after IDLE_AUTO_MS of quiet.
  if (cards.length > 0) {
    const first = cards[Math.floor(Math.random() * cards.length)];
    engageCard(first, "auto");
  }

})();
