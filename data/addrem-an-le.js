/* ============================================================
   data/addrem-an-le.js — 'Ăn' của lễ tết / dự sự kiện

   Khi người Việt nói 'ăn Tết', 'ăn cưới', 'ăn giỗ', 'ăn đầy
   tháng' — 'ăn' không còn là nhai-trong-miệng mà là THAM DỰ
   một dịp văn hoá. Cả sự kiện (chơi, thăm, nghỉ, cúng, chúc)
   được gói vào động từ 'ăn'. Tiếng Anh phải dùng ba bốn verb
   khác nhau: celebrate, attend, observe. Tiếng Việt chỉ một.

   Card này tách ra từ card "nghĩa bóng" (BANK_AN_BONG) — ở đó
   là 'ăn' mở rộng sang chịu đòn / hấp thụ / chiếm đoạt / lợi
   lộc. Ở đây là 'ăn' chuyên cho dịp lễ-tiệc-kỷ niệm.

   Exposed:
     window.BANK_AN_LE
     window.AN_LE_BANK_DERIVED
   ============================================================ */

const BANK_AN_LE = {
  name:    "Ăn + sự kiện = dự lễ, dự tiệc",
  note:    "'Ăn' gói cả một dịp văn hoá — chơi, thăm hỏi, nghỉ ngơi, cúng kiếng — chứ không chỉ là nhét đồ ăn vào bụng. Ăn Tết, ăn cưới, ăn giỗ, ăn đầy tháng: mỗi chữ là một khúc đời người.",
  note_en: "'Ăn' packages an entire cultural event — visiting, resting, worshipping — not just stuffing food into the belly. Ăn Tết, ăn cưới, ăn giỗ, ăn đầy tháng: each phrase is a milestone of a Vietnamese life.",
  items: [
    // ---- Sự kiện & văn hoá ----
    { vi: "ăn tết",
      render: ["tôi ăn", "+tết"],
      en: "to celebrate Lunar New Year",
      nuance_vi: "Bao gồm chơi, thăm hỏi, nghỉ ngơi — không chỉ nhét bánh chưng vào bụng.",
      nuance_en: "Encompasses visiting, resting, celebrating — not just stuffing sticky rice cake." },

    { vi: "ăn cưới",
      render: ["tôi ăn", "+cưới"],
      en: "to attend a wedding",
      nuance_vi: "Hôn lễ Việt Nam luôn gắn với mời cỗ.",
      nuance_en: "Vietnamese weddings always come with a feast invitation." },

    { vi: "ăn hỏi",
      render: ["tôi ăn", "+hỏi"],
      en: "to attend an engagement ceremony",
      nuance_vi: "Lễ đính hôn.",
      nuance_en: "The formal engagement ceremony." },

    { vi: "ăn giỗ",
      render: ["tôi ăn", "+giỗ"],
      en: "to attend a death-anniversary feast",
      nuance_vi: "Ăn cỗ là cách chia lộc từ tổ tiên.",
      nuance_en: "Eating the feast is sharing blessings from the ancestors." },

    { vi: "ăn mừng",
      render: ["tôi ăn", "+mừng"],
      en: "to celebrate",
      nuance_vi: "Tổ chức tiệc chia vui.",
      nuance_en: "Throwing a celebration feast." },

    { vi: "ăn tiệc",
      render: ["tôi ăn", "+tiệc"],
      en: "to attend a banquet",
      nuance_vi: "Dự tiệc.",
      nuance_en: "Attending a banquet." },

    { vi: "ăn tân gia",
      render: ["tôi ăn", "+tân gia"],
      en: "to attend a housewarming",
      nuance_vi: "Chúc mừng nhà mới.",
      nuance_en: "Celebrating a new home." },

    { vi: "ăn đầy tháng",
      render: ["tôi ăn", "+đầy tháng"],
      en: "to attend a baby's one-month feast",
      nuance_vi: "Mừng bé 1 tháng tuổi.",
      nuance_en: "Celebrating a baby's first month." },

    { vi: "ăn thôi nôi",
      render: ["tôi ăn", "+thôi nôi"],
      en: "to attend a baby's first birthday",
      nuance_vi: "Mừng bé một tuổi.",
      nuance_en: "Celebrating a baby's first birthday." },

    { vi: "ăn rằm",
      render: ["tôi ăn", "+rằm"],
      en: "to observe the full-moon feast",
      nuance_vi: "Cúng/ăn rằm.",
      nuance_en: "Observing the full-moon ritual feast." },

    // ---- Ăn quà / ăn vặt — linh tinh ngoài bữa chính ----
    { vi: "ăn quà",
      render: ["tôi ăn", "+quà"],
      en: "to snack on treats",
      nuance_vi: "Ăn quà vặt.",
      nuance_en: "Snacking." },

    { vi: "ăn vặt",
      render: ["tôi ăn", "+vặt"],
      en: "to snack",
      nuance_vi: "Ăn linh tinh giữa bữa.",
      nuance_en: "Snacking between meals." },

    // ---- Chữ lẻ cho match ----
    { vi: "thôi nôi",
      render: ["tôi ăn", "+thôi nôi"],
      en: "first birthday feast",
      nuance_vi: "Dạng lẻ. Thôi nôi = bé tròn một tuổi, bỏ nôi.",
      nuance_en: "Standalone form. Thôi nôi = a baby's first birthday, literally 'leaving the cradle'." },
  ],
};

function _parseRenderAnLe(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveAnLeBank() {
  const bare = {
    word: "",
    segments: [{ text: "tôi ăn cơm", hit: true }],
    en: "Just eating — no event attached. The default bowl before any ceremony.",
    vi: "Ăn trần — chưa có dịp lễ nào. Bữa cơm mặc định trước mọi nghi thức.",
  };

  const items = BANK_AN_LE.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderAnLe(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return [bare, ...items];
}

window.BANK_AN_LE          = BANK_AN_LE;
window.AN_LE_BANK_DERIVED  = deriveAnLeBank();
