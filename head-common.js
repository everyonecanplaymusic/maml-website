// head-common.js — single source of truth for shared <head> links.
//
// Each page mounts it with:
//
//   <script src="head-common.js"></script>
//
// (Sub-pages use ../../head-common.js — the script resolves all
// relative paths against its own URL so it works from any depth.)
//
// Place this script in <head>, AFTER <link rel="stylesheet"
// href="styles.css"> so the main stylesheet keeps its HTML-
// parse-time loading priority (avoids FOUC). Everything injected
// here — font preconnects, YouTube preconnects, Google Fonts
// stylesheet, favicon — is either a hint (preconnect) or a
// non-blocking resource (swap font, tab icon).
//
// To change shared <head> content for every page at once, edit
// the link() calls below. Nothing else needs to be touched.

(function () {
  const base = document.currentScript.src;
  const head = document.head;

  function link(rel, href, opts) {
    opts = opts || {};
    const l = document.createElement("link");
    l.rel = rel;
    l.href = href;
    if (opts.crossorigin) l.crossOrigin = opts.crossorigin;
    if (opts.type)        l.type        = opts.type;
    head.appendChild(l);
  }

  // Font preconnects — speed up the Google Fonts fetch below.
  link("preconnect", "https://fonts.googleapis.com");
  link("preconnect", "https://fonts.gstatic.com", { crossorigin: "anonymous" });

  // YouTube preconnects — cheap hints, safe even on pages that
  // don't end up loading a YT embed (browser drops unused ones).
  link("preconnect", "https://i.ytimg.com",    { crossorigin: "anonymous" });
  link("preconnect", "https://www.youtube.com", { crossorigin: "anonymous" });

  // Google Fonts — Be Vietnam Pro is the only family on the site.
  link("stylesheet",
       "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,600;0,800;1,400&display=swap");

  // Favicon resolved against this script's own URL so top-level
  // pages get maml-logo.png and sub-pages get ../../maml-logo.png
  // automatically — no depth-aware data attribute needed.
  link("icon", new URL("maml-logo.png", base).href, { type: "image/png" });
})();
