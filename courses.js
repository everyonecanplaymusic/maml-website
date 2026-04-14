/* ============================================================
   Courses page — loader, mode-aware renderer, password modal
   ============================================================
   This script is shared by two pages that render the same md
   file in different modes:

     courses.html           <ol id="scheduleList" data-mode="public">
     courses-students.html  <ol id="scheduleList" data-mode="students">

   public mode  → schedule shows topics + locked video slots,
                  plus a "I have a code" button that opens a
                  password modal. On correct password the user
                  is sent to courses-students.html.
   students mode → schedule shows topics + real YouTube links.
                   No modal, no button.

   Password handling is honor-system: PASSWORD_HASH lives in this
   file (so it deploys with the static site), the user's typed
   password is sha256'd in the browser and compared against the
   hash. View-source reveals the destination URL but not the
   plaintext password. This matches the unlisted YouTube
   semantics — the URL itself is the real "secret".
   ============================================================ */
(function () {
  const COURSE_MD = "courses/dan-tranh-dan-bau-spring-2026.md";
  const STUDENTS_URL = "courses-students.html";

  // sha256("sprING26"). To rotate the password, run
  //   printf "%s" "newpassword" | shasum -a 256
  // and replace the constant.
  const PASSWORD_HASH =
    "f7e1fb27c7e28a21ab5d2305ffac7afdd7ad18c353af348d5ff72625353c408c";

  /* Class times by (instrument, day). Hardcoded here so the
     md file only has to carry session number, dates, topic,
     and video IDs. If the schedule ever changes, edit both
     this map and the course-meta block in the html files. */
  const TIMES = {
    "dan-tranh": {
      sun: "10:40 am – 11:30 am",
      thu: "6:30 pm – 7:20 pm",
    },
    "dan-bau": {
      sun: "12:00 pm – 12:50 pm",
      thu: "7:45 pm – 8:35 pm",
    },
  };

  const INSTRUMENT_LABEL = {
    "dan-tranh": "đàn tranh",
    "dan-bau":   "đàn bầu",
  };

  /* Visual order inside a session block: tranh first, bau
     second — matches the top-of-page course-meta listing. */
  const INSTRUMENT_ORDER = ["dan-tranh", "dan-bau"];

  const blurbEl    = document.getElementById("courseBlurb");
  const listEl     = document.getElementById("scheduleList");
  const codeBtn    = document.getElementById("codeOpenBtn"); // public only

  const mode = (listEl && listEl.dataset.mode) || "public";
  const isStudents = mode === "students";

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

  /* ---------- markdown table parser ---------- */
  function parseTable(md) {
    const lines = md.split("\n").map((l) => l.trim());
    const tableLines = [];
    let inTable = false;
    for (const line of lines) {
      if (line.startsWith("|")) {
        tableLines.push(line);
        inTable = true;
      } else if (inTable && !line.startsWith("|")) {
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

  function groupBySession(rows) {
    const sessions = new Map();
    for (const row of rows) {
      const num = parseInt(row.session, 10);
      if (!num) continue;
      if (!INSTRUMENT_LABEL[row.instrument]) continue;

      let bucket = sessions.get(num);
      if (!bucket) {
        bucket = {
          num,
          sun: row.sun,
          thu: row.thu,
          instruments: {},
        };
        sessions.set(num, bucket);
      }
      bucket.instruments[row.instrument] = {
        topic: row.topic,
        video_sun: row.video_sun,
        video_thu: row.video_thu,
      };
    }
    return Array.from(sessions.values()).sort((a, b) => a.num - b.num);
  }

  /* ---------- video slot rendering ---------- */
  function videoSlot(day, videoId) {
    const label = day === "sun" ? "sun" : "thu";

    if (!videoId) {
      // No recording yet — same in both modes.
      return `<span class="video-slot is-pending"><span class="video-day">${label}</span><span class="video-state">—</span></span>`;
    }

    if (isStudents) {
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

  function renderSessions(sessions) {
    listEl.innerHTML = "";
    if (sessions.length === 0) {
      listEl.innerHTML =
        '<li class="schedule-empty">schedule not available yet</li>';
      return;
    }

    for (const s of sessions) {
      const li = document.createElement("li");
      li.className = "session-block";

      const header = document.createElement("header");
      header.className = "session-header";
      header.innerHTML = `
        <span class="session-num">session ${s.num}</span>
        <span class="session-dates">
          <span class="session-date"><span class="session-day">sun</span> ${formatDate(s.sun)}</span>
          <span class="session-date-sep">·</span>
          <span class="session-date"><span class="session-day">thu</span> ${formatDate(s.thu)}</span>
        </span>
      `;

      const instList = document.createElement("ul");
      instList.className = "session-instruments";

      for (const key of INSTRUMENT_ORDER) {
        const inst = s.instruments[key];
        if (!inst) continue;
        const instLi = document.createElement("li");
        instLi.className = `instrument-row inst-${key}`;
        instLi.innerHTML = `
          <div class="instrument-head">
            <span class="instrument-dot" aria-hidden="true"></span>
            <span class="instrument-name">${INSTRUMENT_LABEL[key]}</span>
            <span class="instrument-times">
              <span class="instrument-time"><span class="instrument-day">sun</span> ${TIMES[key].sun}</span>
              <span class="instrument-time-sep">·</span>
              <span class="instrument-time"><span class="instrument-day">thu</span> ${TIMES[key].thu}</span>
            </span>
          </div>
          <div class="instrument-topic">${inst.topic || "—"}</div>
          <div class="instrument-videos">
            ${videoSlot("sun", inst.video_sun)}
            ${videoSlot("thu", inst.video_thu)}
          </div>
        `;
        instList.appendChild(instLi);
      }

      li.appendChild(header);
      li.appendChild(instList);
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
          <span class="en">For students only</span>
          <span class="vi">Chỉ dành cho học viên</span>
        </p>
        <h2 class="code-modal-title">
          <span class="en">Enter the course code</span>
          <span class="vi">Nhập mật khẩu lớp</span>
        </h2>
        <p class="code-modal-note">
          Enrolled students receive the code by email from
          Mekong NYC. Once you submit it, you'll be sent to the
          student page where every recorded session is listed
          with its YouTube link.
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
      if (hash === PASSWORD_HASH) {
        status.dataset.kind = "ok";
        status.textContent = "ok →";
        // Brief delay so the user sees the success state.
        setTimeout(() => {
          window.location.href = STUDENTS_URL;
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

  /* ---------- main load ---------- */
  async function load() {
    let text;
    try {
      const res = await fetch(COURSE_MD, { cache: "no-store" });
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
    const sessions = groupBySession(rows);
    renderSessions(sessions);
  }

  if (codeBtn) {
    codeBtn.addEventListener("click", openModal);
  }

  load();
})();
