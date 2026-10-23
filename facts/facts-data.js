// facts-data.js — SINGLE SOURCE OF TRUTH for the FACTS 2026–27 page.
//
// FACTS = Folk Arts-Cultural Treasures Charter School, Philadelphia.
// This page is for ONE class: the Friday Đàn Tranh Ensemble, lead
// teacher in `teachers` below (grades 5–6 and 7–8). The contract email also
// lists a "Friday Folk Arts Class" (T. Senfu · T. John) and Black
// Heritage Day (T. Senfu · T. Kenny) — those are other classes and are
// deliberately NOT on this page.
//
// Everything the page shows comes from this file. facts.js is a
// data-agnostic renderer — to change the page, edit THIS file only.
//
//   calendar   ← copied verbatim from the contract email (SOURCES.contract).
//                Do not "fix" dates without a new source; if a date
//                moves, add a comment saying where the change came from.
//   materials  ← registry of everything a student can open. Each entry
//                has a `kind`; facts.js draws it with MATERIAL_KINDS
//                (video / app / page). Videos are built from the
//                originals by build-videos.sh.
//   plan       ← session number → material ids. A session with no entry
//                shows "nothing to watch yet". Only real, existing
//                materials go in; the order is a proposal (see plan).
//   songs      ← pieces for this year, each with its materials.
//   sections   ← long-form content blocks (booklet text, story…), drawn
//                with BLOCK_KINDS in facts.js.
//   glossary   ← the ONLY Vietnamese on the page. Students read English;
//                a Vietnamese word appears only as the real name of a
//                thing and must be listed here with its meaning.
//
// Dates are ISO "YYYY-MM-DD", read as local calendar days.

window.FACTS = {
  SOURCES: {
    contract: "Ensemble Artist Contract Details 2026-27 (MAML email, Aug 25, 2026)",
    booklet: "Học Đàn Tranh — 2026–2027 Introduction, grades 5–6 and 7–8 (by the lead teacher)",
    showcase2026: "Spring Showcase 2026 introducers' script (FACTS 2026)",
  },

  // ---- teachers --------------------------------------------------------
  // The ONLY place a teacher's name lives. The lead teacher is shown once,
  // in the page header. Temporary teachers appear only on their dates,
  // always alongside the lead teacher. Prose elsewhere must not repeat
  // names — say "your teacher" instead.
  teachers: {
    lead: "Ngô Thanh Nhàn",
    temporary: [
      { name: "Victoria Ruslan", dates: ["2026-10-09"] },
    ],
  },

  // ---- calendar ------------------------------------------------------
  calendar: {
    title: "Đàn Tranh Ensemble",
    dates: [
      "2026-09-25",
      "2026-10-02", "2026-10-09", "2026-10-16", "2026-10-23", "2026-10-30",
      "2026-11-06", "2026-11-13", "2026-11-20",
      "2026-12-04", "2026-12-11", "2026-12-18",
      "2027-01-08", "2027-01-15", "2027-01-22", "2027-01-29",
      "2027-02-12", "2027-02-19", "2027-02-26",
      "2027-03-05", "2027-03-12", "2027-03-19",
      "2027-04-02", "2027-04-09", "2027-04-16", "2027-04-23", "2027-04-30",
      "2027-05-07", "2027-05-14", "2027-05-21",
    ],
    expectedCount: 30, // "Total # of sessions: 30" — facts.js checks this
    closures: ["2026-11-27", "2026-12-25", "2027-01-01", "2027-02-05", "2027-03-26"],
  },

  events: [
    {
      date: "2027-02-03",
      title: "Lunar New Year (Tết)",
      // Contract email: "Lunar New Year: Feb. 3rd (for T. John and T. Nhan)".
    },
    {
      date: "2027-05-14",
      kind: "showcase", // star on the calendar; the next-class card counts down to it
      title: "Showcase",
      // Source: the email says "Showcase on the 21st (need to make it the
      // 14th)"; its FFAC list confirms "May 14th (Showcase)".
    },
    {
      date: "2027-05-21",
      kind: "finale",
      title: "Last class · celebrations",
    },
  ],

  // The Đàn Tranh Tab app. `tab` / `levels` materials link to TAB_APP + "?score=<id>".
  TAB_APP: "https://anhthuphan.com/DanTranhTab/",

  // ---- materials registry -------------------------------------------
  // kind: "video" → facts/videos/<id>.mp4 (built by build-videos.sh; `origin`
  //                 is the source path inside archive/facts-originals/)
  // kind: "app"   → external MAML app, opens in a new tab
  // kind: "tab"   → one song in the Đàn Tranh Tab app (`score` = its ?score= id)
  // kind: "levels"→ one song in several levels/versions, each a tab score;
  //                 drawn as one row of buttons so a student picks a level
  //                 and lands straight on that tab (no hunting in the library)
  // kind: "page"  → a page on this site (path relative to site root)
  // kind: "read"  → a section further down THIS page (id in `sections`)
  // group         → which shelf of the video library it sits on (videoGroups)
  materials: [
    // getting started
    { id: "unpack-and-pack", kind: "video", group: "care",
      title: "Taking the đàn tranh out of its bag — and putting it back",
      // original file had no descriptive name; title written from watching it
      origin: "videos/video_03.mp4" },
    { id: "check-at-home", kind: "video", group: "care",
      title: "Checking your đàn tranh at home",
      origin: "videos/04_check-dan-tranh_at-home_01.mp4" },
    { id: "tuning", kind: "video", group: "care",
      title: "Tuning the đàn tranh",
      origin: "Lesson Materials/Week 3 11-2-2020/10_tuning.mp4" },

    // techniques — each clip shows the tablature symbol next to the hand
    { id: "tech-glide-1", kind: "video", group: "technique",
      title: "Glide (Á) — one finger", origin: "techniques/Tab Dan Tranh _ Glide 1.mov" },
    { id: "tech-glide-2", kind: "video", group: "technique",
      title: "Glide (Á) — two fingers", origin: "techniques/Tab Dan Tranh _ Glide 2.mov" },
    { id: "tech-play-then-bend", kind: "video", group: "technique",
      title: "Play, then bend", origin: "techniques/Tab Dan Tranh _ Play then Bend.mov" },
    { id: "tech-play-after-bend", kind: "video", group: "technique",
      title: "Play after bend", origin: "techniques/Tab Dan Tranh _ Play after Bend.mov" },
    { id: "tech-vibration", kind: "video", group: "technique",
      title: "Vibration", origin: "techniques/Tab Dan Tranh _ Vibration 1.mov" },

    // Mother Ocean
    { id: "mother-ocean-vibrato", kind: "video", group: "mother-ocean",
      title: "Mother Ocean — sung, with vibratos",
      origin: "Lesson Materials/Mother Ocean/Mother-Ocean_sung-n-vibratos_01.mp4" },
    { id: "mother-ocean-sung-2", kind: "video", group: "mother-ocean",
      title: "Mother Ocean — sung, with vibratos (take 2)",
      origin: "Lesson Materials/Mother Ocean/Mother-Ocean_sung-n-vibratos_02.mp4" },
    { id: "mother-ocean-chords", kind: "video", group: "mother-ocean",
      title: "Mother Ocean — chords and vibratos",
      origin: "Lesson Materials/Mother Ocean/Mother-Ocean_chords-and-vibratos_01.mp4" },
    { id: "mother-ocean-octave", kind: "video", group: "mother-ocean",
      title: "Mother Ocean — octaves and vibratos",
      origin: "Lesson Materials/Mother Ocean/Mother-Ocean_Octave_and_vibratos.mp4" },

    // One Mother, A Hundred Children — play-alongs
    { id: "one-mother-a", kind: "video", group: "one-mother",
      title: "One Mother — melody, section A",
      origin: "one-mother/One-Mother_A-Hundred-Children_Melody-Section-A.mp4" },
    { id: "one-mother-b", kind: "video", group: "one-mother",
      title: "One Mother — melody, section B",
      origin: "one-mother/One-Mother-A-Hundred-Children_Melody_Section-B.mp4" },
    { id: "one-mother-aab", kind: "video", group: "one-mother",
      title: "One Mother — melody, A-A-B",
      origin: "one-mother/One Mother A Hundred Children Melody Sections A-A-B.mp4" },
    { id: "one-mother-rhythm", kind: "video", group: "one-mother",
      title: "One Mother — rhythm part",
      origin: "one-mother/One-Mother-A-Hundred-Children_Rhythm.mp4" },
    { id: "one-mother-whole", kind: "video", group: "one-mother",
      title: "One Mother — whole song: intro, A-A-B, outro",
      origin: "one-mother/One Mother Melody Rhythm Intro AAB Outro.mp4" },

    // apps
    { id: "tuner", kind: "app", title: "Đàn Tranh Tuner",
      hint: "Open it, allow the microphone, pluck one string at a time.",
      url: "https://anhthuphan.com/DanTranhTab/#tuner" },
    { id: "tab", kind: "app", title: "Đàn Tranh Tab",
      hint: "Pick a song, press play, and follow the strings.",
      url: "https://anhthuphan.com/DanTranhTab/" },
    { id: "freeplay", kind: "app", title: "Free Play",
      hint: "Play freely, with the app listening along.",
      url: "https://anhthuphan.com/DanTranhTab/#freeplay" },
    // tablature in the Đàn Tranh Tab app — ids are the app's ?score= ids
    { id: "tab-exercise-1", kind: "tab", title: "Exercise 1 — play-along tab", score: "Exercise-1_dan-tranh" },
    { id: "tab-exercise-2", kind: "tab", title: "Exercise 2 — play-along tab", score: "Exercise-2_dan-tranh" },
    { id: "tab-sakura", kind: "tab", title: "Sakura — đàn tranh tab", score: "Sakura_folksong_Japanese_Tranh" },
    { id: "tab-sakura-melody", kind: "tab", title: "Sakura — melody tab", score: "Sakura_folksong_Japanese_Melody" },
    // Leveled sets, easiest first (by number of notes). Added to the app
    // Oct 2026 from the FACTS teacher files (DanTranhTab scripts/add-scores.mjs).
    { id: "tab-mother-ocean", kind: "levels", title: "Mother Ocean — tab", levels: [
      { label: "Sung", score: "Me-Trung-Duong_Sung" },
      { label: "Rhythm", score: "Me-Trung-Duong_Rhythm" },
      { label: "Level 1", score: "Me-Trung-Duong_Level-1" },
      { label: "Chords", score: "Me-Trung-Duong_Chords" },
      { label: "Octaves", score: "Me-Trung-Duong_Octaves" },
      { label: "Level 4", score: "Me-Trung-Duong_Level-4" },
    ] },
    { id: "tab-one-mother", kind: "levels", title: "One Mother — tab", levels: [
      { label: "1", score: "Mot-Me-Tram-Con_Level-1" },
      { label: "2", score: "Mot-Me-Tram-Con_Level-2" },
      { label: "3a", score: "Mot-Me-Tram-Con_Level-3a" },
      { label: "3b", score: "Mot-Me-Tram-Con_Level-3b" },
      { label: "4a", score: "Mot-Me-Tram-Con_Level-4a" },
      { label: "4b", score: "Mot-Me-Tram-Con_Level-4b" },
    ] },
    // Khổng Minh Tọa Lầu = "On Top of the Citadel": the octave file's subtitle
    // reads "On Top of the Citadel" (~/Scores/musicxml/Khong-Minh-toa-lau).
    { id: "tab-citadel", kind: "levels", title: "On Top of the Citadel — tab", levels: [
      { label: "1", score: "Khong-Minh-Toa-Lau_Level-1" },
      { label: "2", score: "Khong-Minh-Toa-Lau_Level-2" },
      { label: "3", score: "Khong-Minh-Toa-Lau_Level-3" },
      { label: "Octaves", score: "Khong-Minh-Toa-Lau_Octaves" },
    ] },
    { id: "tab-twinkle", kind: "levels", title: "Twinkle — tab", levels: [
      { label: "1", score: "Twinkle-Twinkle-Little-Star_Level-1" },
      { label: "2", score: "Twinkle-Twinkle-Little-Star_Level-2" },
    ] },

    // sections on this page — so the schedule can point at them
    { id: "read-welcome", kind: "read", section: "welcome", title: "Our pledge + what's in your bag" },
    { id: "read-meet", kind: "read", section: "meet", title: "Meet the đàn tranh — the 17 strings" },
    { id: "read-picks", kind: "read", section: "picks", title: "Picks and the rest stroke" },
    { id: "read-pentatonic", kind: "read", section: "pentatonic", title: "The five-note scale — with Bobby McFerrin" },

    // MAML Basics pages
    { id: "basics-your-dan-tranh", kind: "page", title: "You and your đàn tranh", path: "basics/your-dan-tranh/" },
    { id: "basics-tuning", kind: "page", title: "Tuning — the 17 strings", path: "basics/tuning/" },
    { id: "basics-tablature", kind: "page", title: "How to read the tablature", path: "basics/tablature-reading/" },
    { id: "page-twinkle", kind: "page", title: "Twinkle — MAML repertoire page", path: "repertoire/twinkle-twinkle/" },
  ],

  // Shelves of the video library, in order.
  videoGroups: [
    { id: "care", title: "Getting started" },
    { id: "technique", title: "Techniques — watch the tab symbol" },
    { id: "mother-ocean", title: "Mother Ocean" },
    { id: "one-mother", title: "One Mother, A Hundred Children" },
  ],

  // Toolbox strip — "open these before every class".
  tools: ["tuner", "tab", "freeplay", "basics-your-dan-tranh", "basics-tuning", "basics-tablature"],

  // ---- every class ---------------------------------------------------
  // Shown on every session's day card. Source: booklet — "Your đàn tranh
  // should be well tuned before each class and at demos."
  everyClass: {
    text: "Every class: tune first. Your đàn tranh should be well tuned before each class.",
    materials: ["tuner"],
  },

  // ---- lesson plan: session number → material ids --------------------
  // PROPOSED ORDER — for the lead teacher to adjust. Modeled on the old
  // FACTS page ("Dan Tranh Main Page Script", Sep 2020): carrying/sitting
  // → tuning → Exercise 1–2 → songs → pentatonic song → improvisation,
  // and on the 2020 week folders (week 2: sitting, carrying, picks, story;
  // week 3: strings, tuner, nail fitting). The 2020 Trầu Cau story is
  // NOT taught (teacher's call, Oct 2026). Built only from materials that exist:
  //   1–3   getting started
  //   4–6   reading tablature + Exercises 1–2; the pentatonic scale
  //         (McFerrin) — the old page's "pentatonic" step
  //   7–9   the five technique clips (glide, bend, vibration); Twinkle
  //         needs bends for F and B, so it comes right after them
  //   10–13 Mother Ocean (its clips practise vibrato, learned in 9)
  //   14–18 One Mother, A Hundred Children (A, B, A-A-B, rhythm, whole)
  //   19–21 Sakura — promised at the 2026 Showcase for this year
  //   22    the two Showcase-2026 songs together
  //   23–26 On Top of the Citadel (Khổng Minh Tọa Lầu) — Level 1, 2, 3, Octaves
  //   27    the three Showcase songs together · 28 Showcase run-through
  //         (the rice-transplanting song still has no materials)
  //   29    Showcase (May 14) · 30 last class
  // Every song session links the song's tab in all its levels (`levels`):
  // students pick a level, never assigned by grade.
  plan: {
    1: ["read-welcome", "unpack-and-pack", "basics-your-dan-tranh"],
    2: ["check-at-home", "read-picks"],
    3: ["tuning", "read-meet", "basics-tuning", "tuner"],
    4: ["basics-tablature", "tab-exercise-1"],
    5: ["tab-exercise-1"],
    6: ["tab-exercise-2", "read-pentatonic"],
    7: ["tech-glide-1", "tech-glide-2"],
    8: ["tech-play-then-bend", "tech-play-after-bend"],
    9: ["tech-vibration", "tab-twinkle"],
    10: ["mother-ocean-vibrato", "tab-mother-ocean"],
    11: ["mother-ocean-sung-2", "tab-mother-ocean"],
    12: ["mother-ocean-chords", "tab-mother-ocean"],
    13: ["mother-ocean-octave", "tab-mother-ocean"],
    14: ["one-mother-a", "tab-one-mother"],
    15: ["one-mother-b", "tab-one-mother"],
    16: ["one-mother-aab", "tab-one-mother"],
    17: ["one-mother-rhythm", "tab-one-mother"],
    18: ["one-mother-whole", "tab-one-mother"],
    19: ["tab-sakura-melody"],
    20: ["tab-sakura"],
    21: ["tab-sakura"],
    22: ["mother-ocean-vibrato", "one-mother-whole", "tab-mother-ocean", "tab-one-mother"],
    23: ["tab-citadel"],
    24: ["tab-citadel"],
    25: ["tab-citadel"],
    26: ["tab-citadel"],
    27: ["tab-mother-ocean", "tab-one-mother", "tab-citadel"],
    28: ["one-mother-whole", "tab-mother-ocean", "tab-one-mother", "tab-citadel"],
  },

  // ---- songs this year -----------------------------------------------
  // Teaching principle (lead teacher): ONE shared program for grades 5–6
  // and 7–8 — never split by grade. Each song comes in several levels; a
  // younger student may play a hard version, an older one an easy one.
  // When a song has leveled versions, list them under `levels`
  // (future field) — never assign a level by grade.
  songsIntro: "Grades 5–6 and 7–8 play the same songs. Every song comes in several levels — easy to hard. Pick the level that fits you, whatever grade you're in.",

  // Source for every `about` line: SOURCES.showcase2026, which says what
  // the ensemble performed in spring 2026 and what it promised for "next
  // year" (= 2026–27). Nothing here is invented; unknown = left empty.
  songs: [
    {
      id: "warmups",
      title: "Warm-ups",
      about: "Two exercises written for this ensemble — play along in the Tab app.",
      materials: ["tab-exercise-1", "tab-exercise-2"],
    },
    {
      id: "mother-ocean-one-mother",
      title: "Mother Ocean + One Mother, A Hundred Children",
      about: "Two songs played together, retelling how the Vietnamese people began — from the Ocean. Performed at the Spring Showcase 2026.",
      materials: ["tab-mother-ocean", "tab-one-mother",
                  "mother-ocean-vibrato", "mother-ocean-chords", "mother-ocean-octave",
                  "one-mother-a", "one-mother-b", "one-mother-whole"],
    },
    {
      id: "citadel",
      title: "On Top of the Citadel (Khổng Minh Tọa Lầu)",
      about: "A song about bravery for the community. Performed at the Spring Showcase 2026.",
      materials: ["tab-citadel"],
    },
    {
      id: "sakura",
      title: "Sakura Sakura (“Cherry Blossoms”)",
      about: "A Japanese folk song in the “In” scale. Your teacher played it at the 2026 Showcase and promised: we'll learn this song next year — that's now!",
      materials: ["tab-sakura", "tab-sakura-melody"],
    },
    {
      id: "twinkle",
      title: "Twinkle, Twinkle, Little Star",
      // Source: "Hooktheory List for Facts 2020-2021" — a student's choice that year.
      about: "Chosen by a FACTS student in 2020–21. Its F and B are not on the open strings — press to bend up to them.",
      materials: ["tab-twinkle", "page-twinkle"],
    },
    {
      id: "rice",
      title: "A rice-transplanting song",
      about: "Planned for the 2026 Showcase, but we ran out of time — “come hear us playing this song next year.” Title and materials coming.",
      materials: [],
    },
  ],

  // ---- long-form sections (drawn by BLOCK_KINDS) ----------------------
  sections: [
    {
      id: "welcome",
      title: "Welcome to the ensemble",
      source: "booklet",
      blocks: [
        { type: "h3", text: "Our pledge" },
        { type: "list", items: [
          "I am joining the Đàn Tranh to be an active learner.",
          "I will treat my art form and my Teacher with respect – and I will help others to do the same.",
          "I will do my best to fulfill my role within this ensemble and to help those around me fulfill theirs.",
          "I will attend all sessions unless I have an excused absence.",
          "I will be ready to share what I learn with others.",
        ] },
        { type: "h3", text: "What's in your đàn tranh bag" },
        { type: "checklist", key: "bag", items: [
          "One đàn tranh — your đàn tranh number is on the back",
          "Four steel picks, for playing",
          "One tuning peg, for tuning",
          "One spare set of steel strings, for replacement",
          "Your Introduction sheet",
        ] },
        { type: "h3", text: "Your responsibility" },
        { type: "p", text: "Come to class prepared, with your own picks (well adjusted to your right-hand fingers), your đàn tranh lesson booklet and music sheets. These items are provided in class beforehand. Take care of your đàn tranh at all times. Your đàn tranh should be well tuned before each class and at demos." },
      ],
    },
    {
      id: "meet",
      title: "Meet the đàn tranh",
      source: "booklet",
      blocks: [
        { type: "image", src: "img/dan-tranh.png", alt: "A đàn tranh seen from the side: tuning pegs on the left, 17 bridges in a diagonal line, strings stretched to the right end" },
        { type: "p", text: "Đàn tranh is also known as đàn thập lục, the sixteen-stringed zither. Today most đàn tranh have 17 strings. The đàn tranh is considered a symbol of the Imperial City of Huế in Vietnam. Bigger đàn tranh can have 19, 21, 22, 24 or 36 strings.",
          edit: "Lightly edited for grammar. Booklet: “Today,most đàn tranh has 17 strings … Bigger đàn tranh’s can have 19, 21, 22, 24 or 36 strings.”" },
        { type: "p", text: "The đàn tranh looks like a bamboo tube sliced in half along its length. Toward the middle of the soundboard there are 17 wooden bridges, called nhạn (“swallows”). At the narrow end of the box are 17 pegs (trục) holding one end of the strings, for tuning. The strings are metal and usually tuned to a pentatonic (five-note) scale. The đàn tranh sits flat, like an autoharp, and is plucked with the fingers — players wear picks to help them pluck.",
          edit: "Lightly edited for grammar. Booklet: “Đàn Tranh resembles a bamboo tube that has been sliced vertically in half … Đàn Tranh sits flat like an auto-harp and is plucked using all four fingers. Players will usually wear picks on their fingers to facilitate plucking.”" },
        { type: "h3", text: "The 17 strings" },
        { type: "strings" },
        { type: "image", src: "img/staff.jpg", alt: "The 17 open-string pitches written on a treble staff, from E3 up to G6" },
        { type: "h3", text: "Cousins around Asia" },
        { type: "table", head: ["Instrument", "Where", "Strings"], rows: [
          ["Koto", "Japan", "13"],
          ["Gayageum", "Korea", "12", "Booklet spells it “Kayagum” (an older romanization)."],
          ["Yatga", "Mongolia", "12", "✎ corrected — booklet: “Jatac”. The Mongolian zither is spelled yatga in English sources."],
          ["Zheng (guzheng)", "China", "13–16", "✎ corrected — booklet: “Zeng”."],
          ["Kacapi", "Indonesia", "7–24", "✎ corrected — booklet: “Kachap”."],
        ] },
      ],
    },
    {
      id: "picks",
      title: "Picks and the rest stroke",
      source: "booklet",
      blocks: [
        { type: "images", items: [
          { src: "img/pick-thumb.png", alt: "Thumb pick", caption: "Thumb pick — curly tip" },
          { src: "img/pick-finger.png", alt: "Finger pick", caption: "Index / middle pick" },
          { src: "img/picks-hand.png", alt: "A right hand wearing picks", caption: "Picks perpendicular to the strings" },
        ] },
        { type: "p", text: "Picks are usually made of metal, horn or plastic. They can be adjusted to fit tightly on the thumb, the index, the middle, and sometimes the ring finger. The thumb pick has a curly tip." },
        { type: "p", text: "Index and middle finger picks pluck so that the finger is straight and perpendicular to the string, using the rest stroke: pluck a string and rest on the next string. The tip of the thumb pick should also be perpendicular to the string, using the rest stroke." },
      ],
    },
    {
      id: "pentatonic",
      title: "The five-note scale",
      source: "mcferrin",
      blocks: [
        { type: "p", text: "Our đàn tranh is tuned to five notes — C D E G A — repeated up the strings. That five-note scale is called pentatonic. Watch Bobby McFerrin show a whole audience that they already know it." },
        { type: "youtube", id: "ne6tB2KiZuk", title: "Bobby McFerrin Demonstrates the Power of the Pentatonic Scale" },
      ],
    },
  ],

  // Where each section's text comes from (shown under the section).
  sectionSources: {
    booklet: "From the 2026–27 Introduction booklet.",
    mcferrin: "Video: World Science Festival (YouTube). On the old FACTS page as “Natural pentatonic with Bobby McFerrin”.",
  },

  // The 17 open strings — from the booklet's string/pitch table.
  strings: ["E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5", "C6", "D6", "E6", "G6"],

  // Past FACTS ensembles — filenames in ../photos-thumb/; captions come
  // from ../photos-meta.js (PHOTO_META), never retyped here.
  photos: [
    "2019-dan-tranh-performance-at-folk-arts-charter-school-philadelphia.jpg",
    "2019-dan-tranh-performance-2-at-folk-arts-charter-school-philadelphia.jpg",
    "2019-dan-tranh-performance-at-temple-university-with-folk-arts-charter-schools-students-philadelphia-edited.jpg",
    "2019-dan-tranh-performance-by-folk-arts-charter-schools-students-philadelphia.jpg",
  ],

  // From the booklet's "Special thanks to".
  thanks: [
    "Asian Americans United",
    "Philadelphia Folklore Project",
    "Mekong Arts & Music",
    "Manhattan Academy of Music & Language",
  ],

  glossary: [
    { term: "đàn tranh", meaning: "the Vietnamese zither — our instrument; ours has 17 strings" },
    { term: "đàn thập lục", meaning: "“sixteen-stringed instrument”, an older name for the đàn tranh" },
    { term: "nhạn", meaning: "the wooden bridges under the strings — literally “swallows” (the bird)" },
    { term: "trục", meaning: "the tuning pegs at the narrow end" },
    { term: "Huế", meaning: "the old imperial capital of Vietnam" },
    { term: "Khổng Minh Tọa Lầu", meaning: "the Vietnamese name of On Top of the Citadel — “Khổng Minh sits on the citadel tower”" },
    { term: "Tết", meaning: "Lunar New Year" },
  ],
};
