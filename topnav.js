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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
