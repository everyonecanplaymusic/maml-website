// topnav.js — single source of truth for the site header (brand + nav).
//
// Each page mounts the header with:
//
//   <div id="site-header" data-base="./"></div>
//   <script src="topnav.js" defer></script>
//
// data-base is the relative prefix from THIS page to the site root
// ("./" for top-level pages, "../../" for repertoire/<slug>/).
// data-active (optional) overrides auto-detection of the current
// nav item — pass the SSOT href, e.g. data-active="repertoire.html".
//
// To add a nav item, append to NAV_ITEMS below. That is the only
// place to edit; all 23 pages pick it up automatically.

(function () {
  const NAV_ITEMS = [
    { href: "index.html#tac",          label: "Tôi Ăn Cơm"  },
    { href: "index.html#mission",      label: "Mission"     },
    { href: "index.html#publications", label: "Publications"},
    { href: "index.html#apps",         label: "Apps"        },
    { href: "books.html",              label: "Books"       },
    { href: "courses.html",            label: "Courses"     },
    { href: "repertoire.html",         label: "Repertoire"  },
    { href: "basics.html",             label: "Basics"      },
    { href: "photos.html",             label: "Photos"      },
    { href: "team.html",               label: "Team"        },
    { href: "index.html#contact",      label: "Contact"     },
  ];

  function autoActive() {
    const path = location.pathname;
    const file = path.split("/").pop() || "index.html";
    if (file === "books.html")      return "books.html";
    if (file === "courses.html")    return "courses.html";
    if (file === "repertoire.html") return "repertoire.html";
    if (file === "basics.html")     return "basics.html";
    if (file === "photos.html")     return "photos.html";
    if (file === "team.html")       return "team.html";
    // /repertoire/<slug>/index.html → highlight repertoire.html
    const parts = path.split("/").filter(Boolean);
    const parent = parts[parts.length - 2];
    if (parent === "repertoire") return "repertoire.html";
    if (parent === "basics")     return "basics.html";
    if (parent === "courses")    return "courses.html";
    if (parent === "books")      return "books.html";
    return ""; // index page: no link highlighted
  }

  // On the index page, same-page anchor links (#tac, #mission…)
  // should be plain fragments so clicks don't trigger a reload.
  function isOnIndex(base) {
    if (base !== "" && base !== "./") return false;
    const file = location.pathname.split("/").pop();
    return !file || file === "index.html";
  }

  function render() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    const base = mount.dataset.base || "./";
    const active = mount.dataset.active || autoActive();
    const onIndex = isOnIndex(base);

    const header = document.createElement("header");
    header.className = "topbar";

    const brand = document.createElement("a");
    brand.className = "brand";
    brand.href = onIndex ? "#tac" : base + "index.html";
    brand.innerHTML =
      '<img src="' + base + 'maml-logo.png" alt="MAML logo" class="brand-logo" />' +
      '<span class="brand-name">' +
        '<span class="brand-en">Manhattan Academy of Music and Language</span>' +
        '<span class="brand-vi">Học Viện Âm Nhạc &amp; Ngôn Ngữ Manhattan</span>' +
      '</span>';

    const nav = document.createElement("nav");
    nav.className = "topnav";
    for (const item of NAV_ITEMS) {
      const a = document.createElement("a");
      if (onIndex && item.href.startsWith("index.html#")) {
        a.href = "#" + item.href.split("#")[1];
      } else {
        a.href = base + item.href;
      }
      a.textContent = item.label;
      if (item.href === active) a.classList.add("is-active");
      nav.appendChild(a);
    }

    header.appendChild(brand);
    header.appendChild(nav);
    mount.replaceWith(header);

    // Balanced wrap: when the row is narrow enough that nav
    // items wrap to a second line, flex would pack row 1 full
    // and leave row 2 with the overflow (e.g. 7 + 4). Users
    // expect a more even split (6 + 5). We measure, and if
    // wrapping is detected, set max-width on the nav equal to
    // the natural width of ceil(N/2) items + gaps. Flex then
    // breaks right at the midpoint.
    balanceNav(nav);

    // Rebalance on resize. Debounced with rAF so a drag-resize
    // doesn't thrash layout.
    let rafId = 0;
    window.addEventListener("resize", () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => balanceNav(nav));
    });
  }

  function balanceNav(nav) {
    if (!nav) return;
    // Clear any prior max-width so we can measure the natural
    // (unconstrained) wrap state first.
    nav.style.maxWidth = "";

    const links = Array.from(nav.querySelectorAll("a"));
    if (links.length < 2) return;

    // Wrapping iff first and last items are on different rows.
    if (links[0].offsetTop === links[links.length - 1].offsetTop) {
      return; // single row, nothing to balance
    }

    // Target row 1 = ceil(N/2) items. Measure their total width
    // plus gaps, use that as nav's max-width → flex breaks right
    // after the half-count item.
    const half = Math.ceil(links.length / 2);
    const cs = getComputedStyle(nav);
    const gap = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 0;

    let row1Width = 0;
    for (let i = 0; i < half; i++) {
      row1Width += links[i].offsetWidth;
    }
    row1Width += gap * (half - 1);

    // +4px slack to avoid a sub-pixel shove into a third row.
    nav.style.maxWidth = Math.ceil(row1Width + 4) + "px";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();

// Giấy gió parallax — the paper (painted by body::before) drifts up gently
// as the page scrolls down. Factor is small so it's a breath of movement,
// not a theme-park effect. Clamped so long scroll pages never run the paper
// off the oversized pseudo-element (see top/bottom inset in styles.css).
// Runs everywhere including iOS, because we translate a `position: fixed`
// element instead of relying on `background-attachment: fixed` (which
// Safari mobile silently drops).
(function () {
  const FACTOR = 0.12;   // fraction of scrollY applied as upward drift
  const MAX    = 140;    // px — stays inside the 160px pseudo-element slack
  let ticking = false;

  function update() {
    const y = Math.max(-MAX, -window.scrollY * FACTOR);
    document.body.style.setProperty("--paper-y", y + "px");
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  update();
})();
