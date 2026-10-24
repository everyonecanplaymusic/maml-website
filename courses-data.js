/* ============================================================
   Courses registry — SSOT for every course the courses pages show
   ============================================================
   courses.html, courses-students.html and courses-teacher.html all
   render ONE course from this file: the one named by ?id=<id>, or
   COURSES_CURRENT when the URL has no ?id=. Nothing about a course
   (flyer, days, times, address, prices, codes) lives in the html
   files or in courses.js — the pages are empty shells.

   A course = this registry entry (facts the renderer needs) + its
   markdown file (blurb, schedule table, per-session detail — see
   courses/dan-tranh-dan-bau-spring-2026.example.md for the schema).

   To start a new course:
     1. add an entry at the TOP of COURSES, point COURSES_CURRENT at it
     2. write its md file (the schedule table's day columns are the
        keys in `days`, e.g. | session | sat | mon | … | video_sat |)
     3. put the flyer(s) in courses-assets/
     4. run  sh stamp.sh
   Older courses stay reachable at courses.html?id=<id>.

   Codes are honor-system (see courses.js header): only the sha256
   is stored. To make one:  printf "%s" "thecode" | shasum -a 256
   ============================================================ */
window.COURSES_CURRENT = "fall-2026";

/* Instruments and days are the same across courses — described once
   here. A course picks its days and gives each instrument its times. */
window.COURSE_INSTRUMENTS = {
  "dan-tranh": { label: "đàn tranh", en: "Vietnamese 17-string zither", vi: "đàn 17 dây" },
  "dan-bau":   { label: "đàn bầu",   en: "Vietnamese monochord",        vi: "độc huyền cầm" },
};

window.COURSE_DAYS = {
  mon: { en: "Mondays",   vi: "thứ Hai" },
  thu: { en: "Thursdays", vi: "thứ Năm" },
  sat: { en: "Saturdays", vi: "thứ Bảy" },
  sun: { en: "Sundays",   vi: "chủ nhật" },
};

window.COURSES = [
  {
    // Source: Fall 2026 announcement email to Mekong NYC + the Fall
    // 2026 flyer set (EN/VI). Prices and the rental deposit are from
    // the flyer; the email does not repeat them.
    id: "fall-2026",
    md: "courses/dan-tranh-dan-bau-fall-2026.md",
    season: { en: "Fall 2026", vi: "Mùa thu 2026" },
    kind:   { en: "Vietnamese Music Classes", vi: "Lớp nhạc dân tộc Việt Nam" },
    partner: "hosted with Mekong NYC",
    flyers: [
      { lang: "en", src: "courses-assets/flyer-fall-2026-en.jpg", width: 1103, height: 1426,
        alt: "Vietnamese Music Classes — Đàn Tranh and Đàn Bầu, Fall 2026 flyer" },
      { lang: "vi", src: "courses-assets/flyer-fall-2026-vi.jpg", width: 1103, height: 1426,
        alt: "Lớp nhạc dân tộc Việt Nam — Đàn Tranh và Đàn Bầu, flyer mùa thu 2026" },
    ],
    days: ["sat", "mon"],
    // Key order = order of the instrument rows on the page.
    times: {
      "dan-tranh": { sat: "10:40 am – 11:30 am", mon: "6:30 pm – 7:20 pm" },
      "dan-bau":   { sat: "12:00 pm – 12:50 pm", mon: "7:45 pm – 8:35 pm" },
    },
    meta: [
      { kind: "text", en: "Where", vi: "ở đâu",
        body: "Manhattan Academy of Music &amp; Language<br />" +
              "40 West 135th St., Ste. 1S, New York, NY 10037<br />" +
              "in person &amp; on Zoom",
        body_vi: "học trực tiếp &amp; qua Zoom" },
      { kind: "instruments", en: "Instruments", vi: "nhạc cụ" },
      { kind: "text", en: "Register", vi: "đăng ký",
        body: "open through October 31, 2026 — session 1 is a free trial · " +
              '<a href="https://bit.ly/mekongmusic" target="_blank" rel="noopener">bit.ly/mekongmusic</a>',
        body_vi: "đăng ký đến hết ngày 31/10/2026 — buổi #1 học thử miễn phí" },
      { kind: "text", en: "Tuition", vi: "học phí",
        body: "suggested contribution $200 (8 sessions) · $350 (16) · $450 (24) · $500 (32) — " +
              "financial assistance available",
        body_vi: "đóng góp gợi ý $200 (8 buổi) · $350 (16 buổi) · $450 (24 buổi) · $500 (32 buổi) — " +
                 "có hỗ trợ học phí" },
      { kind: "text", en: "Instrument rental", vi: "mượn đàn",
        body: "available — $250–$400 deposit depending on model",
        body_vi: "có cho mượn nhạc cụ — $250–$400 tiền đặt cọc tùy loại đàn" },
    ],
    studentHash: "719ae97b495e89f98a0c0d181fc020b2addbd7abc8c40d19119e7d87349701ec", // fALL26
    teacherHash: "ebd9a6ca5bcdba23234f8674f76e825c2e28fece7d5e5e94a1c922beacb7af17", // tEACHfall26
  },
  {
    id: "spring-2026",
    md: "courses/dan-tranh-dan-bau-spring-2026.md",
    season: { en: "Spring 2026", vi: "Mùa xuân 2026" },
    kind:   { en: "Vietnamese Music Classes", vi: "Lớp nhạc Việt" },
    partner: "hosted with Mekong NYC",
    flyers: [
      { lang: "en", src: "courses-assets/flyer-spring-2026.png", width: 1600, height: 1600,
        alt: "Đàn Tranh and Đàn Bầu — Spring 2026 flyer" },
    ],
    days: ["sun", "thu"],
    times: {
      "dan-tranh": { sun: "10:40 am – 11:30 am", thu: "6:30 pm – 7:20 pm" },
      "dan-bau":   { sun: "12:00 pm – 12:50 pm", thu: "7:45 pm – 8:35 pm" },
    },
    meta: [
      { kind: "text", en: "Where", vi: "ở đâu",
        body: "Manhattan Academy of Music &amp; Language<br />" +
              "40 West 135th St., Ste. 1S, New York, NY 10037" },
      { kind: "instruments", en: "Instruments", vi: "nhạc cụ" },
      { kind: "text", en: "Prerequisite", vi: "yêu cầu",
        body: "none — all are welcome. Instruments can be loaned from Mekong NYC." },
    ],
    studentHash: "f7e1fb27c7e28a21ab5d2305ffac7afdd7ad18c353af348d5ff72625353c408c", // sprING26
    teacherHash: "f10e879985acdce855afc927745c69092734c1cd74d01902bf6effbe0d56174a", // tEACHspr26
  },
];
