/* ============================================================
   data/addrem-modal.js — Will, duty, dare (modal / ý chí)

   Modal verbs placed before "ăn". The Vietnamese modal
   landscape doesn't map cleanly to English must/should/want —
   notably, 'được' means "to be granted, to be allowed to"
   with a flavor of privilege (grace), while 'phải' is closer
   to "to be forced to" with a flavor of burden. That axis is
   distinctly Vietnamese.

   Exposed:
     window.BANK_MODAL
     window.MODAL_BANK_DERIVED
   ============================================================ */

const BANK_MODAL = {
  name:    "Modal / ý chí — chèn trước động từ",
  note:    "Chuỗi động từ chồng. 'Được' (ân sủng) vs 'phải' (gánh) là trục rất riêng của tiếng Việt.",
  note_en: "Stacked verbs. The 'được' (grace) vs 'phải' (burden) axis is distinctly Vietnamese.",
  items: [
    { vi: "",
      sentence: ["", "tôi ăn cơm", ""],
      nuance_vi: "Câu trần. Không ý chí, không gánh nặng — chỉ hành động.",
      nuance_en: "Bare. No will, no burden — just the act itself." },

    { vi: "phải",
      sentence: ["tôi", "phải", "ăn cơm"],
      nuance_vi: "Bắt buộc, có gánh. 'Tôi phải ăn cơm' — ngầm: không muốn cũng phải.",
      nuance_en: "Obligation with a burden. 'I have to eat rice' — implying: even if I don't want to." },

    { vi: "nên",
      sentence: ["tôi", "nên", "ăn cơm"],
      nuance_vi: "Khuyên nhẹ, tự nhủ. 'Tôi nên ăn cơm' — việc khôn ngoan.",
      nuance_en: "Gentle advice, self-reminder. 'I should eat rice' — the wise thing." },

    { vi: "muốn",
      sentence: ["tôi", "muốn", "ăn cơm"],
      nuance_vi: "Ý muốn, khao khát. 'Tôi muốn ăn cơm' — chờ được đáp ứng.",
      nuance_en: "Desire, wanting. 'I want rice' — hoping to be granted it." },

    { vi: "định",
      sentence: ["tôi", "định", "ăn cơm"],
      nuance_vi: "Dự định, tính trước. 'Tôi định ăn cơm rồi đi'.",
      nuance_en: "Intending, planning. 'I plan to eat, then go.'" },

    { vi: "cần",
      sentence: ["tôi", "cần", "ăn cơm"],
      nuance_vi: "Cần thiết, thiếu không được. Thực dụng hơn 'muốn'.",
      nuance_en: "Need, can't do without. More practical than 'muốn'." },

    { vi: "được",
      sentence: ["tôi", "được", "ăn cơm"],
      nuance_vi: "Ân sủng. 'Tôi được ăn cơm' — được phép, được cho, mang ơn.",
      nuance_en: "Grace / privilege. 'I get to eat rice' — permitted, granted, grateful." },

    { vi: "dám",
      sentence: ["tôi", "dám", "ăn cơm"],
      nuance_vi: "Dám liều, dám động tới. 'Tôi dám ăn cơm' — có gan làm chuyện đó.",
      nuance_en: "Dare. 'I dare to eat rice' — bold enough to do it." },

    { vi: "thường",
      sentence: ["tôi", "thường", "ăn cơm"],
      nuance_vi: "Thói quen, lặp lại. 'Tôi thường ăn cơm buổi tối'.",
      nuance_en: "Habitually. 'I usually eat rice for dinner.'" },

    { vi: "hay",
      sentence: ["tôi", "hay", "ăn cơm"],
      nuance_vi: "Hay + động từ = thường làm. Gần 'thường' nhưng đời thường, nói miệng hơn.",
      nuance_en: "Often do. Closer to spoken register than 'thường'." },
  ],
};

function _sentenceToSegmentsModal([L, M, R]) {
  const segs = [];
  if (L) segs.push({ text: L, hit: false });
  if (M) segs.push({ text: M, hit: true });
  if (R) segs.push({ text: R, hit: false });
  return segs;
}

function deriveModalBank() {
  return BANK_MODAL.items.map(it => ({
    word:     it.vi,
    segments: _sentenceToSegmentsModal(it.sentence),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));
}

window.BANK_MODAL         = BANK_MODAL;
window.MODAL_BANK_DERIVED = deriveModalBank();
