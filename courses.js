/* ============================================================
   Courses page — loader, mode-aware renderer, password modal
   ============================================================
   This script is shared by three pages that render the same
   course in different modes:

     courses.html           <ol id="scheduleList" data-mode="public">
     courses-students.html  <ol id="scheduleList" data-mode="students">
     courses-teacher.html   <ol id="scheduleList" data-mode="teacher">

   Which course: ?id=<id> from courses-data.js, else
   COURSES_CURRENT. Everything course-specific (flyer, days,
   times, meta, codes) comes from that registry entry; the md
   file named there carries blurb, schedule and session detail.

   public mode  → schedule shows topics + locked video slots,
                  plus a "I have a code" button that opens a
                  password modal. On correct password the user
                  is sent to the students (or teacher) page.
   students mode → schedule shows topics + real YouTube links.
                   No modal, no button.

   Password handling is honor-system: the code hashes live in
   courses-data.js (so they deploy with the static site), the
   user's typed password is sha256'd in the browser and compared
   against the hash. View-source reveals the destination URL but
   not the plaintext password. This matches the unlisted YouTube
   semantics — the URL itself is the real "secret".
   ============================================================ */
(function () {
  const COURSES = window.COURSES || [];
  const requestedId = new URLSearchParams(location.search).get("id");
  // Unknown or missing ?id= → the current course.
  const course =
    COURSES.find((c) => c.id === requestedId) ||
    COURSES.find((c) => c.id === window.COURSES_CURRENT);
  const isCurrent = course.id === window.COURSES_CURRENT;

  const PAGE_URL = {
    public:   "courses.html",
    students: "courses-students.html",
    teacher:  "courses-teacher.html",
  };
  // The current course gets the bare URL; any other course
  // carries its ?id= so the link keeps pointing at it.
  function courseUrl(page, c) {
    return c.id === window.COURSES_CURRENT
      ? PAGE_URL[page]
      : `${PAGE_URL[page]}?id=${encodeURIComponent(c.id)}`;
  }

  // localStorage key — set once on this device when the
  // teacher types their code; subsequent visits skip the gate.
  // One key per course. Cleared by "clear site data".
  const teacherTokenKey = (c) => `maml_teacher_${c.id}`;

  /* ============================================================
     STUDENT VIDEO SHARING — Google Form + published Sheet
     ============================================================
     One-time setup (no code change after the URLs are pasted in):

     1. Create a Google Form with these fields:
          - student_name          (Short answer, required)
          - session               (Multiple choice 1..8, required)
          - instrument            (Multiple choice: dan-tranh /
                                   dan-bau / both, required)
          - youtube_url           (Short answer, required —
                                   tell students "make it
                                   unlisted before submitting")
          - visibility            (Multiple choice: peers /
                                   teacher, required)

     2. In the Form's response settings, link it to a new Google
        Sheet. Add a 6th column "feedback" — that's the column
        the teacher types into.

     3. In the Sheet: File → Share → "Publish to web" →
        "Comma-separated values (.csv)" → copy the URL. Paste
        below as STUDENT_VIDEOS_CSV_URL.

     4. Copy the Form's public URL ("Send" → "Link" → copy).
        Paste below as STUDENT_FORM_URL.

     5. Copy the Sheet's edit URL (the normal one in your
        browser). Paste below as STUDENT_SHEET_EDIT_URL — only
        the teacher page uses this, so it stays inside the
        teacher-gated view.

     Default values are empty strings; until you set them, the
     gallery silently no-ops and the page renders normally.
     ============================================================ */
  const STUDENT_VIDEOS_CSV_URL = "";
  const STUDENT_FORM_URL       = "";
  const STUDENT_SHEET_EDIT_URL = "";

  /* Class times by (instrument, day) come from the registry, so
     the md file only has to carry session number, dates, topic,
     and video IDs. Instrument order inside a session block =
     key order of course.times (matches the course-meta list). */
  const TIMES = course.times;
  const DAYS = course.days;
  const INSTRUMENT_ORDER = Object.keys(TIMES);
  const INSTRUMENTS = window.COURSE_INSTRUMENTS || {};
  const instLabel = (key) => (INSTRUMENTS[key] ? INSTRUMENTS[key].label : key);

  const entryEl    = document.getElementById("courseEntry");
  const navEl      = document.getElementById("courseNav");
  const resEl      = document.getElementById("courseResources");
  const listEl     = document.getElementById("scheduleList");
  const codeBtn    = document.getElementById("codeOpenBtn"); // public only
  let blurbEl      = null; // built by renderEntry()

  const mode = (listEl && listEl.dataset.mode) || "public";
  const isStudents = mode === "students";
  const isTeacher  = mode === "teacher";
  // Both gated modes unlock the YouTube video links.
  const isUnlocked = isStudents || isTeacher;

  /* ---------- sha256 helper ---------- */
  async function sha256(str) {
    const buf = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /* ---------- date formatting ---------- */
  function formatDate(iso) {
    const parts = iso.split("-");
    if (parts.length !== 3) return iso;
    const months = [
      "jan", "feb", "mar", "apr", "may", "jun",
      "jul", "aug", "sep", "oct", "nov", "dec",
    ];
    const m = months[parseInt(parts[1], 10) - 1] || parts[1];
    const d = parseInt(parts[2], 10);
    return `${m} ${d}`;
  }

  /* ---------- markdown table parser ----------
     Reads only consecutive `|`-prefixed lines (header + separator
     + body rows). Anything that comes after a non-pipe line is
     treated as out-of-table content and parsed by the detail
     parser below. */
  function parseTable(md) {
    const lines = md.split("\n").map((l) => l.trim());
    const tableLines = [];
    let started = false;
    for (const line of lines) {
      const isPipe = line.startsWith("|");
      if (isPipe) {
        tableLines.push(line);
        started = true;
      } else if (started) {
        // First non-pipe line after the table ends the table.
        break;
      }
    }
    if (tableLines.length < 3) return [];

    const splitRow = (line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());

    const headers = splitRow(tableLines[0]).map((h) => h.toLowerCase());
    const rows = [];
    for (let i = 2; i < tableLines.length; i++) {
      const cells = splitRow(tableLines[i]);
      if (cells.length === 0) continue;
      const row = {};
      headers.forEach((h, j) => (row[h] = cells[j] || ""));
      rows.push(row);
    }
    return rows;
  }

  /* ---------- per-session detail parser ----------
     Anything after the schedule table can carry per-session detail
     blocks keyed by an H2 heading like:

         ## session 3 · shared       ← music in general + song knowledge,
                                       shown ONCE per session
         ## session 3 · dan-tranh    ← instrument-specific, shown
         ## session 3 · dan-bau        under each instrument row

     The separator can be ·, -, —, : or "·". Returns a Map keyed by
     `${session}|${kind}` (kind ∈ shared/dan-tranh/dan-bau) whose
     values are the raw markdown bodies under each heading. */
  function parseDetails(md) {
    const out = new Map();
    if (!md) return out;
    const re =
      /^##\s*session\s+(\d+)\s*[·•:\-—]\s*(theme|shared|dan-tranh|dan-bau)\s*$/gim;
    const matches = [];
    let m;
    while ((m = re.exec(md)) !== null) {
      matches.push({
        index: m.index,
        end: m.index + m[0].length,
        session: parseInt(m[1], 10),
        kind: m[2].toLowerCase(),
      });
    }
    for (let i = 0; i < matches.length; i++) {
      const cur = matches[i];
      const next = matches[i + 1];
      const body = md
        .slice(cur.end, next ? next.index : md.length)
        .trim();
      if (!body) continue;
      out.set(`${cur.session}|${cur.kind}`, body);
    }
    return out;
  }

  /* Rows become calendar entries of two kinds:
       session — rows sharing a session number, one per instrument
       break   — a row whose session cell is "break" (no class
                 that week); its topic cell is the label
     Entries are ordered by their first class day's date, so a
     break sits between the sessions around it. */
  function groupSchedule(rows) {
    const sessions = new Map();
    const breaks = [];
    const datesOf = (row) =>
      Object.fromEntries(DAYS.map((d) => [d, row[d] || ""]));

    for (const row of rows) {
      if ((row.session || "").toLowerCase() === "break") {
        breaks.push({ kind: "break", dates: datesOf(row), topic: row.topic });
        continue;
      }
      const num = parseInt(row.session, 10);
      if (!num) continue;
      if (!TIMES[row.instrument]) continue;

      let bucket = sessions.get(num);
      if (!bucket) {
        bucket = {
          kind: "session",
          num,
          dates: datesOf(row),
          instruments: {},
        };
        sessions.set(num, bucket);
      }
      bucket.instruments[row.instrument] = {
        topic: row.topic,
        videos: Object.fromEntries(DAYS.map((d) => [d, row[`video_${d}`]])),
      };
    }
    const first = (e) => e.dates[DAYS[0]] || "";
    return [...sessions.values(), ...breaks].sort((a, b) =>
      first(a) < first(b) ? -1 : first(a) > first(b) ? 1 : (a.num || 0) - (b.num || 0)
    );
  }

  /* Topic cells may carry inline markdown (*title*, **rao**). */
  function inlineMd(md) {
    if (!md) return "";
    return window.marked ? window.marked.parseInline(md) : escapeHtml(md);
  }

  /* ---------- video slot rendering ---------- */
  function videoSlot(day, videoId) {
    const label = day;

    if (!videoId) {
      // No recording yet — same in both modes.
      return `<span class="video-slot is-pending"><span class="video-day">${label}</span><span class="video-state">—</span></span>`;
    }

    if (isUnlocked) {
      // Real link, opens YouTube in a new tab.
      return `<a class="video-slot is-unlocked" href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener"><span class="video-day">${label}</span><span class="video-state">▶ watch</span></a>`;
    }

    // Public mode: locked badge. Not interactive.
    return `<span class="video-slot is-locked"><span class="video-day">${label}</span><span class="video-state">🔒 locked</span></span>`;
  }

  function renderBlurb(md) {
    if (!window.marked) {
      blurbEl.textContent = md;
      return;
    }
    blurbEl.innerHTML = window.marked.parse(md);
  }

  /* ---------- markdown → idea boxes ----------
     Each H3/H4 in the markdown becomes its own visual box.
     Each box shows the heading + a short preview of body
     content; an "expand" toggle reveals the rest. The grid
     of titled boxes lets a reader (student or funder) take
     in the structure of a session at a glance, then drill
     into any single box without being flooded with text. */
  function makeIdeaBox(headingEl) {
    const box = document.createElement("div");
    box.className = "idea-box";
    box.dataset.state = "collapsed";
    box.appendChild(headingEl);

    const body = document.createElement("div");
    body.className = "idea-box-body";
    box.appendChild(body);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "idea-box-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML =
      '<span class="t-more">+ expand · <em>xem thêm</em></span>' +
      '<span class="t-less">− collapse · <em>thu gọn</em></span>';
    toggle.addEventListener("click", () => {
      const next = box.dataset.state === "collapsed" ? "expanded" : "collapsed";
      box.dataset.state = next;
      toggle.setAttribute("aria-expanded", next === "expanded" ? "true" : "false");
    });
    box.appendChild(toggle);

    return box;
  }

  function renderToBoxes(md) {
    if (!window.marked || !md) return null;
    const html = window.marked.parse(md);
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    const grid = document.createElement("div");
    grid.className = "idea-boxes";

    let currentBox = null;
    let intro = null;
    for (const node of Array.from(wrapper.childNodes)) {
      const isHeading =
        node.nodeType === 1 &&
        (node.tagName === "H3" || node.tagName === "H4");
      if (isHeading) {
        currentBox = makeIdeaBox(node);
        grid.appendChild(currentBox);
      } else if (currentBox) {
        currentBox.querySelector(".idea-box-body").appendChild(node);
      } else {
        // Content before the first H3 — render in an intro
        // strip that spans the grid (no box chrome).
        if (!intro) {
          intro = document.createElement("div");
          intro.className = "idea-box-intro";
          grid.appendChild(intro);
        }
        intro.appendChild(node);
      }
    }
    return grid;
  }

  /* "sat oct 24 · mon oct 26" — one date per class day. */
  function sessionDates(dates) {
    return DAYS.map(
      (d) =>
        `<span class="session-date"><span class="session-day">${d}</span> ${formatDate(dates[d] || "")}</span>`
    ).join('<span class="session-date-sep">·</span>');
  }

  function renderBreak(b) {
    const li = document.createElement("li");
    li.className = "session-break";
    li.innerHTML = `
      <span class="session-break-topic">${inlineMd(b.topic) || "no class"}</span>
      <span class="session-dates">${sessionDates(b.dates)}</span>
    `;
    return li;
  }

  function renderSessions(entries, details, videosBySession) {
    listEl.innerHTML = "";
    if (entries.length === 0) {
      listEl.innerHTML =
        '<li class="schedule-empty">schedule not available yet</li>';
      return;
    }

    for (const s of entries) {
      if (s.kind === "break") {
        listEl.appendChild(renderBreak(s));
        continue;
      }
      const li = document.createElement("li");
      li.className = "session-block";

      const header = document.createElement("header");
      header.className = "session-header";
      header.innerHTML = `
        <div class="session-header-row">
          <span class="session-num">session ${s.num}</span>
          <span class="session-dates">${sessionDates(s.dates)}</span>
        </div>
      `;
      const themeMd = details && details.get(`${s.num}|theme`);
      if (themeMd && window.marked) {
        const theme = document.createElement("div");
        theme.className = "session-theme";
        theme.innerHTML = window.marked.parse(themeMd);
        header.appendChild(theme);
      }

      // Shared block — music in general + song knowledge,
      // rendered as a grid of idea-boxes that applies to BOTH
      // đàn tranh and đàn bầu.
      const sharedMd = details && details.get(`${s.num}|shared`);
      let sharedEl = null;
      if (sharedMd) {
        sharedEl = document.createElement("section");
        sharedEl.className = "session-shared";
        sharedEl.innerHTML = `
          <header class="session-shared-head">
            <span class="session-shared-tag">shared · <em>chung</em></span>
            <span class="session-shared-label">music &amp; song knowledge</span>
            <span class="session-shared-label-vi">nhạc lý &amp; kiến thức bài bản</span>
          </header>
        `;
        const sharedBoxes = renderToBoxes(sharedMd);
        if (sharedBoxes) sharedEl.appendChild(sharedBoxes);
      }

      const instList = document.createElement("ul");
      instList.className = "session-instruments";

      for (const key of INSTRUMENT_ORDER) {
        const inst = s.instruments[key];
        if (!inst) continue;
        const instLi = document.createElement("li");
        instLi.className = `instrument-row inst-${key}`;

        const times = DAYS.map(
          (d) =>
            `<span class="instrument-time"><span class="instrument-day">${d}</span> ${TIMES[key][d] || ""}</span>`
        ).join('<span class="instrument-time-sep">·</span>');
        instLi.innerHTML = `
          <div class="instrument-row-main">
            <div class="instrument-head">
              <span class="instrument-dot" aria-hidden="true"></span>
              <span class="instrument-name">${instLabel(key)}</span>
              <span class="instrument-times">${times}</span>
            </div>
            <div class="instrument-topic">${inlineMd(inst.topic) || "—"}</div>
            <div class="instrument-videos">
              ${DAYS.map((d) => videoSlot(d, inst.videos[d])).join("")}
            </div>
          </div>
        `;

        const detailMd = details && details.get(`${s.num}|${key}`);
        if (detailMd) {
          const detailEl = document.createElement("div");
          detailEl.className = "instrument-detail";
          detailEl.innerHTML = `
            <header class="instrument-detail-head">
              <span class="instrument-detail-label">${instLabel(key)} technique &amp; homework</span>
              <span class="instrument-detail-label-vi">kỹ thuật &amp; bài tập riêng</span>
            </header>
          `;
          const detailBoxes = renderToBoxes(detailMd);
          if (detailBoxes) detailEl.appendChild(detailBoxes);
          instLi.appendChild(detailEl);
        }

        instList.appendChild(instLi);
      }

      li.appendChild(header);
      if (sharedEl) li.appendChild(sharedEl);
      li.appendChild(instList);

      // Per-session student-video gallery — only renders if
      // the published Sheet is configured AND there are videos
      // for this session that match the current mode's filter.
      const sessionVids = videosBySession && videosBySession.get(s.num);
      const gallery = renderVideoGallery(sessionVids);
      if (gallery) li.appendChild(gallery);

      listEl.appendChild(li);
    }
  }

  /* ---------- password modal (public mode only) ---------- */
  let modal = null;

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "code-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Enter course password");
    modal.hidden = true;
    modal.innerHTML = `
      <div class="code-modal-backdrop" data-close="1"></div>
      <form class="code-modal-card" autocomplete="off">
        <button type="button" class="code-modal-close" data-close="1" aria-label="Close">×</button>
        <p class="code-modal-eyebrow">
          <span class="en">Students &amp; teachers</span>
          <span class="vi">Học viên và giáo viên</span>
        </p>
        <h2 class="code-modal-title">
          <span class="en">Enter the course code</span>
          <span class="vi">Nhập mật khẩu lớp</span>
        </h2>
        <p class="code-modal-note">
          Enrolled students get the **student code** by email
          from Mekong NYC; teachers use the **teacher code**.
          The same field accepts either — type yours and you'll
          land on the matching page.
        </p>
        <input
          type="password"
          class="code-modal-input"
          name="code"
          placeholder="•••••••"
          autocomplete="off"
          spellcheck="false"
        />
        <div class="code-modal-row">
          <button type="submit" class="code-modal-submit">
            <span class="en">Open student page →</span>
            <span class="vi">vào trang học viên</span>
          </button>
          <span class="code-modal-status" data-status></span>
        </div>
      </form>
    `;
    document.body.appendChild(modal);

    const form = modal.querySelector("form");
    const input = modal.querySelector(".code-modal-input");
    const status = modal.querySelector("[data-status]");

    modal.addEventListener("click", (e) => {
      if (e.target.dataset.close === "1") closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (!modal.hidden && e.key === "Escape") closeModal();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const typed = input.value.trim();
      if (!typed) return;
      status.textContent = "";
      status.dataset.kind = "";
      const hash = await sha256(typed);
      // Any course's code works here and lands on THAT course —
      // the course on screen is checked first.
      const ordered = [course, ...COURSES.filter((c) => c !== course)];
      const asStudent = ordered.find((c) => c.studentHash === hash);
      const asTeacher = ordered.find((c) => c.teacherHash === hash);
      if (asStudent) {
        // Student code — go to the students page.
        status.dataset.kind = "ok";
        status.textContent = "ok →";
        setTimeout(() => {
          window.location.href = courseUrl("students", asStudent);
        }, 200);
      } else if (asTeacher) {
        // Teacher code — set the device token here so the in-page
        // gate on the teacher page is skipped, then redirect.
        status.dataset.kind = "ok";
        status.textContent = "teacher →";
        try { localStorage.setItem(teacherTokenKey(asTeacher), "1"); } catch (e) {}
        setTimeout(() => {
          window.location.href = courseUrl("teacher", asTeacher);
        }, 200);
      } else {
        status.dataset.kind = "err";
        status.textContent = "wrong code";
        modal.querySelector(".code-modal-card").classList.remove("is-shake");
        // Force reflow so the animation restarts on rapid retries.
        // eslint-disable-next-line no-unused-expressions
        modal.querySelector(".code-modal-card").offsetWidth;
        modal.querySelector(".code-modal-card").classList.add("is-shake");
        input.select();
      }
    });
  }

  function openModal() {
    if (!modal) buildModal();
    modal.hidden = false;
    document.body.classList.add("code-modal-open");
    const input = modal.querySelector(".code-modal-input");
    input.value = "";
    const status = modal.querySelector("[data-status]");
    status.textContent = "";
    status.dataset.kind = "";
    setTimeout(() => input.focus(), 0);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("code-modal-open");
  }

  /* ---------- CSV parser + student-video helpers ---------- */
  function parseCsv(text) {
    const rows = [];
    let row = [], field = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { field += c; }
      } else {
        if (c === '"') { inQuotes = true; }
        else if (c === ",") { row.push(field); field = ""; }
        else if (c === "\n" || c === "\r") {
          if (field !== "" || row.length) { row.push(field); rows.push(row); }
          row = []; field = "";
          if (c === "\r" && text[i + 1] === "\n") i++;
        } else { field += c; }
      }
    }
    if (field !== "" || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  function csvToObjects(rows) {
    if (!rows.length) return [];
    const headers = rows[0].map((h) => h.trim().toLowerCase());
    return rows.slice(1).map((r) => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = (r[i] || "").trim(); });
      return obj;
    });
  }

  async function fetchStudentVideos() {
    if (!STUDENT_VIDEOS_CSV_URL) return [];
    try {
      const res = await fetch(STUDENT_VIDEOS_CSV_URL, { cache: "no-store" });
      if (!res.ok) return [];
      const text = await res.text();
      return csvToObjects(parseCsv(text));
    } catch (e) {
      return [];
    }
  }

  function extractYouTubeId(url) {
    if (!url) return null;
    const m = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/
    );
    return m ? m[1] : null;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function groupVideosBySession(videos) {
    const map = new Map();
    for (const v of videos) {
      const session = parseInt(v.session, 10);
      if (!session) continue;
      // Students mode: only show videos the student opted to
      // share with peers. Teacher mode: show everything.
      if (!isTeacher && v.visibility !== "peers") continue;
      if (!map.has(session)) map.set(session, []);
      map.get(session).push(v);
    }
    return map;
  }

  function renderVideoGallery(videos) {
    if (!videos || !videos.length) return null;
    const wrap = document.createElement("section");
    wrap.className = "student-videos";
    wrap.innerHTML = `
      <header class="student-videos-head">
        <span class="student-videos-tag">student videos · <em>video học viên</em></span>
      </header>
    `;
    const grid = document.createElement("div");
    grid.className = "student-videos-grid";
    for (const v of videos) {
      const id = extractYouTubeId(v.youtube_url);
      if (!id) continue;
      const card = document.createElement("article");
      card.className = "student-video-card";
      const teacherBadge =
        isTeacher && v.visibility === "teacher"
          ? '<span class="student-video-badge">teacher-only</span>'
          : "";
      card.innerHTML = `
        <a class="student-video-thumb" href="${escapeHtml(v.youtube_url)}" target="_blank" rel="noopener">
          <img src="https://img.youtube.com/vi/${id}/mqdefault.jpg" alt="${escapeHtml(v.student_name || "student video")}" loading="lazy" />
        </a>
        <div class="student-video-meta">
          <span class="student-video-name">${escapeHtml(v.student_name || "—")}</span>
          ${v.instrument ? `<span class="student-video-instrument">· ${escapeHtml(v.instrument)}</span>` : ""}
          ${teacherBadge}
        </div>
        ${v.feedback ? `<blockquote class="student-video-feedback">${escapeHtml(v.feedback)}</blockquote>` : ""}
      `;
      grid.appendChild(card);
    }
    wrap.appendChild(grid);
    if (isTeacher && STUDENT_SHEET_EDIT_URL) {
      wrap.innerHTML +=
        `<a class="student-videos-edit" href="${escapeHtml(STUDENT_SHEET_EDIT_URL)}" target="_blank" rel="noopener">open response sheet to type feedback →</a>`;
    }
    return wrap;
  }

  /* ---------- in-page auth gate (teacher mode) ----------
     The student page uses URL-as-token (you reach it via the
     password modal on the public page). The teacher page is
     a direct URL — anyone who knows the URL would land on it,
     so we add an in-page gate that checks localStorage and
     prompts for the teacher code once per device. */
  function showAuthGate(passwordHash, tokenKey, copy) {
    return new Promise((resolve) => {
      const gate = document.createElement("div");
      gate.className = "auth-gate";
      gate.innerHTML = `
        <form class="auth-gate-card" autocomplete="off">
          <p class="auth-gate-eyebrow">
            <span class="en">${copy.eyebrowEn}</span>
            <span class="vi">${copy.eyebrowVi}</span>
          </p>
          <h2 class="auth-gate-title">
            <span class="en">${copy.titleEn}</span>
            <span class="vi">${copy.titleVi}</span>
          </h2>
          <p class="auth-gate-note">${copy.note}</p>
          <input
            type="password"
            class="auth-gate-input"
            name="code"
            placeholder="•••••••"
            autocomplete="off"
            spellcheck="false"
          />
          <div class="auth-gate-row">
            <button type="submit" class="auth-gate-submit">
              <span class="en">Unlock →</span>
              <span class="vi">mở khoá</span>
            </button>
            <span class="auth-gate-status" data-status></span>
          </div>
        </form>
      `;
      document.body.appendChild(gate);
      document.body.classList.add("auth-gated");

      const form = gate.querySelector("form");
      const input = gate.querySelector(".auth-gate-input");
      const status = gate.querySelector("[data-status]");
      setTimeout(() => input.focus(), 0);

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const typed = input.value.trim();
        if (!typed) return;
        status.textContent = "";
        status.dataset.kind = "";
        const hash = await sha256(typed);
        if (hash === passwordHash) {
          status.dataset.kind = "ok";
          status.textContent = "ok →";
          try { localStorage.setItem(tokenKey, "1"); } catch (e) {}
          setTimeout(() => {
            gate.remove();
            document.body.classList.remove("auth-gated");
            resolve();
          }, 200);
        } else {
          status.dataset.kind = "err";
          status.textContent = "wrong code";
          gate.querySelector(".auth-gate-card").classList.remove("is-shake");
          // eslint-disable-next-line no-unused-expressions
          gate.querySelector(".auth-gate-card").offsetWidth;
          gate.querySelector(".auth-gate-card").classList.add("is-shake");
          input.select();
        }
      });
    });
  }

  async function checkAuth() {
    if (!isTeacher) return;
    let token = null;
    try { token = localStorage.getItem(teacherTokenKey(course)); } catch (e) {}
    if (token === "1") return;
    await showAuthGate(course.teacherHash, teacherTokenKey(course), {
      eyebrowEn: "Teacher access",
      eyebrowVi: "Truy cập của giáo viên",
      titleEn: "Enter the teacher code",
      titleVi: "Nhập mật khẩu giáo viên",
      note:
        "The code stays on this device after first entry; you " +
        "won't be asked again until you clear your browser data.",
    });
  }

  /* ---------- course entry: flyer + title + meta ----------
     Built entirely from the registry entry. Each meta row is a
     registry kind: `text` (authored html, optional body_vi line
     underneath) or `instruments` (generated from course.times). */
  const titleCase = (s) =>
    s.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const META_KINDS = {
    text: (row) =>
      row.body +
      (row.body_vi ? `<span class="course-meta-vi">${row.body_vi}</span>` : ""),
    instruments: () =>
      INSTRUMENT_ORDER.map((key) => {
        const info = INSTRUMENTS[key] || {};
        const times = DAYS.map(
          (d) => `${(window.COURSE_DAYS[d] || { en: d }).en} ${TIMES[key][d] || ""}`
        ).join(" · ");
        const desc = info.en
          ? ` <span class="course-meta-inst-desc">· ${info.en}${info.vi ? ` · <em>${info.vi}</em>` : ""}</span>`
          : "";
        return `<span class="course-meta-inst inst-${key}">
            <span class="dot" aria-hidden="true"></span><span class="course-inst-name">${instLabel(key)}</span>${desc}
            <span class="course-meta-times">${times}</span>
          </span>`;
      }).join(""),
  };

  function renderEntry() {
    if (!entryEl) return;
    const flyers = course.flyers || [];
    const langLabel = { en: "English", vi: "Tiếng Việt" };
    const flyerLangs =
      flyers.length > 1
        ? `<div class="course-flyer-langs" role="group" aria-label="flyer language">
             ${flyers.map((f, i) =>
               `<button type="button" data-flyer="${i}" aria-pressed="${i === 0}">${langLabel[f.lang] || f.lang}</button>`
             ).join("")}
           </div>`
        : "";
    const f0 = flyers[0];
    const title = INSTRUMENT_ORDER.map(
      (key) => `<span class="course-inst-name inst-${key}">${titleCase(instLabel(key))}</span>`
    ).join('<span class="course-amp">&amp;</span>');
    const meta = (course.meta || [])
      .filter((row) => META_KINDS[row.kind])
      .map((row) => `
        <div>
          <dt><span class="en">${row.en}</span><span class="vi">${row.vi}</span></dt>
          <dd>${META_KINDS[row.kind](row)}</dd>
        </div>`)
      .join("");

    entryEl.innerHTML = `
      <div class="course-flyer">
        ${f0 ? `<img src="${f0.src}" alt="${escapeHtml(f0.alt)}" width="${f0.width}" height="${f0.height}"
                     class="course-flyer-img" draggable="false" />` : ""}
        ${flyerLangs}
      </div>

      <div class="course-info">
        <div class="course-kind">
          <span class="en">${course.season.en} · ${course.kind.en}</span>
          <span class="vi">${course.season.vi} · ${course.kind.vi}</span>
        </div>
        <h2 class="course-title">${title}</h2>
        <p class="course-sub">${course.partner || ""}</p>

        <div class="course-blurb" id="courseBlurb">
          <p class="course-loading">loading…</p>
        </div>

        <dl class="course-meta">${meta}</dl>
      </div>
    `;
    blurbEl = entryEl.querySelector("#courseBlurb");

    const img = entryEl.querySelector(".course-flyer-img");
    if (img) img.addEventListener("contextmenu", (e) => e.preventDefault());
    entryEl.querySelectorAll("[data-flyer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = flyers[Number(btn.dataset.flyer)];
        img.src = f.src;
        img.alt = f.alt;
        entryEl.querySelectorAll("[data-flyer]").forEach((b) =>
          b.setAttribute("aria-pressed", String(b === btn))
        );
      });
    });
  }

  /* ---------- course nav: current ↔ earlier courses ----------
     Under the hero intro. On the current course it lists the
     earlier ones; on an earlier one it says so and links back. */
  function renderCourseNav() {
    if (!navEl) return;
    const page = mode in PAGE_URL ? mode : "public";
    const link = (c) =>
      `<a href="${courseUrl(page, c)}">${c.season.en} <em>${c.season.vi}</em></a>`;
    if (isCurrent) {
      const earlier = COURSES.filter((c) => c !== course);
      navEl.innerHTML = earlier.length
        ? `<span class="course-nav-label">earlier courses · <em>khoá trước</em></span> ` +
          earlier.map(link).join('<span class="course-nav-sep">·</span>')
        : "";
    } else {
      const cur = COURSES.find((c) => c.id === window.COURSES_CURRENT);
      navEl.innerHTML =
        `<span class="course-nav-label">past course · <em>khoá đã qua</em></span> ` +
        (cur ? `current course · <em>khoá hiện tại</em>: ${link(cur)} →` : "");
    }
  }

  /* ---------- apps & books: link + QR per resource ----------
     course.resources lists ids from COURSE_RESOURCES. The QR is
     generated from the same `url` as the link (qrcode-generator,
     loaded in the page); without the library the card still
     renders as a plain link. */
  const RESOURCE_KIND = {
    app:  { en: "app",  vi: "ứng dụng" },
    book: { en: "book", vi: "sách" },
  };

  function qrSvg(url) {
    if (typeof window.qrcode !== "function") return "";
    const qr = window.qrcode(0, "M");
    qr.addData(url);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 8, scalable: true });
  }

  function renderResources() {
    if (!resEl) return;
    const all = window.COURSE_RESOURCES || {};
    const items = (course.resources || []).map((id) => all[id]).filter(Boolean);
    if (!items.length) return;
    const shortUrl = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");
    resEl.innerHTML = `
      <header class="resources-head">
        <h2 class="resources-title">
          <span class="en">Apps &amp; book</span>
          <span class="vi">Ứng dụng &amp; sách</span>
        </h2>
        <p class="resources-note">
          Scan a code with your phone, or click to open.
          <em>Quét mã bằng điện thoại, hoặc bấm để mở.</em>
        </p>
      </header>
      <div class="resources-strip">
        ${items.map((r) => {
          const kind = RESOURCE_KIND[r.kind] || { en: r.kind, vi: "" };
          return `
          <a class="resource-card" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">
            <span class="resource-qr" aria-hidden="true">${qrSvg(r.url)}</span>
            <span class="resource-kind">${kind.en} · <em>${kind.vi}</em></span>
            <span class="resource-name">${escapeHtml(r.title)}</span>
            <span class="resource-desc">${escapeHtml(r.en)}</span>
            <span class="resource-desc-vi">${escapeHtml(r.vi)}</span>
            <span class="resource-url">${escapeHtml(shortUrl(r.url))}</span>
          </a>`;
        }).join("")}
      </div>
    `;
  }

  /* ---------- main load ---------- */
  async function load() {
    await checkAuth();
    renderEntry();
    renderCourseNav();
    renderResources();

    let text;
    try {
      const res = await fetch(course.md, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      text = await res.text();
    } catch (err) {
      blurbEl.innerHTML =
        "<p>course content will appear here once the schedule file is published.</p>";
      listEl.innerHTML =
        '<li class="schedule-empty">schedule not available yet</li>';
      return;
    }

    const body = text.replace(/<!--[\s\S]*?-->/g, "").trim();

    /* Split blurb / schedule on the first table row, so the
       blurb above can be free-form: any language, any number
       of paragraphs, with or without headings. */
    const tableIdx = body.search(/^\|.*\|\s*$/m);
    const blurbMd = tableIdx >= 0 ? body.slice(0, tableIdx) : body;
    const scheduleMd = tableIdx >= 0 ? body.slice(tableIdx) : "";

    renderBlurb(blurbMd.trim());

    const rows = parseTable(scheduleMd);
    const sessions = groupSchedule(rows);
    const details = parseDetails(scheduleMd);

    // Fetch student-submitted videos in parallel — they live in
    // a published Google Sheet (see setup recipe up top). On
    // students mode we only show videos opted-in for peers; on
    // teacher mode we show everything plus the edit-sheet link.
    const videos = isUnlocked ? await fetchStudentVideos() : [];
    const videosBySession = groupVideosBySession(videos);

    renderSessions(sessions, details, videosBySession);

    // Above the schedule on students/teacher pages: a "share
    // your practice videos" how-to with the YouTube unlisted
    // recipe + landscape/portrait/Shorts guidance + the
    // submit button (or a teacher's "open sheet" button).
    renderVideoShareInstructions();
  }

  function renderVideoShareInstructions() {
    if (!isUnlocked) return;
    const mainEl = document.querySelector("main");
    if (!mainEl) return;
    const schedule = document.querySelector(".course-schedule-section");
    if (!schedule) return;

    const formCta = STUDENT_FORM_URL
      ? `<a class="video-share-submit" href="${escapeHtml(STUDENT_FORM_URL)}" target="_blank" rel="noopener">
           <span class="en">+ Submit your video →</span>
           <span class="vi">gửi video của bạn</span>
         </a>`
      : `<p class="video-share-pending">
           <em>The submission form is being set up. Once it's
           live, this button will open it.</em>
           <em class="vi-line">Form gửi video đang được cài đặt.
           Khi sẵn sàng, nút này sẽ mở form.</em>
         </p>`;

    const teacherCta = isTeacher && STUDENT_SHEET_EDIT_URL
      ? `<a class="video-share-submit teacher" href="${escapeHtml(STUDENT_SHEET_EDIT_URL)}" target="_blank" rel="noopener">
           <span class="en">Open response sheet →</span>
           <span class="vi">mở Google Sheet để viết phản hồi</span>
         </a>`
      : "";

    const section = document.createElement("section");
    section.className = "video-share-howto";
    section.innerHTML = `
      <header class="video-share-head">
        <h2 class="video-share-title">
          <span class="en">Share your practice videos</span>
          <span class="vi">Chia sẻ video luyện tập</span>
        </h2>
        <p class="video-share-intro">
          A short clip of yourself playing — anywhere from
          week 1 onward. Peers cheer each other on; the
          teacher writes feedback under each video. <em>Một
          đoạn ngắn bạn tự chơi — từ tuần 1 trở đi. Bạn cùng
          lớp cổ vũ nhau; thầy/cô viết phản hồi dưới mỗi
          video.</em>
        </p>
      </header>

      <ol class="video-share-steps">
        <li>
          <span class="step-num">1</span>
          <div class="step-body">
            <strong>Record on your phone.</strong> A single
            take is fine — beautiful or messy, both are useful.
            <em>Quay bằng điện thoại — một take là đủ. Đẹp hay
            chưa đẹp đều có giá trị.</em>
          </div>
        </li>
        <li>
          <span class="step-num">2</span>
          <div class="step-body">
            <strong>Upload to YouTube as <em>Unlisted</em>.</strong>
            On the YouTube upload page →
            <strong>Visibility</strong> → pick <strong>Unlisted</strong>.
            <em>Unlisted</em> means anyone with the link can
            watch, but the video won't show up in search or on
            your channel. <em>Tải lên YouTube ở chế độ
            Unlisted — chỉ ai có link mới xem được, không hiện
            trong tìm kiếm hay trên kênh của bạn.</em>
          </div>
        </li>
        <li>
          <span class="step-num">3</span>
          <div class="step-body">
            <strong>Submit the link below.</strong> Pick the
            session it's for, and choose visibility:
            <strong>peers</strong> if you want classmates to
            see it, <strong>teacher-only</strong> if you'd
            rather only the teacher see it. <em>Gửi link qua
            form bên dưới — chọn buổi học, chọn ai được xem
            (bạn cùng lớp hay chỉ thầy/cô).</em>
          </div>
        </li>
      </ol>

      <div class="video-share-orientation">
        <h3 class="video-share-sub">
          <span class="en">Landscape, portrait, or Shorts?</span>
          <span class="vi">Quay ngang, dọc, hay Shorts?</span>
        </h3>
        <ul>
          <li>
            <strong>Landscape *(16:9, ngang)* — recommended.</strong>
            Shows the instrument and both hands. Best for full
            practice clips. <em>Khuyến nghị — thấy cả đàn và
            hai tay, hợp clip luyện tập đầy đủ.</em>
          </li>
          <li>
            <strong>Portrait *(9:16, dọc)* — fine for close-ups.</strong>
            Good for zooming into a right-hand drill on đàn
            bầu, or a single-finger pluck on đàn tranh. <em>Hợp
            cho cận cảnh — tay phải đàn bầu, một ngón gảy đàn
            tranh.</em>
          </li>
          <li>
            <strong>Shorts <em>(≤3 minutes vertical)</em> also work.</strong>
            YouTube auto-tags vertical short videos as Shorts.
            You can still mark them <strong>Unlisted</strong>;
            our gallery embeds Shorts and regular videos the
            same way. <em>Shorts cũng được — YouTube tự gắn
            nhãn. Vẫn đặt Unlisted được; gallery xử lý cả hai
            dạng như nhau.</em>
          </li>
        </ul>
      </div>

      <div class="video-share-actions">
        ${formCta}
        ${teacherCta}
      </div>
    `;
    mainEl.insertBefore(section, schedule);
  }

  if (codeBtn) {
    codeBtn.addEventListener("click", openModal);
  }

  load();
})();
