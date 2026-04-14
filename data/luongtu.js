/* ============================================================
   data/luongtu.js  —  Classifiers that stand before 'cơm'

   BANK_COM ("lượng từ đứng trước cơm") preserves the user's
   corpus verbatim. Each classifier is a lens: physical unit
   (grain, bite, chopstick-load), container (bowl, pot, tin),
   collective (tray, ration), diminutive (a bit, a tiny bit),
   or body-as-measure (belly, freeload).

   There is no ranking — every classifier can carry a literal
   AND a metaphorical sense depending on context (see metaphors).

   Exposed:
     window.BANK_COM              ← raw corpus
     window.LUONGTU_BANK_DERIVED  ← flat [{word, en, vi}, ...]
                                    for the SWAP "lượng từ" card
   ============================================================ */

const BANK_COM = {
  name: "Lượng từ đứng trước 'cơm'",
  note: "Không rank — mỗi lượng từ có thể mang nghĩa đen VÀ ẩn dụ tuỳ context.",
  items: [
    // Đơn vị vật lý — nhỏ → lớn
    { vi: "hạt",     nuance_vi: "đơn vị nhỏ nhất. Trân trọng, cực nhọc. Bắc + văn viết.",
                     nuance_en: "the smallest unit. Precious, laborious. Northern + literary." },
    { vi: "hột",     nuance_vi: "như 'hạt' — biến âm Nam.",
                     nuance_en: "southern variant of 'hạt'." },
    { vi: "miếng",   nuance_vi: "một lần nhai. Ẩn dụ sinh tồn: 'miếng cơm manh áo'.",
                     nuance_en: "one bite. Metaphor: 'a morsel of rice and a scrap of cloth' = bare survival." },
    { vi: "đũa",     nuance_vi: "đơn vị tính bằng đũa. Ăn quá ít hoặc vội.",
                     nuance_en: "measured by chopstick-load. Too little or too rushed." },
    { vi: "thìa",    nuance_vi: "đơn vị thìa (Bắc).",
                     nuance_en: "spoonful (Northern)." },
    { vi: "muỗng",   nuance_vi: "đơn vị muỗng (Nam).",
                     nuance_en: "spoonful (Southern)." },
    { vi: "vắt",     nuance_vi: "nén bằng tay. Lam lũ, đi đồng, đi lính.",
                     nuance_en: "hand-pressed rice ball. Hard labor, field work, military." },
    { vi: "nắm",     nuance_vi: "như vắt. Nén bằng tay.",
                     nuance_en: "like vắt. Hand-pressed." },

    // Vật chứa — nhỏ → lớn
    { vi: "chén",    nuance_vi: "Tiêu chuẩn cá nhân (Nam). Ẩn dụ: 'đập bể chén cơm' = cướp việc. Đồng âm với động từ 'chén' (= ăn, lóng).",
                     nuance_en: "Personal standard (Southern). Metaphor: 'break the rice bowl' = steal someone's job. Homophone with the slang verb 'chén' = to eat." },
    { vi: "bát",     nuance_vi: "Tiêu chuẩn cá nhân (Bắc). Ẩn dụ nghề nghiệp.",
                     nuance_en: "Personal standard (Northern). Career metaphor." },
    { vi: "tô",      nuance_vi: "Bát to.",
                     nuance_en: "Large bowl." },
    { vi: "đĩa",     nuance_vi: "Đơn vị đĩa.",
                     nuance_en: "A plate of." },
    { vi: "nồi",     nuance_vi: "Cường điệu. Sức ăn kinh khủng hoặc nhà đông.",
                     nuance_en: "Exaggeration. Enormous appetite or big family." },
    { vi: "niêu",    nuance_vi: "Truyền thống, sang trọng, giữ nhiệt.",
                     nuance_en: "Traditional clay pot. Elegant, heat-retaining." },
    { vi: "thố",     nuance_vi: "Truyền thống, sang trọng.",
                     nuance_en: "Traditional pot. Elegant." },
    { vi: "hộp",     nuance_vi: "Hiện đại, vội, take-away. Đồng âm với 'cơm hộp' — tên gọi một kiểu cơm.",
                     nuance_en: "Modern, rushed, takeaway. Homophone with 'cơm hộp' as a named rice genre." },
    { vi: "gói",     nuance_vi: "Hiện đại, vội, take-away.",
                     nuance_en: "Modern, rushed, takeaway." },
    { vi: "thúng",   nuance_vi: "Cường điệu. Lượng phi thường.",
                     nuance_en: "Exaggeration. Extraordinary quantity." },
    { vi: "rổ",      nuance_vi: "Cường điệu.",
                     nuance_en: "Exaggeration." },
    { vi: "cặp lồng",nuance_vi: "Lịch sử bao cấp. Công nhân, bệnh viện.",
                     nuance_en: "Subsidy-era lunch tin. Workers, hospitals." },
    { vi: "cà mên",  nuance_vi: "Như cặp lồng — biến âm Nam.",
                     nuance_en: "Southern variant of cặp lồng." },

    // Khái quát & dịch vụ
    { vi: "mâm",     nuance_vi: "Sum vầy, nhiều món. Gia đình.",
                     nuance_en: "Shared family tray. Togetherness." },
    { vi: "bữa",     nuance_vi: "Sự kiện / cột mốc thời gian. Cũng dùng 'bữa đó' = lần đó.",
                     nuance_en: "An event, a time marker. Also 'bữa đó' = that time." },
    { vi: "phần",    nuance_vi: "Dịch vụ, mua bán.",
                     nuance_en: "A portion. Service, commercial." },
    { vi: "suất",    nuance_vi: "Khẩu phần định sẵn.",
                     nuance_en: "A ration. Pre-portioned." },

    // Lượng ước lệ — diminutive
    { vi: "chút",    nuance_vi: "Diminutive. Ép ăn, nài nỉ.",
                     nuance_en: "A little. Coaxing to eat." },
    { vi: "tí",      nuance_vi: "Như chút, nhẹ hơn. Đồng âm với 'thằng Tí' — tên gọi thân mật trẻ con.",
                     nuance_en: "A tiny bit. Homophone with 'thằng Tí' — a child's pet name." },
    { vi: "tẹo",     nuance_vi: "Như chút, Bắc.",
                     nuance_en: "Northern variant of chút." },
    { vi: "ít",      nuance_vi: "Lượng ít — hai nghĩa (rất ít / một chút).",
                     nuance_en: "A small amount — two senses." },
    { vi: "nhiều",   nuance_vi: "Lượng nhiều.",
                     nuance_en: "A lot." },

    // Đặc biệt
    { vi: "bụng",    nuance_vi: "Lấy cơ thể làm đơn vị. No nê vật vã.",
                     nuance_en: "Using the belly as unit. Stuffed, bloated." },
  ],
  metaphors: [
    { surface: "miếng cơm",      metaphor: "Sinh tồn cốt lõi",
      example: "Tụi nó tranh nhau miếng cơm.", idiom: "Miếng cơm manh áo" },
    { surface: "bát/chén cơm",   metaphor: "Công việc, nghề nghiệp",
      example: "Mày đập bể chén cơm của tao rồi!" },
    { surface: "mâm/bữa cơm",    metaphor: "Hạnh phúc gia đình",
      example: "Nhà đó thiếu vắng mâm cơm." },
  ],
};

function deriveLuongTuBank() {
  return BANK_COM.items.map(it => ({
    word: it.vi,
    en:   it.nuance_en || "",
    vi:   it.nuance_vi || "",
  }));
}

window.BANK_COM             = BANK_COM;
window.LUONGTU_BANK_DERIVED = deriveLuongTuBank();
