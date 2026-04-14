/* ============================================================
   modules.js  —  data registry for Tôi Ăn Cơm trailer cards

   To add a new card, just append another object to MODULES.
   The engine in script.js renders + wires up everything from
   this list alone. No HTML or CSS edits required.

   RULE — colors are DERIVED, not declared.
   Do NOT add a `color` field here. The engine computes each
   card's --accent from its index (HSL wheel + fixed sat/light)
   so every card is guaranteed a distinct hue no matter how
   many cards you add. See script.js → "derived accent color".

   Two types currently supported:

   SWAP — one fixed slot in a fixed sentence rotates through a
          bank of words. Each bank entry: { word, en, vi }.
          The module owns `sentence: [left, active, right]`.

   ADD  — a particle (or template pair) is added to the base
          sentence. Each bank entry brings its own segment list:
          { word, segments: [{text, hit}, …], en, vi }. Segments
          marked `hit: true` get accent color — supports pairs
          like "có ... đâu" where both halves are highlighted.

   Each module carries a `caption: { en, vi }` pair — a dim
   teaser line shown above the transformed sentence, meant to
   make the learner anticipate what's coming. Keep it short
   (6-10 words), end with "..." to leave it hanging, and prefer
   a hint or rhetorical question over a mechanical description.

   The `target` label is kept for legacy reference but is no
   longer displayed. The `role.en/vi` also stays for reference
   but has been replaced on the card by `caption`.
   Future types ("overlapping", …) add their own renderer/
   behavior pair in script.js.
   ============================================================ */

window.MODULES = [

  // ---------- SWAP "tôi" ----------
  // Bank pulled from BANK_KINSHIP corpus (data/kinship.js).
  {
    id:    "swap-toi",
    type:  "swap",
    slot:  "toi",
    target:   "tôi",
    sentence: ["", "tôi", "ăn cơm"],
    caption: {
      en: 'who can "I" be in "tôi ăn cơm"...',
      vi: '"tôi" trong "tôi ăn cơm" có thể là ai...',
    },
    role: {
      en: "the one speaking",
      vi: "người đang nói",
    },
    bank: window.KINSHIP_BANK_DERIVED,
  },

  // ---------- SWAP "ăn" ----------
  // Bank from BANK_AN corpus (data/an.js).
  {
    id:    "swap-an",
    type:  "swap",
    slot:  "an",
    target:   "ăn",
    sentence: ["tôi", "ăn", "cơm"],
    caption: {
      en: '"ăn" has a big family...',
      vi: '"ăn" có họ hàng đông lắm...',
    },
    role: {
      en: "how it is taken in",
      vi: "cách đưa vào miệng",
    },
    bank: window.AN_BANK_DERIVED,
  },

  // ---------- SWAP "cơm" ----------
  // Bank from BANK_DOI_TAC corpus (data/com.js).
  {
    id:    "swap-com",
    type:  "swap",
    slot:  "com",
    target:   "cơm",
    sentence: ["tôi ăn", "cơm", ""],
    caption: {
      en: 'more than "cơm" on the table...',
      vi: 'không chỉ "cơm" trên mâm đâu...',
    },
    role: {
      en: "what is on the plate",
      vi: "thứ trên bàn ăn",
    },
    bank: window.COM_BANK_DERIVED,
  },

  // ---------- SWAP "lượng từ" ----------
  // Bank from BANK_COM corpus (data/luongtu.js).
  // Classifiers that sit between the verb and "cơm" — physical
  // units (hạt, miếng, đũa), containers (bát, nồi, cặp lồng),
  // diminutives (chút, tí), and body-as-measure (bụng, chực).
  // Every classifier carries both a literal and a metaphorical
  // reading (miếng cơm = survival, bát cơm = livelihood, mâm
  // cơm = family togetherness).
  {
    id:    "swap-luongtu",
    type:  "swap",
    slot:  "luongtu",
    target:   "lượng từ",
    sentence: ["tôi ăn", "hạt", "cơm"],
    caption: {
      en: "a grain, a bowl, a lifetime...",
      vi: "một hạt, một bát, hay một đời...",
    },
    role: {
      en: "how the rice is measured",
      vi: "đơn vị đong đếm cơm",
    },
    bank: window.LUONGTU_BANK_DERIVED,
  },

  // ---------- ADD "mở lời" ----------
  // Bank from BANK_HEAD (data/addrem-head.js).
  // Opening words — vocative, deferential, exclamatory, or
  // attention-getting tokens that open the turn.
  {
    id:    "add-head",
    type:  "add",
    slot:  "head",
    target: "mở lời",
    caption: {
      en: 'who\'s listening to "tôi ăn cơm"...',
      vi: 'ai đang nghe "tôi ăn cơm"...',
    },
    role: {
      en: "how the turn begins",
      vi: "cách mở lời",
    },
    bank: window.HEAD_BANK_DERIVED,
  },

  // ---------- ADD "thời gian" ----------
  // Bank from BANK_THOI_GIAN (data/addrem-aspect.js).
  // Time/aspect particles scattered around the base verb —
  // Vietnamese does tense via position, not conjugation.
  {
    id:    "add-thoi-gian",
    type:  "add",
    slot:  "thoi-gian",
    target: "thời gian",
    caption: {
      en: 'when does "tôi ăn cơm" happen...',
      vi: '"tôi ăn cơm" vào lúc nào...',
    },
    role: {
      en: "when the action sits in time",
      vi: "lúc của hành động",
    },
    bank: window.THOI_GIAN_BANK_DERIVED,
  },

  // ---------- ADD "tiểu từ cuối câu" ----------
  // Bank from BANK_FINAL_PARTICLES (data/addrem-final.js).
  // Particles appended after "tôi ăn cơm" — each one a social
  // temperature (kính, mời, biện bạch, trêu, hờn, than).
  {
    id:    "add-final",
    type:  "add",
    slot:  "final",
    target: "tiểu từ cuối",
    caption: {
      en: "one last word, a whole attitude...",
      vi: "một chữ cuối, cả một thái độ...",
    },
    role: {
      en: "the mood at the end",
      vi: "sắc thái ở cuối câu",
    },
    bank: window.FINAL_BANK_DERIVED,
  },

  // ---------- ADD "câu hỏi" ----------
  // Bank from BANK_QUESTION (data/addrem-question.js).
  // Question markers + clamp templates (có...không, đã...chưa).
  // Both halves of a template pair are highlighted at once.
  {
    id:    "add-question",
    type:  "add",
    slot:  "question",
    target: "câu hỏi",
    caption: {
      en: '"tôi ăn cơm" — or not yet...',
      vi: '"tôi ăn cơm" — rồi chưa...',
    },
    role: {
      en: "how it turns into a question",
      vi: "chữ đánh dấu nghi vấn",
    },
    bank: window.QUESTION_BANK_DERIVED,
  },

  // ---------- ADD "phủ định" ----------
  // Bank from BANK_NEGATION (data/addrem-negation.js).
  // Five groups: direct, counter-denial templates, helplessness
  // (position-dependent), deliberate abstention, slang.
  {
    id:    "add-negation",
    type:  "add",
    slot:  "negation",
    target: "phủ định",
    caption: {
      en: 'how many shades of "not eating"...',
      vi: 'có bao nhiêu kiểu "không ăn"...',
    },
    role: {
      en: "shades of saying no",
      vi: "các kiểu nói 'không'",
    },
    bank: window.NEGATION_BANK_DERIVED,
  },

  // ---------- ADD "tâm thế" ----------
  // Bank from BANK_MODAL (data/addrem-modal.js).
  // Inner stance toward the action — obligation, advice, desire,
  // need, grace, daring, habit. 'Được' (grace) vs 'phải' (burden)
  // is the axis English doesn't have.
  {
    id:    "add-modal",
    type:  "add",
    slot:  "modal",
    target: "tâm thế",
    caption: {
      en: "by choice, by duty, or by grace...",
      vi: "ăn vì thích, vì phải, hay vì được...",
    },
    role: {
      en: "the stance behind the act",
      vi: "tâm thế trước hành động",
    },
    bank: window.MODAL_BANK_DERIVED,
  },

  // ---------- ADD "cơm nào" ----------
  // Bank from BANK_COM_TRANG_THAI (data/addrem-com-state.js).
  // Rice qualifiers — cooking states, varieties, class contexts.
  // Each qualifier carries a metaphor or an idiom.
  {
    id:    "add-com-state",
    type:  "add",
    slot:  "com-state",
    target: "cơm nào",
    caption: {
      en: "which rice? cooked by whom...",
      vi: "cơm nào? của ai nấu...",
    },
    role: {
      en: "which bowl, whose cooking",
      vi: "nồi cơm nào, của ai nấu",
    },
    bank: window.COM_STATE_BANK_DERIVED,
  },

  // ---------- ADD "nhân cách" ----------
  // Bank from BANK_AN_MO (data/addrem-an-mo.js).
  // 'Ăn' + partner verb → fixed compound judging the whole
  // person: ăn ở (conduct), ăn nói (speech), ăn mặc (dress),
  // ăn uống (lifestyle). Each compound hosts a set of fixed
  // idioms that rate people on that dimension.
  {
    id:    "add-an-mo",
    type:  "add",
    slot:  "an-mo",
    target: "nhân cách",
    caption: {
      en: "eat, speak, dress, live — a whole character...",
      vi: "ăn, nói, ở, mặc — cả con người...",
    },
    role: {
      en: "how one eats, speaks, dresses, lives",
      vi: "cách ăn, nói, mặc, ở — cả nhân cách",
    },
    bank: window.AN_MO_BANK_DERIVED,
  },

  // ---------- ADD "không phải ăn" ----------
  // Bank from BANK_AN_BONG (data/addrem-an-bong.js).
  // 'Ăn' that isn't eating-with-the-mouth at all — ăn đòn (get
  // beaten), ăn ảnh (photogenic), ăn cắp (steal), ăn lương (draw
  // salary), ăn vạ (extort sympathy). The mouth is nowhere in
  // sight. English has no verb this wide.
  {
    id:    "add-an-bong",
    type:  "add",
    slot:  "an-bong",
    target: "không phải ăn",
    caption: {
      en: '"ăn" that isn\'t chewing...',
      vi: '"ăn" mà không nhai bằng miệng...',
    },
    role: {
      en: "'ăn' with no mouth involved",
      vi: "'ăn' mà không bằng miệng",
    },
    bank: window.AN_BONG_BANK_DERIVED,
  },

  // ---------- ADD "dịp" ----------
  // Bank from BANK_AN_LE (data/addrem-an-le.js).
  // 'Ăn' that packages an entire occasion — ăn Tết, ăn cưới,
  // ăn giỗ, ăn đầy tháng. The mouth IS involved (there's a
  // feast), but the verb really wraps the whole dịp: visit,
  // celebrate, worship, rest, eat. English splits into
  // celebrate / attend / observe; Vietnamese keeps it under
  // one 'ăn'.
  {
    id:    "add-an-le",
    type:  "add",
    slot:  "an-le",
    target: "dịp",
    caption: {
      en: 'Tết, weddings, death days — also "ăn"...',
      vi: 'Tết, cưới, giỗ — cũng là "ăn"...',
    },
    role: {
      en: "'ăn' wrapping a whole occasion",
      vi: "'ăn' gói cả một dịp",
    },
    bank: window.AN_LE_BANK_DERIVED,
  },

];
