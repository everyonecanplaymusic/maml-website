// Shared engine for repertoire pages.
//
// Two entry points:
//   - A subpage (repertoire/<slug>/index.html) with <body data-slug="...">
//     and an empty <main id="rep-main"> → renderSubpage()
//   - The index page (repertoire.html) with <div id="rep-index"> →
//     renderIndex()
//
// Both read from window.REPERTOIRE (single source of truth).

(function () {
  const REP = window.REPERTOIRE || [];

  // ----- tiny DOM helper -----
  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") el.className = attrs[k];
        else if (k === "html") el.innerHTML = attrs[k];
        else if (k.startsWith("on") && typeof attrs[k] === "function") {
          el.addEventListener(k.slice(2), attrs[k]);
        } else if (attrs[k] != null) {
          el.setAttribute(k, attrs[k]);
        }
      }
    }
    if (children) {
      for (const c of [].concat(children)) {
        if (c == null) continue;
        el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      }
    }
    return el;
  }

  // Asset path is relative to the current HTML file:
  //   subpage  repertoire/<slug>/index.html → asset = "level-1.png"
  //   index    repertoire.html              → asset = "repertoire/<slug>/thumbnail.jpg"
  function assetPath(slug, file, mode) {
    return mode === "index" ? `repertoire/${slug}/${file}` : file;
  }

  // ----- YouTube facade: thumbnail + play button, iframe on click -----
  // Single-track playback: activating one facade reverts the previous
  // active facade back to its thumbnail state. Removing the iframe is
  // what actually stops playback — there's no JS API call needed for
  // the unprivileged embed.
  let activeFacade = null;

  function buildFacadeThumb(wrap) {
    const id = wrap.getAttribute("data-id");
    const label = wrap._ytLabel || "";
    wrap.innerHTML = "";
    wrap.appendChild(h("img", {
      class: "yt-thumb",
      src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      alt: label || "YouTube video thumbnail",
      loading: "lazy",
    }));
    wrap.appendChild(h("button", {
      type: "button",
      class: "yt-play",
      "aria-label": "Play " + (label || "video"),
    }, "▶"));
  }

  function activateFacade(wrap) {
    if (activeFacade && activeFacade !== wrap) {
      buildFacadeThumb(activeFacade);
    }
    const id = wrap.getAttribute("data-id");
    const label = wrap._ytLabel || "";
    wrap.innerHTML = "";
    wrap.appendChild(h("iframe", {
      class: "yt-iframe",
      src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      title: label || "YouTube video",
      frameborder: "0",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowfullscreen: "",
    }));
    activeFacade = wrap;
  }

  function youtubeFacade(id, label) {
    const wrap = h("div", { class: "yt-facade", "data-id": id });
    wrap._ytLabel = label;
    buildFacadeThumb(wrap);
    wrap.addEventListener("click", () => {
      // Only activate if the facade is still in thumbnail state — clicks
      // inside the iframe (once mounted) are swallowed by the YouTube
      // player, not us, so this guard is belt-and-suspenders.
      if (!wrap.querySelector(".yt-iframe")) {
        activateFacade(wrap);
      }
    });
    return wrap;
  }

  // ----- Lightbox: one instance, injected on first use -----
  // Subpages don't carry the overlay markup; the engine builds it once
  // per page load so every subpage gets a lightbox for free.
  function wireLightbox() {
    let box = document.getElementById("lightbox");
    if (!box) {
      box = h("div", {
        id: "lightbox",
        class: "lightbox",
        "aria-hidden": "true",
        role: "dialog",
      }, [
        h("div", { class: "lightbox-bar" }, [
          h("span", { class: "lightbox-hint" }, [
            h("span", { class: "en" }, "tap outside or × to close · pinch to zoom"),
            h("span", { class: "vi" }, "nhấn ngoài hay × để đóng · chụm để phóng to"),
          ]),
          h("button", {
            type: "button",
            class: "lightbox-close",
            "aria-label": "Close",
          }, "×"),
        ]),
        h("div", { class: "lightbox-scroll" },
          h("img", { class: "lightbox-img", alt: "" })),
      ]);
      document.body.appendChild(box);
    }
    const img = box.querySelector(".lightbox-img");
    const scroll = box.querySelector(".lightbox-scroll");

    function open(src, alt) {
      img.src = src;
      img.alt = alt || "";
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      if (scroll) scroll.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    function close() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      img.src = "";
    }

    // Close on: × button, backdrop tap, image single-tap (pinch still zooms
    // because pinch is two-finger and doesn't fire click), Esc key.
    box.addEventListener("click", (e) => {
      if (
        e.target === box ||
        e.target === scroll ||
        e.target === img ||
        e.target.classList.contains("lightbox-close") ||
        e.target.closest(".lightbox-close")
      ) {
        close();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
    return open;
  }

  // ----- Horizontal strip: signal | video | signal | video | ... -----
  // Free horizontal scroll, thin scrollbar, no prev/next buttons. Each
  // video is prefixed by a small signal slot that shows its phrase label.
  // Pattern borrowed from anhthuphan.com/media.html band-track layout.
  // Derive a signal block {head, num} from a video's label. Priority:
  //   1. explicit v.signal (authored in data)
  //   2. "Phrase(s) N"          → {phrase, N}   (ly-ngua-o style)
  //   3. "Level N"               → {level, N}
  //   4. short label ≤10 chars   → {"", label}
  //   5. fallback sequential     → {video, NN}  (e.g. video 03)
  function signalFor(v, idx) {
    if (v.signal) return v.signal;
    const label = (v.label || "").trim();
    let m = label.match(/^(Phrases?)\s+(.+)$/i);
    if (m) return { head: m[1].toLowerCase(), num: m[2] };
    m = label.match(/^Level\s+(\d+)/i);
    if (m) return { head: "level", num: m[1] };
    if (label && label.length <= 10) return { head: "", num: label };
    return { head: "video", num: String(idx + 1).padStart(2, "0") };
  }

  function signalSlot(signal) {
    return h("div", { class: "rep-slot rep-slot-signal" }, [
      h("span", { class: "rep-sig-mark" }, "●"),
      signal.head ? h("span", { class: "rep-sig-head" }, signal.head) : null,
      h("span", { class: "rep-sig-num" }, signal.num),
    ]);
  }

  function videoStrip(videos, pieceVi, ctx) {
    const wrap = h("div", { class: "rep-strip-wrap" });
    const track = h("div", { class: "rep-strip", role: "group" });

    videos.forEach((v, i) => {
      track.appendChild(signalSlot(signalFor(v, i)));
      if (v.id) {
        const slot = h("div", { class: "rep-slot rep-slot-video" });
        const title = `${pieceVi} ${v.label || ""} ${ctx || ""}`.trim();
        slot.appendChild(youtubeFacade(v.id, title));
        track.appendChild(slot);
      } else if (v.sameAs) {
        const alias = h("div", { class: "rep-slot rep-slot-alias" },
          h("span", null, "same as " + v.sameAs));
        track.appendChild(alias);
      }
    });

    wrap.appendChild(track);
    return wrap;
  }

  // ----- Subpage render -----
  function renderSubpage() {
    const slug = document.body.getAttribute("data-slug");
    const piece = REP.find((p) => p.slug === slug);
    const main = document.getElementById("rep-main");
    if (!piece || !main) return;
    document.title = `${piece.vi} — ${piece.en} · MAML Repertoire`;

    // Every piece must have English + Vietnamese blurb — warn loud so
    // missing translations get caught during authoring.
    if (!piece.blurb || !piece.blurb.en || !piece.blurb.vi) {
      console.warn(`[repertoire] ${slug}: blurb must have both .en and .vi`);
    }

    const openLightbox = wireLightbox();

    // Clicking a tablature opens the lightbox at that image.
    function tablature(file, alt) {
      return h("button", {
        type: "button",
        class: "rep-tab-btn",
        "aria-label": "Open tablature fullscreen",
        onclick: () => openLightbox(assetPath(piece.slug, file, "subpage"), alt),
      }, h("img", {
        class: "rep-tab",
        src: assetPath(piece.slug, file, "subpage"),
        alt: alt || "",
        loading: "lazy",
      }));
    }

    // ----- hero -----
    main.appendChild(h("section", { class: "rep-hero" }, [
      h("a", { class: "rep-back", href: "../../repertoire.html" }, "← Repertoire"),
      h("p", { class: "rep-eyebrow" }, [
        h("span", { class: "en" }, (piece.region && piece.region.en) || ""),
        h("span", { class: "vi" }, (piece.region && piece.region.vi) || ""),
      ]),
      h("h1", { class: "rep-title" }, [
        h("span", { class: "vi-big" }, piece.vi),
        h("span", { class: "en-small" }, piece.en),
      ]),
      h("p", { class: "rep-blurb" }, piece.blurb.en),
      h("p", { class: "rep-blurb-vi" }, piece.blurb.vi),
      piece.terms && piece.terms.length
        ? h("dl", { class: "rep-terms" },
            [].concat.apply([], piece.terms.map((t) => [
              h("dt", null, t.vi),
              h("dd", null, t.en),
            ])))
        : null,
    ]));

    // ----- overview -----
    if (piece.overview) {
      const ov = piece.overview;
      const block = h("section", { class: "rep-overview" });
      if (ov.image) {
        block.appendChild(tablature(ov.image, `${piece.vi} — level overview`));
      }
      if (ov.caption) {
        block.appendChild(h("p", { class: "rep-caption" }, [
          h("span", { class: "en" }, ov.caption.en || ""),
          h("span", { class: "vi" }, ov.caption.vi || ""),
        ]));
      }
      if (ov.video) {
        block.appendChild(youtubeFacade(ov.video, "Overview video"));
      }
      main.appendChild(block);
    }

    // ----- per-level sections (graded pieces, e.g. ly-ngua-o) -----
    (piece.levels || []).forEach((lvl) => {
      const section = h("section", { class: "rep-level" });
      const headText = lvl.title || (lvl.n != null ? "Level " + lvl.n : null);
      if (headText) {
        section.appendChild(h("h2", { class: "rep-level-title" }, [
          h("span", { class: "n" }, headText),
        ]));
      }
      if (lvl.tablature) {
        section.appendChild(tablature(lvl.tablature, `${piece.vi} — ${headText || "tablature"}`));
      }
      if (lvl.videos && lvl.videos.length) {
        section.appendChild(videoStrip(lvl.videos, piece.vi, lvl.n || ""));
      }
      main.appendChild(section);
    });

    // ----- flat tablatures (non-graded pieces) -----
    // Rendered as a sequence of full-bleed images, each inside its own
    // section so captions (if any) sit under the right image.
    (piece.tablatures || []).forEach((tab, i) => {
      const section = h("section", { class: "rep-level rep-tablature-section" });
      if (tab.title) {
        section.appendChild(h("h2", { class: "rep-level-title" }, [
          h("span", { class: "n" }, tab.title),
        ]));
      }
      section.appendChild(tablature(tab.image, `${piece.vi} — ${tab.title || "tablature " + (i + 1)}`));
      if (tab.caption) {
        section.appendChild(h("p", { class: "rep-caption" }, [
          h("span", { class: "en" }, tab.caption.en || ""),
          h("span", { class: "vi" }, tab.caption.vi || ""),
        ]));
      }
      main.appendChild(section);
    });

    // ----- flat videos strip (non-graded pieces) -----
    if (piece.videos && piece.videos.length) {
      const section = h("section", { class: "rep-level rep-videos-section" });
      if (piece.videosTitle) {
        section.appendChild(h("h2", { class: "rep-level-title" }, [
          h("span", { class: "n" }, piece.videosTitle),
        ]));
      }
      section.appendChild(videoStrip(piece.videos, piece.vi, ""));
      main.appendChild(section);
    }

    // ----- performance tempo -----
    if (piece.performance && piece.performance.id) {
      const perf = piece.performance;
      const block = h("section", { class: "rep-performance" });
      block.appendChild(h("h2", { class: "rep-level-title" }, [
        h("span", { class: "n" }, (perf.label && perf.label.en) || "Performance Tempo"),
      ]));
      if (perf.label && perf.label.vi) {
        block.appendChild(h("p", { class: "rep-caption" },
          h("span", { class: "vi" }, perf.label.vi)));
      }
      block.appendChild(youtubeFacade(perf.id, (perf.label && perf.label.en) || "Performance"));
      main.appendChild(block);
    }
  }

  // ----- Index render -----
  function renderIndex() {
    const grid = document.getElementById("rep-index");
    if (!grid) return;
    REP.forEach((piece) => {
      const card = h("a", {
        class: "rep-card",
        href: `repertoire/${piece.slug}/`,
      }, [
        h("div", { class: "rep-card-img-wrap" },
          h("img", {
            class: "rep-card-img",
            src: assetPath(piece.slug, piece.thumbnail || "thumbnail.jpg", "index"),
            alt: piece.vi + " — " + piece.en,
            loading: "lazy",
          })),
        h("div", { class: "rep-card-text" }, [
          h("span", { class: "rep-card-vi" }, piece.vi),
          h("span", { class: "rep-card-en" }, piece.en),
        ]),
      ]);
      grid.appendChild(card);
    });
  }

  // ==========================================================
  //  Basics section — different schema (flat blocks array)
  //  Shares the lightbox + YouTube facade + activeFacade tracking
  //  with Repertoire. Engine picks which renderer to run in boot()
  //  based on page markers.
  // ==========================================================

  function renderBasicsSubpage() {
    const slug = document.body.getAttribute("data-basics-slug");
    const BASICS = window.BASICS || [];
    const piece = BASICS.find((p) => p.slug === slug);
    const main = document.getElementById("basics-main");
    if (!piece || !main) return;
    document.title = `${piece.vi} — MAML Basics`;

    if (!piece.blurb || !piece.blurb.en || !piece.blurb.vi) {
      console.warn(`[basics] ${slug}: blurb must have both .en and .vi`);
    }

    const openLightbox = wireLightbox();

    // Hero — identical structure to repertoire hero so typography lines up
    main.appendChild(h("section", { class: "rep-hero basics-hero" }, [
      h("a", { class: "rep-back", href: "../../basics.html" }, "← Basics"),
      h("p", { class: "rep-eyebrow" }, [
        h("span", { class: "en" }, (piece.region && piece.region.en) || ""),
        h("span", { class: "vi" }, (piece.region && piece.region.vi) || ""),
      ]),
      h("h1", { class: "rep-title" }, [
        h("span", { class: "vi-big" }, piece.vi),
        h("span", { class: "en-small" }, piece.en),
      ]),
      h("p", { class: "rep-blurb" }, piece.blurb.en),
      h("p", { class: "rep-blurb-vi" }, piece.blurb.vi),
    ]));

    // Article — flat block walker
    const article = h("article", { class: "basics-article" });
    (piece.blocks || []).forEach((b, i) => {
      if (b.type === "h2") {
        article.appendChild(h("h2", { class: "basics-h2" }, b.text));
      } else if (b.type === "h3") {
        article.appendChild(h("h3", { class: "basics-h3" }, b.text));
      } else if (b.type === "h4") {
        article.appendChild(h("h4", { class: "basics-h4" }, b.text));
      } else if (b.type === "p") {
        article.appendChild(h("p", { class: "basics-p" }, b.text));
      } else if (b.type === "image") {
        const src = b.file;  // relative to the subpage folder
        article.appendChild(h("button", {
          type: "button",
          class: "basics-img-btn",
          "aria-label": "Open image fullscreen",
          onclick: () => openLightbox(src, b.alt || ""),
        }, h("img", {
          class: "basics-img",
          src: src,
          alt: b.alt || "",
          loading: "lazy",
        })));
      } else if (b.type === "video") {
        article.appendChild(h("div", { class: "basics-video" },
          youtubeFacade(b.id, b.label || piece.vi)));
      }
    });
    main.appendChild(article);
  }

  function renderBasicsIndex() {
    const grid = document.getElementById("basics-index");
    if (!grid) return;
    const BASICS = window.BASICS || [];
    BASICS.forEach((piece) => {
      const thumbSrc = `basics/${piece.slug}/${piece.thumbnail || "hero.png"}`;
      const card = h("a", {
        class: "rep-card",
        href: `basics/${piece.slug}/`,
      }, [
        h("div", { class: "rep-card-img-wrap" },
          h("img", {
            class: "rep-card-img",
            src: thumbSrc,
            alt: piece.vi + " — " + piece.en,
            loading: "lazy",
          })),
        h("div", { class: "rep-card-text" }, [
          h("span", { class: "rep-card-vi" }, piece.vi),
          h("span", { class: "rep-card-en" }, piece.en),
        ]),
      ]);
      grid.appendChild(card);
    });
  }

  // ----- boot -----
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  function boot() {
    const body = document.body;
    if (body.hasAttribute("data-basics-slug")) renderBasicsSubpage();
    else if (document.getElementById("basics-index")) renderBasicsIndex();
    else if (body.hasAttribute("data-slug")) renderSubpage();
    else if (document.getElementById("rep-index")) renderIndex();
  }
})();
