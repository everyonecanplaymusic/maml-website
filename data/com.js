/* ============================================================
   data/com.js  —  Foods that swap into the "cơm" slot

   BANK_DOI_TAC ("food partner") preserves the user's corpus
   verbatim. Each food item carries its own social class, daily
   tempo, health context, or emotional weight — swapping the word
   "cơm" doesn't just change the meal, it changes the world.

   Exposed:
     window.BANK_DOI_TAC      ← raw corpus
     window.COM_BANK_DERIVED  ← flat [{word, en, vi}, ...] for the
                                SWAP "cơm" card runtime
   ============================================================ */

const BANK_DOI_TAC = {
  name:    "Đối tác thức ăn — swap vào vị trí 'cơm'",
  note:    "Mỗi món mang giai cấp, nhịp sống, sức khoẻ, tình cảm. Swap 'cơm' = đổi cả thế giới.",
  note_en: "Each food carries class, tempo, health, emotion. Swapping 'cơm' changes the entire world.",
  items: [
    { vi: "cơm",         nuance_vi: "trục toạ độ. Không chỉ gạo nấu chín — đơn vị đo sinh tồn, gia đình, giai cấp, thái độ.",
                         nuance_en: "the origin point. Not just cooked rice — the Vietnamese unit of survival, family, class, and attitude." },

    { vi: "phở",         nuance_vi: "tinh hoa, quốc hồn. Nghĩa bóng: nhân tình ('chán cơm thèm phở').",
                         nuance_en: "national soul food. Figuratively: the mistress ('tired of rice, craving phở')." },

    { vi: "bún",         nuance_vi: "đậm đà, dân dã. Bữa sáng/trưa đổi vị.",
                         nuance_en: "rich, folksy. Breakfast or lunch for a change." },

    { vi: "hủ tiếu",     nuance_vi: "đêm khuya miền Nam. Xe đẩy lóc cóc, hẻm nhỏ.",
                         nuance_en: "southern late night. The clacking pushcart, narrow alleys." },

    { vi: "bánh canh",   nuance_vi: "sợi to dai. Xế chiều hoặc tối nhẹ.",
                         nuance_en: "thick chewy noodles. Afternoon or light dinner." },

    { vi: "mì tôm",      nuance_vi: "biểu tượng hết tiền. Sinh viên cuối tháng, game thủ cày đêm.",
                         nuance_en: "symbol of being broke. End-of-month students, late-night gamers." },

    { vi: "miến",        nuance_vi: "nhẹ bụng, thanh tao. Người già, tiệc cưới.",
                         nuance_en: "light, delicate. For the elderly or wedding banquets." },

    { vi: "cháo",        nuance_vi: "ba nghĩa: (1) ốm/già/bé, (2) chăm sóc ('bát cháo hành Thị Nở'), (3) nghèo mạt ('cháo không có mà húp').",
                         nuance_en: "three meanings: (1) sick/elderly/baby, (2) tender care ('Thị Nở's congee'), (3) rock-bottom poverty.",
                         multi:     ["y tế", "tình cảm", "nghèo"] },

    { vi: "xôi",         nuance_vi: "ăn chắc mặc bền. No lâu. Chuẩn bị cho ca nặng.",
                         nuance_en: "'eat solid, wear durable.' Lasts long. Prep for hard labor." },

    { vi: "bánh mì",     nuance_vi: "fastfood kiểu Việt. Gặm trên đường, vội vã nhất.",
                         nuance_en: "Vietnamese fast food. Eaten while running." },

    { vi: "bánh bao",    nuance_vi: "nóng hổi, ăn xế, dễ mang theo.",
                         nuance_en: "hot steamed bun, easy to carry." },

    { vi: "bo bo",       nuance_vi: "lịch sử: thời Bao cấp đói khổ.",
                         nuance_en: "historical: subsidy-era starvation. Sorghum = poverty." },

    { vi: "khoai sắn",   nuance_vi: "nông thôn mất mùa, bần cùng.",
                         nuance_en: "rural crop failure, destitution." },

    { vi: "bít tết",     nuance_vi: "giàu sang, xa xỉ. Dịp trọng đại.",
                         nuance_en: "wealth, luxury. Special occasions." },

    { vi: "tôm hùm",     nuance_vi: "đỉnh cao xa xỉ.",
                         nuance_en: "peak luxury." },

    { vi: "ốc",          nuance_vi: "'kẻ ăn ốc người đổ vỏ' — kẻ hưởng trốn, người khác gánh.",
                         nuance_en: "'one eats the snail, another dumps the shell' — the enjoyer escapes, someone else pays." },
  ],
};

function deriveComBank() {
  return BANK_DOI_TAC.items.map(it => ({
    word: it.vi,
    en:   it.nuance_en || "",
    vi:   it.nuance_vi || "",
  }));
}

window.BANK_DOI_TAC      = BANK_DOI_TAC;
window.COM_BANK_DERIVED  = deriveComBank();
