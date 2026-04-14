/* ============================================================
   Courses page — loader + password gate
   ============================================================
   Fetches the course markdown file, extracts the shared unlock
   password from a leading HTML comment, splits the body into a
   blurb section and a schedule table, groups rows by session,
   and renders one block per session with both days (sun/thu)
   visible. Videos stay locked until the correct password is
   typed. The password lives in a gitignored md file.
   ============================================================ */
(function () {
  const COURSE_MD = "courses/dan-tranh-dan-bau-spring-2026.md";
  const UNLOCK_KEY = "maml-course-unlocked-sprING26";

  /* Class times by (instrument, day). Hardcoded here so the
     md file only has to carry session number, dates, topic,
     and video IDs. If the schedule ever changes, edit both
     this map and the course-meta block in courses.html. */
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
  const gateForm   = document.getElementById("scheduleGate");
  const gateInput  = document.getElementById("schedulePassword");
  const gateStatus = document.getElementById("scheduleGateStatus");

  let coursePassword = null;

  function setStatus(text, kind) {
    gateStatus.textContent = text || "";
    gateStatus.dataset.kind = kind || "";
  }

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
    /* Collect rows into { [sessionNum]: { sun, thu, instruments: {tranh, bau} } }.
       Ignore rows with an unknown instrument so the md file can
       carry comments or typos without crashing the page. */
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

  function videoSlot(day, videoId) {
    /* Each slot is a <span> that starts as "—" (no recording yet)
       or "locked" (recording exists, password not entered), and
       is rewritten into a watch link by unlockVideos() once the
       password is correct. data-video-id drives the rewrite. */
    const label = day === "sun" ? "sun" : "thu";
    if (!videoId) {
      return `<span class="video-slot is-pending"><span class="video-day">${label}</span><span class="video-state">—</span></span>`;
    }
    return `<span class="video-slot is-locked" data-video-id="${videoId}" data-day="${label}"><span class="video-day">${label}</span><span class="video-state">🔒 locked</span></span>`;
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

  function unlockVideos() {
    const slots = listEl.querySelectorAll(".video-slot.is-locked[data-video-id]");
    slots.forEach((slot) => {
      const id = slot.dataset.videoId;
      const day = slot.dataset.day;
      slot.outerHTML = `
        <a class="video-slot is-unlocked" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">
          <span class="video-day">${day}</span>
          <span class="video-state">▶ watch</span>
        </a>
      `;
    });
  }

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

    const passMatch = text.match(
      /<!--\s*password\s*:\s*([^\s>]+)\s*-->/i
    );
    coursePassword = passMatch ? passMatch[1] : null;

    const body = text.replace(/<!--[\s\S]*?-->/g, "").trim();

    /* The schedule section is identified by the first markdown
       table in the file — not by any heading. This lets the
       blurb above be free-form: any language, any number of
       paragraphs, with or without headings. */
    const tableIdx = body.search(/^\|.*\|\s*$/m);
    const blurbMd = tableIdx >= 0 ? body.slice(0, tableIdx) : body;
    const scheduleMd = tableIdx >= 0 ? body.slice(tableIdx) : "";

    renderBlurb(blurbMd.trim());

    const rows = parseTable(scheduleMd);
    const sessions = groupBySession(rows);
    renderSessions(sessions);

    if (sessionStorage.getItem(UNLOCK_KEY) === "1") {
      unlockVideos();
      setStatus("unlocked", "ok");
    }
  }

  gateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const typed = gateInput.value.trim();
    if (!coursePassword) {
      setStatus("no password set", "err");
      return;
    }
    if (typed === coursePassword) {
      sessionStorage.setItem(UNLOCK_KEY, "1");
      unlockVideos();
      setStatus("unlocked", "ok");
      gateInput.value = "";
    } else {
      setStatus("wrong password", "err");
    }
  });

  load();
})();
