/* ============================================================
   data/addrem-an-mo.js — Nhân cách (ăn + verb compounds)

   Vietnamese uses 'ăn' as a compound root for judging someone's
   ENTIRE character, not just their eating. Ăn ở (conduct), ăn
   nói (speech), ăn mặc (dress), ăn uống (lifestyle) — each
   compound takes 'ăn' as the first half and a life-domain verb
   as the second, then collects a set of fixed idioms that rate
   people on that dimension. The partner verb is what we
   highlight — 'ăn' itself stays muted as the scaffolding.

   Exposed:
     window.BANK_AN_MO
     window.AN_MO_BANK_DERIVED
   ============================================================ */

const BANK_AN_MO = {
  name:    "Ăn + verb = đánh giá nhân cách / lối sống",
  note:    "'Ăn' ghép verb đơn → compound cố định đánh giá TOÀN BỘ con người. Cùng pattern: ăn ở, ăn nói, ăn mặc.",
  note_en: "'Ăn' + single verb → fixed compound judging someone's ENTIRE character. Same pattern: ăn ở (conduct), ăn nói (speech), ăn mặc (dress).",
  items: [
    // ---- Chữ lẻ — các partner đơn của 'ăn' ----
    { vi: "ở",
      render: ["tôi ăn", "+ở"],
      nuance_vi: "Ăn ở = cách sống, đạo đức. 'Nó ăn ở không ra gì.'",
      nuance_en: "'Ăn ở' = moral conduct, way of living. 'Their conduct is terrible.'" },

    { vi: "nói",
      render: ["tôi ăn", "+nói"],
      nuance_vi: "Ăn nói = cách nói năng, lễ phép. 'Con ăn nói phải phép.'",
      nuance_en: "'Ăn nói' = way of speaking, manners. 'Speak properly, child.'" },

    { vi: "mặc",
      render: ["tôi ăn", "+mặc"],
      nuance_vi: "Ăn mặc = gu thời trang, phong cách. 'Ăn mặc chỉnh tề.'",
      nuance_en: "'Ăn mặc' = style, way of dressing. 'Dressed neatly.'" },

    { vi: "uống",
      render: ["tôi ăn", "+uống"],
      nuance_vi: "Ăn uống = ăn uống nói chung, lối sống. 'Ăn uống phải ý tứ.'",
      nuance_en: "'Ăn uống' = eating and drinking in general, lifestyle. 'Be mindful of how you eat and drink.'" },

    // ---- Compounds ăn uống ----
    { vi: "ăn uống như heo",
      render: ["tôi ăn", "+uống như heo"],
      nuance_vi: "Ăn uống bừa bãi, nhóp nhép, bẩn.",
      nuance_en: "Eating like a pig — messy, noisy, dirty." },

    { vi: "ăn uống phải ý tứ",
      render: ["tôi ăn", "+uống phải ý tứ"],
      nuance_vi: "Phải biết lễ phép, đúng mực khi ăn.",
      nuance_en: "Must eat and drink with propriety." },

    // ---- Compounds ăn ở ----
    { vi: "ăn ở như heo",
      render: ["tôi ăn", "+ở như heo"],
      nuance_vi: "Lối sống bừa bộn, bẩn thỉu, phòng ốc như chuồng.",
      nuance_en: "Living like a pig — messy, filthy, room like a sty." },

    { vi: "ăn ở như chó",
      render: ["tôi ăn", "+ở như chó"],
      nuance_vi: "Phản trắc, vô ơn, cắn lại người đã nuôi. Lời chửi cay độc.",
      nuance_en: "Treacherous, ungrateful, biting the hand that fed. A vicious curse." },

    { vi: "ăn ở bạc bẽo",
      render: ["tôi ăn", "+ở bạc bẽo"],
      nuance_vi: "Tuyệt tình, cạn nghĩa. Vứt bỏ ân tình.",
      nuance_en: "Heartless, cutting off old bonds. Discarding loyalty like trash." },

    { vi: "ăn ở hai lòng",
      render: ["tôi ăn", "+ở hai lòng"],
      nuance_vi: "Sống giả dối, gió chiều nào che chiều nấy.",
      nuance_en: "Two-faced, shifting allegiance with the wind." },

    { vi: "ăn ở có đức",
      render: ["tôi ăn", "+ở có đức"],
      nuance_vi: "Bao dung, biết trước biết sau. Thường đi kèm nhân quả.",
      nuance_en: "Virtuous living, considerate. Usually paired with karma." },

    { vi: "ăn ở hiền lành",
      render: ["tôi ăn", "+ở hiền lành"],
      nuance_vi: "Như 'có đức'. 'Ăn ở hiền lành thì trời thương.'",
      nuance_en: "Kind-hearted living. 'Live kindly and heaven will be kind to you.'" },

    { vi: "ăn ở đàng hoàng",
      render: ["tôi ăn", "+ở đàng hoàng"],
      nuance_vi: "Sống đứng đắn, tử tế, không gian dối.",
      nuance_en: "Living decently, upstanding, no dishonesty." },

    // ---- Compounds ăn nói ----
    { vi: "ăn nói lễ phép",
      render: ["tôi ăn", "+nói lễ phép"],
      nuance_vi: "Nói năng đúng mực, kính trên nhường dưới.",
      nuance_en: "Speaking respectfully — proper manners with elders and juniors." },

    { vi: "ăn nói bậy bạ",
      render: ["tôi ăn", "+nói bậy bạ"],
      nuance_vi: "Nói tục, nói bừa, không kiểm soát miệng.",
      nuance_en: "Vulgar speech, talking nonsense, no filter." },

    { vi: "ăn nói từ tốn",
      render: ["tôi ăn", "+nói từ tốn"],
      nuance_vi: "Nói chậm rãi, nhẹ nhàng, có suy nghĩ.",
      nuance_en: "Speaking slowly, gently, thoughtfully." },

    // ---- Compounds ăn mặc ----
    { vi: "ăn mặc chỉnh tề",
      render: ["tôi ăn", "+mặc chỉnh tề"],
      nuance_vi: "Trang phục gọn gàng, tươm tất.",
      nuance_en: "Neatly dressed, tidy appearance." },

    { vi: "ăn mặc lôi thôi",
      render: ["tôi ăn", "+mặc lôi thôi"],
      nuance_vi: "Quần áo xốc xếch, luộm thuộm.",
      nuance_en: "Sloppy, disheveled clothing." },
  ],
};

function _parseRenderAnMo(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveAnMoBank() {
  const bare = {
    word: "",
    segments: [{ text: "tôi ăn cơm", hit: true }],
    en: "Bare 'ăn' — just the act of eating, no life-judgment attached.",
    vi: "'Ăn' trần — chỉ là hành động ăn, chưa đánh giá nhân cách.",
  };

  const items = BANK_AN_MO.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderAnMo(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return [bare, ...items];
}

window.BANK_AN_MO          = BANK_AN_MO;
window.AN_MO_BANK_DERIVED  = deriveAnMoBank();
