/* ============================================================
   data/addrem-com-state.js — Cơm nào (trạng thái / loại cơm)

   The qualifier that trails "cơm" and tells you what bowl
   you're actually looking at. Vietnamese compound rice nouns
   fold THREE distinct dimensions into one slot:

     1. Cooking state     — sống, nhão, khô, khê, cháy, nguội
     2. Rice variety      — trắng, nếp, tấm, lứt
     3. Context / class   — bụi, hộp, chay, chùa, thiên hạ

   Each qualifier carries a metaphor. A failed pot of rice is a
   failed week. Cơm nguội (leftover rice) is the cruel slang for
   the overfamiliar wife; cơm chùa (temple rice) is freeloading;
   cơm bụi (roadside rice) is the worker's lunch. Swap the
   qualifier, swap the world.

   Exposed:
     window.BANK_COM_TRANG_THAI
     window.COM_STATE_BANK_DERIVED
   ============================================================ */

const BANK_COM_TRANG_THAI = {
  name:    "Cơm trạng thái — chất lượng nồi cơm + ẩn dụ",
  note:    "Nấu cơm hỏng = vụng về hoặc đổ vỡ trong cuộc sống. Mỗi trạng thái mang ẩn dụ.",
  note_en: "Failed rice = clumsiness or life failure. Each physical state carries a metaphor.",
  items: [
    // ---- Lỗi nấu / Cooking failures ----
    { vi: "sống",
      render: ["tôi ăn cơm", "+sống"],
      nuance_vi: "Cơm sống. Thiếu nhiệt, hạt còn cứng. Ẩn dụ: làm nửa vời.",
      nuance_en: "Undercooked, grains still hard. Metaphor: half-done work." },

    { vi: "nhão",
      render: ["tôi ăn cơm", "+nhão"],
      nuance_vi: "Cơm nhão. Thừa nước. Lỗi tỉ lệ.",
      nuance_en: "Mushy. Too much water. A ratio error." },

    { vi: "khô",
      render: ["tôi ăn cơm", "+khô"],
      nuance_vi: "Cơm khô. Thiếu nước. Lỗi tỉ lệ ngược.",
      nuance_en: "Dry. Too little water. The opposite ratio error." },

    { vi: "khê",
      render: ["tôi ăn cơm", "+khê"],
      nuance_vi: "Cơm khê. Quá lửa, mùi khét. Không cứu được.",
      nuance_en: "Burnt, scorched. Beyond saving." },

    { vi: "cháy",
      render: ["tôi ăn cơm", "+cháy"],
      nuance_vi: "Cơm cháy. Lớp giòn dưới đáy nồi. Xưa đồ bỏ, nay đặc sản.",
      nuance_en: "Crispy bottom layer. Once discarded, now a delicacy." },

    { vi: "ba tầng",
      render: ["tôi ăn cơm", "+ba tầng"],
      nuance_vi: "Cơm ba tầng. Dưới khét, giữa chín, trên nhão. Đỉnh cao thảm hoạ.",
      nuance_en: "Three-layer disaster: bottom burnt, middle cooked, top mushy." },

    { vi: "nguội",
      render: ["tôi ăn cơm", "+nguội"],
      nuance_vi: "Cơm nguội. Hết nóng, để qua bữa. Ẩn dụ tàn nhẫn: vợ (trái với phở = nhân tình).",
      nuance_en: "Cold leftover rice. Cruel metaphor: the boring wife (opposite of hot phở = the mistress)." },

    // ---- Loại gạo / Rice varieties ----
    { vi: "không",
      render: ["tôi ăn cơm", "+không"],
      nuance_vi: "Cơm không = cơm trắng không có gì ăn kèm. Đồng âm: cũng là chữ phủ định và chữ hỏi.",
      nuance_en: "Plain rice with nothing on the side. Homophone: also the negation and question particle." },

    { vi: "trắng",
      render: ["tôi ăn cơm", "+trắng"],
      nuance_vi: "Cơm trắng. Gạo tẻ xát kỹ. Biểu tượng no đủ chuẩn mực.",
      nuance_en: "White rice. The standard symbol of adequate nourishment." },

    { vi: "nếp",
      render: ["tôi ăn cơm", "+nếp"],
      nuance_vi: "Cơm nếp. Dẻo, dính, no lâu. Gắn với cỗ bàn, lễ hội.",
      nuance_en: "Sticky rice. Heavy, filling. Tied to feasts and festivals." },

    { vi: "tấm",
      render: ["tôi ăn cơm", "+tấm"],
      nuance_vi: "Cơm tấm. Gạo vỡ. Đặc sản đường phố miền Nam.",
      nuance_en: "Broken rice. Icon of Southern Vietnamese street food." },

    { vi: "lứt",
      render: ["tôi ăn cơm", "+lứt"],
      nuance_vi: "Cơm lứt. Gạo còn cám. Dưỡng sinh, ăn kiêng hiện đại.",
      nuance_en: "Brown rice. Modern health food, dieting." },

    // ---- Phương pháp nấu / Cooking method ----
    { vi: "lam",
      render: ["tôi ăn cơm", "+lam"],
      nuance_vi: "Cơm lam. Nấu trong ống tre. Núi rừng Tây Bắc / Tây Nguyên.",
      nuance_en: "Bamboo-tube rice. Highlands scene, Northwest and Central." },

    // ---- Dịch vụ / đời thường / Class & service ----
    { vi: "bụi",
      render: ["tôi ăn cơm", "+bụi"],
      nuance_vi: "Cơm bụi. Lề đường, giá rẻ. Tầng lớp lao động, sinh viên.",
      nuance_en: "Roadside rice, cheap. Working class and students." },

    { vi: "hộp",
      render: ["tôi ăn cơm", "+hộp"],
      nuance_vi: "Cơm hộp. Công nghiệp, ăn vội trong văn phòng.",
      nuance_en: "Box lunch. Industrial, eaten hurriedly at the office." },

    // ---- Chay / tâm linh / Spiritual ----
    { vi: "chay",
      render: ["tôi ăn cơm", "+chay"],
      nuance_vi: "Cơm chay. Không thịt cá. Chùa chiền, tâm linh, hoặc lối sống hiện đại.",
      nuance_en: "Vegetarian. Temple, spiritual practice, or modern lifestyle." },

    { vi: "chùa",
      render: ["tôi ăn cơm", "+chùa"],
      nuance_vi: "Cơm chùa = miễn phí / ăn không. Lóng: kẻ ăn không làm.",
      nuance_en: "Temple rice = free / freeloading. Slang for someone who takes without giving." },

    // ---- Lịch sử / Historical idiom ----
    { vi: "thiên hạ",
      render: ["tôi ăn cơm", "+thiên hạ"],
      nuance_vi: "Cơm thiên hạ = sống nhờ người ngoài, phải nương tựa.",
      nuance_en: "The world's rice = depending on strangers for your meal." },

    { vi: "hẩm cháo khê",
      render: ["tôi ăn", "+cơm hẩm cháo khê"],
      nuance_vi: "Cơm hẩm cháo khê = thành ngữ chỉ cảnh bần hàn, ăn những thứ đã hỏng.",
      nuance_en: "Moldy rice, burnt porridge — idiom for destitution, eating the spoiled leftovers." },
  ],
};

function _parseRenderComState(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveComStateBank() {

  const items = BANK_COM_TRANG_THAI.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderComState(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return items;
}

window.BANK_COM_TRANG_THAI   = BANK_COM_TRANG_THAI;
window.COM_STATE_BANK_DERIVED = deriveComStateBank();
