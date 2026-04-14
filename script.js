/* ============================================================
   script.js  —  Tôi Ăn Cơm trailer engine

   This file contains NO data. All module data lives in
   modules.js (the single source of truth). This engine:

     1. Reads window.MODULES
     2. Clones the <template id="tacModuleTemplate"> for each entry
     3. Sets per-card CSS custom properties (accent color,
        shelf position, breathe delay) so styles.css stays
        slot-agnostic
     4. Wires up swap behavior: flip-rotate animation, two
        interaction modes (auto / user), idle auto-pull
     5. Centers the active swapped word via the
        1fr | auto | 1fr grid in styles.css

   Adding a new SWAP card: append an object to window.MODULES.
   No edits to this file or styles.css are needed.

   Adding a new card TYPE (addrem, overlapping, …): register
   a new RENDERER and a new BEHAVIOR. The dispatch table at
   the bottom routes events by `module.type`.
   ============================================================ */

(() => {

  // ----- Tunables -----
  const SWAP_INTERVAL_MS = 4000;
  const FLIP_HALF_MS     = 350;
  const IDLE_AUTO_MS     = 20000;
  const AUTO_DEMO_LENGTH = 5;

  // ----- DOM -----
  const library  = document.getElementById("tacLibrary");
  const template = document.getElementById("tacModuleTemplate");
  const hint     = document.getElementById("tacHint");

  if (!library || !template || !window.MODULES) {
    console.error("Tôi Ăn Cơm trailer: missing DOM or MODULES data");
    return;
  }

  // ----- Shelf layout: distribute N cards along a curved row -----
  // Side cards lean inward, depth recedes from the front-right.
  // Pure formula — works for any N >= 1.
  function computeShelf(n) {
    const positions = [];
    const xStep = 320;
    const lift  = 60;
    const center = (n - 1) / 2;

    for (let i = 0; i < n; i++) {
      const offset = i - center;            // -…, 0, …, +…
      const t = n === 1 ? 0 : (i / (n - 1)) * 2 - 1;  // -1 → +1
      positions.push({
        x:    offset * xStep,
        y:    lift,
        z:    -Math.abs(offset) * 80,
        rotY: -t * 18,                      // leftmost +18°, rightmost -18°
        rotZ: -offset * 1,
      });
    }
    return positions;
  }

  // ----- Renderers (one per module type) -----
  const RENDERERS = {
    swap(module) {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.slot = module.slot;
      node.dataset.id   = module.id;
      node.dataset.type = module.type;

      node.style.setProperty("--accent", module.color);

      node.querySelector(".mod-target").textContent = `"${module.target}"`;
      node.querySelector(".mod-left").textContent   = module.sentence[0];
      node.querySelector(".mod-word-active").textContent = module.sentence[1];
      node.querySelector(".mod-right").textContent  = module.sentence[2];
      node.querySelector(".mod-foot-en").textContent = module.role.en;
      node.querySelector(".mod-foot-vi").textContent = module.role.vi;

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

  const BEHAVIORS = {
    swap: {
      // Build a fresh shuffled queue. When the queue is exhausted, the
      // engine reshuffles — so within one cycle no word repeats.
      buildQueue(card) {
        const q = shuffle(card.module.bank);
        // Avoid starting the new queue with the word that's currently shown
        if (q.length > 1 && card.current && q[0].word === card.current.word) {
          [q[0], q[1]] = [q[1], q[0]];
        }
        return q;
      },

      pickNext(card) {
        if (!card.queue || card.queue.length === 0) {
          card.queue = BEHAVIORS.swap.buildQueue(card);
        }
        let next = card.queue.shift();
        // Defensive: if the queue happened to start with the current word,
        // rotate it to the back and take the next one
        if (next.word === card.current.word && card.queue.length > 0) {
          card.queue.push(next);
          next = card.queue.shift();
        }
        return next;
      },

      flip(card, entry) {
        if (card.flipping) return;
        card.flipping = true;

        const el = card.wordEl;
        el.classList.remove("flip-out", "flip-in");
        void el.offsetWidth;

        el.classList.add("flip-out");
        card.current = entry;

        setTimeout(() => {
          el.textContent = entry.word;
          el.classList.remove("flip-out");
          void el.offsetWidth;
          el.classList.add("flip-in");

          card.footEnEl.textContent = entry.en;
          card.footViEl.textContent = entry.vi;

          setTimeout(() => { card.flipping = false; }, FLIP_HALF_MS);
        }, FLIP_HALF_MS);
      },

      reset(card) {
        const canon = card.module.bank[0];
        if (card.current.word === canon.word) return;
        const el = card.wordEl;
        el.classList.remove("flip-out", "flip-in");
        el.textContent = canon.word;
        card.current  = canon;
        card.flipping = false;
        card.footEnEl.textContent = canon.en;
        card.footViEl.textContent = canon.vi;
      },
    },
  };

  // ----- Build cards from MODULES -----
  const cards = window.MODULES.map(module => {
    const renderer = RENDERERS[module.type];
    if (!renderer) {
      console.warn(`No renderer for module type "${module.type}"`);
      return null;
    }
    const el = renderer(module);
    library.appendChild(el);

    return {
      module,
      el,
      wordEl:   el.querySelector(".mod-word-active"),
      footEnEl: el.querySelector(".mod-foot-en"),
      footViEl: el.querySelector(".mod-foot-vi"),
      modeEl:   el.querySelector(".mod-mode"),
      current:  module.bank[0],   // canonical = first bank entry
      flipping: false,
    };
  }).filter(Boolean);

  // Apply shelf positions + breathe delays
  const shelf = computeShelf(cards.length);
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
  });

  // Hint text (rendered from card count so it stays accurate)
  if (hint) {
    hint.querySelector(".en").textContent =
      `${cards.length} of many modules · more on the way`;
    hint.querySelector(".vi").textContent =
      `${cards.length} trong số nhiều thẻ · sẽ có thêm nữa`;
  }

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
  scheduleIdleAutoPull();

})();
