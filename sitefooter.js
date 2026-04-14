// sitefooter.js — single source of truth for the site footer.
//
// Each page mounts it with:
//
//   <div id="site-footer"></div>
//   <script src="sitefooter.js" defer></script>
//
// (Sub-pages under repertoire/ and basics/ use ../../sitefooter.js.)
//
// To change footer text on every page at once, edit the strings in
// render() below. Nothing else needs to be touched.

(function () {
  function render() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;

    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<span class="en">© 2024 Manhattan Academy of Music and Language, Inc. · A non-profit organization</span>' +
      '<span class="vi">Học Viện Âm Nhạc &amp; Ngôn Ngữ Manhattan · Một tổ chức phi lợi nhuận</span>';

    mount.replaceWith(footer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
