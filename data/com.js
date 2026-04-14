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
    { vi: "cơm",         nuance_vi: "Trục toạ độ. Không chỉ gạo nấu chín — đơn vị đo sinh tồn, gia đình, giai cấp, thái độ.",
                         nuance_en: "The origin point. Not just cooked rice — the Vietnamese unit of survival, family, class, and attitude." },

    { vi: "phở",         nuance_vi: "Tinh hoa, quốc hồn. Nghĩa bóng: nhân tình ('chán cơm thèm phở').",
                         nuance_en: "National soul food. Figuratively: the mistress ('tired of rice, craving phở')." },

    { vi: "bún",         nuance_vi: "Đậm đà, dân dã. Bữa sáng/trưa đổi vị.",
                         nuance_en: "Rich, folksy. Breakfast or lunch for a change." },

    { vi: "hủ tiếu",     nuance_vi: "Đêm khuya miền Nam. Xe đẩy lóc cóc, hẻm nhỏ.",
                         nuance_en: "Southern late night. The clacking pushcart, narrow alleys." },

    { vi: "bánh canh",   nuance_vi: "Sợi to dai. Xế chiều hoặc tối nhẹ.",
                         nuance_en: "Thick chewy noodles. Afternoon or light dinner." },

    { vi: "mì tôm",      nuance_vi: "Biểu tượng hết tiền. Sinh viên cuối tháng, game thủ cày đêm.",
                         nuance_en: "Symbol of being broke. End-of-month students, late-night gamers." },

    { vi: "miến",        nuance_vi: "Nhẹ bụng, thanh tao. Người già, tiệc cưới.",
                         nuance_en: "Light, delicate. For the elderly or wedding banquets." },

    { vi: "cháo",        nuance_vi: "Ba nghĩa: (1) ốm/già/bé, (2) chăm sóc ('bát cháo hành Thị Nở'), (3) nghèo mạt ('cháo không có mà húp').",
                         nuance_en: "Three meanings: (1) sick/elderly/baby, (2) tender care ('Thị Nở's congee'), (3) rock-bottom poverty.",
                         multi:     ["y tế", "tình cảm", "nghèo"] },

    { vi: "xôi",         nuance_vi: "Ăn chắc mặc bền. No lâu. Chuẩn bị cho ca nặng.",
                         nuance_en: "'Eat solid, wear durable.' Lasts long. Prep for hard labor." },

    { vi: "bánh mì",     nuance_vi: "Fastfood kiểu Việt. Gặm trên đường, vội vã nhất.",
                         nuance_en: "Vietnamese fast food. Eaten while running." },

    { vi: "bánh bao",    nuance_vi: "Nóng hổi, ăn xế, dễ mang theo.",
                         nuance_en: "Hot steamed bun, easy to carry." },

    { vi: "bo bo",       nuance_vi: "Lịch sử: thời Bao cấp đói khổ.",
                         nuance_en: "Historical: subsidy-era starvation. Sorghum = poverty." },

    { vi: "khoai sắn",   nuance_vi: "Nông thôn mất mùa, bần cùng.",
                         nuance_en: "Rural crop failure, destitution." },

    { vi: "bít tết",     nuance_vi: "Giàu sang, xa xỉ. Dịp trọng đại.",
                         nuance_en: "Wealth, luxury. Special occasions." },

    { vi: "tôm hùm",     nuance_vi: "Đỉnh cao xa xỉ.",
                         nuance_en: "Peak luxury." },

    { vi: "ốc",          nuance_vi: "'Kẻ ăn ốc người đổ vỏ' — kẻ hưởng trốn, người khác gánh.",
                         nuance_en: "'One eats the snail, another dumps the shell' — the enjoyer escapes, someone else pays." },
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
