/* ============================================================
   data/kinship.js  —  Vietnamese kinship & self-reference corpus

   This file preserves BANK_KINSHIP exactly as the user authored it.
   It is the corpus of record for self-reference + kinship terms
   across Northern / Central / Southern dialects, plus archaic /
   classifier / mock-familiar variants.

   At the bottom we expose two globals:

     window.BANK_KINSHIP          ← the raw structured corpus
     window.KINSHIP_BANK_DERIVED  ← a flat [{ word, en, vi }, ...]
                                    list used by the SWAP "tôi" card

   The derived list is generated mechanically from BANK_KINSHIP so
   the corpus stays the single source of truth.
   ============================================================ */

const BANK_KINSHIP = {
  name: "Đại từ kinship vùng miền",

  rule: {
    bac: "Truyền thống Bắc: lấy TUỔI làm gốc — lớn hơn cha/mẹ là 'Bác'. (Đang bị phá bởi đô thị hoá)",
    nam_trung: "Truyền thống Nam/Trung: lấy HUYẾT THỐNG làm gốc — phân rạch ròi bên Nội (Bác/Cô/Chú) vs bên Ngoại (Cậu/Dì). (Đang bị phá bởi đô thị hoá)",
  },

  dualMeanings: [
    { vi: "cậu", note: "Bắc (cũ) = CHA. Trung/Nam = EM TRAI MẸ. Hai nghĩa đối lập. Bắc trẻ giờ cũng hiểu = em trai mẹ." },
    { vi: "mợ",  note: "Bắc (cũ) = MẸ. Trung/Nam = VỢ CẬU." },
    { vi: "bác", note: "Bắc = anh/chị CỦA CHA HOẶC MẸ (theo tuổi). Nam CŨNG dùng cho anh trai của ba. Thuộc CẢ BA vùng, chỉ là Bắc mở rộng hơn." },
  ],

  // Từ ghép tự do: ông/bà/cụ/cố + nội/ngoại ghép tuỳ ý.
  // "nội" và "ngoại" là từ riêng: "bên nội", "nhà ngoại", "gia đình nội ăn cơm chung".
  basicPronouns: [
    { vi: "tôi",          nuance: "Vai xưng trung tính, hơi trang trọng. Rất ít dùng trong gia đình." },
    { vi: "tui",          nuance: "Biến âm Nam của 'tôi'. Mềm, xởi lởi." },
    { vi: "ta",           nuance: "Vai cao, lễ nghi hoặc tự đắc." },
    { vi: "tao",          nuance: "Thô, hoặc cực kỳ thân / giận dỗi." },
    { vi: "tau",          nuance: "Biến âm Trung của 'tao'." },
    { vi: "mày",          nuance: "Vai gọi đối phương thô / cực thân." },
    { vi: "mi",           nuance: "Biến âm Trung của 'mày', cổ phong." },
    { vi: "mình",         nuance: "Tự gọi mềm — vừa 'tôi' vừa 'mình ơi'. Cũng = 'chúng ta'." },
    { vi: "con",          nuance: "Đại từ gia đình. 'Con ăn cơm' = con tự xưng. 'Ăn cơm đi con' = cha mẹ gọi. Cùng một chữ, hai vai." },
    { vi: "em",           nuance: "Vai người nhỏ tuổi hơn — chính mình hoặc người được gọi." },
    { vi: "chồng",        nuance: "Vai chồng." },
    { vi: "vợ",           nuance: "Vai vợ." },
    { vi: "người đẹp",    nuance: "Vai gọi flirty, ngọt." },
    { vi: "xóm làng",     nuance: "Cả xóm, tập thể." },
    { vi: "cha nội",      nuance: "Nửa thân nửa đùa, mock-familiar." },
    { vi: "nó",           nuance: "Người thứ ba khi kể chuyện." },
    // Đại từ cổ
    { vi: "trẫm",         nuance: "Vua tự xưng. Cổ. Nay chỉ đùa nhây." },
    { vi: "thiếp",        nuance: "Phi tần / vợ tự xưng khiêm (cổ). Nay đùa nhây hoặc văn học." },
    { vi: "ngài",         nuance: "Xưng hô kính trọng bậc cao — quan lại, ngoại giao." },
    { vi: "hoàng thượng", nuance: "Gọi vua. Cổ. Nay đùa nhây." },
  ],

  atomicWords: [
    { vi: "ông",     nuance: "Nam giới bậc trên 2+ thế hệ. Ghép: ông nội, ông ngoại, ông cố." },
    { vi: "bà",      nuance: "Nữ giới bậc trên 2+ thế hệ. Ghép: bà nội, bà ngoại, bà cố." },
    { vi: "nội",     nuance: "Bên cha. Từ riêng: 'bên nội', 'nhà nội', 'gia đình nội'. Ghép: ông nội, bà nội, cụ nội." },
    { vi: "ngoại",   nuance: "Bên mẹ. Từ riêng: 'bên ngoại', 'nhà ngoại'. Ghép: ông ngoại, bà ngoại, cụ ngoại." },
    { vi: "cụ",      nuance: "Thế hệ trên ông bà — Bắc. Ghép: cụ nội, cụ ngoại." },
    { vi: "cố",      nuance: "Thế hệ trên ông bà — Trung/Nam. Ghép: cố nội, cố ngoại." },
    { vi: "kỵ",      nuance: "Thế hệ trên cụ/cố — Bắc." },
    { vi: "sơ",      nuance: "Thế hệ trên cụ/cố — Trung/Nam." },
    { vi: "cha",     nuance: "Cha (chung). Ghép: cha nội (mock-familiar)." },
    { vi: "mẹ",      nuance: "Mẹ (chung). Đầu câu = chủ ngữ; cuối = gọi (mẹ ơi)." },
    // Vai + thứ tự (Nam: đếm theo thứ sinh)
    { vi: "bố",      nuance: "Bắc = Cha." },
    { vi: "ba",      nuance: "Nam/Trung = Cha." },
    { vi: "má",      nuance: "Nam = Mẹ." },
    { vi: "mạ",      nuance: "Trung = Mẹ." },
    { vi: "bác",     nuance: "Anh/chị của cha hoặc mẹ (Bắc mở rộng theo tuổi)." },
    { vi: "chú",     nuance: "Em trai của ba (Nội)." },
    { vi: "thím",    nuance: "Vợ chú." },
    { vi: "cô",      nuance: "Em gái của ba (Nội). Bắc CŨNG chị gái." },
    { vi: "dượng",   nuance: "Chồng cô hoặc dì." },
    { vi: "cậu",     nuance: "Em trai mẹ (Ngoại). Bắc cũ = Cha." },
    { vi: "mợ",      nuance: "Vợ cậu. Bắc cũ = Mẹ." },
    { vi: "dì",      nuance: "Chị/em gái mẹ (Ngoại)." },
    { vi: "anh",     nuance: "Anh trai. Cũng xưng hô lịch sự với nam lớn tuổi hơn." },
    { vi: "chị",     nuance: "Chị gái. Cũng xưng hô lịch sự với nữ lớn tuổi hơn." },
    { vi: "út",      nuance: "Người nhỏ nhất trong gia đình." },
    // Classifier (đặt trước tên)
    { vi: "thằng",   nuance:    "Classifier thân mật/thô cho con trai. 'Thằng Tèo ăn cơm chưa?'",
                     nuance_en: "Familiar/rough classifier for boys." },
    { vi: "đại ca",  nuance_vi: "Anh lớn. Xã hội đen hoặc kính trọng. 'Mời đại ca ăn tối.'",
                     nuance_en: "Big brother. Gang boss or respectful address. 'Please, boss, join us for dinner.'" },
    { vi: "cu",      nuance:    "Classifier thân mật cho bé trai nhỏ. 'Cu Tèo ăn cơm chưa?'",
                     nuance_en: "Affectionate classifier for little boys." },
  ],

  generations: [
    {
      gen: "Cha Mẹ",
      relations: [
        { vi: "Cha", bac: "Bố / Cậu / Thầy (cũ)", trung: "Ba / Bố",  nam: "Ba / Tía" },
        { vi: "Mẹ", bac: "Mẹ / Mợ / U / Bầm (cũ)", trung: "Mẹ / Mạ", nam: "Má" },
      ],
    },
    {
      gen: "Anh/Chị/Em của Cha — bên Nội",
      relations: [
        { vi: "Anh trai của Ba",         bac: "Bác",      trung: "Bác / Bá", nam: "Bác / Ba lớn" },
        { vi: "Chị gái của Ba",          bac: "Bác",      trung: "O",        nam: "Cô" },
        { vi: "Chồng chị gái của Ba",    bac: "Bác trai", trung: "Dượng",    nam: "Dượng" },
        { vi: "Em trai của Ba",          bac: "Chú",      trung: "Chú",      nam: "Chú" },
        { vi: "Vợ chú",                  bac: "Thím",     trung: "Thím",     nam: "Thím" },
        { vi: "Em gái của Ba",           bac: "Cô",       trung: "O",        nam: "Cô" },
        { vi: "Chồng em gái của Ba",     bac: "Chú",      trung: "Dượng",    nam: "Dượng" },
      ],
    },
    {
      gen: "Anh/Chị/Em của Mẹ — bên Ngoại",
      relations: [
        { vi: "Anh trai của Mẹ",         bac: "Bác",      trung: "Cậu",   nam: "Cậu" },
        { vi: "Vợ anh trai của Mẹ",      bac: "Bác gái",  trung: "Mợ",    nam: "Mợ" },
        { vi: "Chị gái của Mẹ",          bac: "Bác",      trung: "Dì",    nam: "Dì" },
        { vi: "Chồng chị gái của Mẹ",    bac: "Bác trai", trung: "Dượng", nam: "Dượng" },
        { vi: "Em trai của Mẹ",          bac: "Cậu",      trung: "Cậu",   nam: "Cậu" },
        { vi: "Vợ cậu",                  bac: "Mợ",       trung: "Mợ",    nam: "Mợ" },
        { vi: "Em gái của Mẹ",           bac: "Dì",       trung: "Dì",    nam: "Dì" },
        { vi: "Chồng dì",                bac: "Chú",      trung: "Dượng", nam: "Dượng" },
      ],
    },
    {
      gen: "Hôn nhân — toàn quốc",
      relations: [
        { vi: "Chồng chị gái", all: "Anh rể" },
        { vi: "Chồng em gái",  all: "Em rể" },
        { vi: "Vợ anh trai",   all: "Chị dâu" },
        { vi: "Vợ em trai",    all: "Em dâu" },
      ],
    },
  ],

  southernNumbering: {
    note: "Truyền thống miền Nam: BẤT KỲ đại từ + BẤT KỲ số thứ tự. Bỏ số 1, đầu lòng = Hai. Út = nhỏ nhất. Áp dụng cho TẤT CẢ đại từ kinship (Má, Dượng, Cậu, Chú, Cô, Dì, Bác...).",
    atomicNumbers: ["Cả", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Út"],
    regionNote: "Bắc dùng 'Cả' = đầu lòng (Bác Cả, Anh Cả). Nam bỏ Cả, dùng 'Hai' = đầu lòng (Bác Hai, Anh Hai).",
    note_Cả: "'Cả' viết hoa khi là rank (Thím Cả). 'cả' thường = 'toàn bộ' (cả thúng cơm). Multi-function.",

    // Liệt kê đầy đủ: [đại từ] × [số/Cả/Út]
    // Tương lai vẽ family tree cho app.
    combos: {
      "Anh":    ["Anh Cả", "Anh Hai", "Anh Ba", "Anh Tư", "Anh Năm", "Anh Sáu", "Anh Bảy", "Anh Tám", "Anh Chín", "Anh Mười", "Anh Út"],
      "Chị":    ["Chị Cả", "Chị Hai", "Chị Ba", "Chị Tư", "Chị Năm", "Chị Sáu", "Chị Bảy", "Chị Tám", "Chị Chín", "Chị Mười", "Chị Út"],
      "Bác":    ["Bác Cả", "Bác Hai", "Bác Ba", "Bác Tư", "Bác Năm", "Bác Sáu", "Bác Bảy", "Bác Tám", "Bác Chín", "Bác Mười", "Bác Út"],
      "Chú":    ["Chú Cả", "Chú Hai", "Chú Ba", "Chú Tư", "Chú Năm", "Chú Sáu", "Chú Bảy", "Chú Tám", "Chú Chín", "Chú Mười", "Chú Út"],
      "Cô":     ["Cô Cả",  "Cô Hai",  "Cô Ba",  "Cô Tư",  "Cô Năm",  "Cô Sáu",  "Cô Bảy",  "Cô Tám",  "Cô Chín",  "Cô Mười",  "Cô Út"],
      "Dì":     ["Dì Cả",  "Dì Hai",  "Dì Ba",  "Dì Tư",  "Dì Năm",  "Dì Sáu",  "Dì Bảy",  "Dì Tám",  "Dì Chín",  "Dì Mười",  "Dì Út"],
      "Cậu":    ["Cậu Cả", "Cậu Hai", "Cậu Ba", "Cậu Tư", "Cậu Năm", "Cậu Sáu", "Cậu Bảy", "Cậu Tám", "Cậu Chín", "Cậu Mười", "Cậu Út"],
      "Thím":   ["Thím Cả","Thím Hai","Thím Ba","Thím Tư","Thím Năm","Thím Sáu","Thím Bảy","Thím Tám","Thím Chín","Thím Mười","Thím Út"],
      "Mợ":     ["Mợ Cả",  "Mợ Hai",  "Mợ Ba",  "Mợ Tư",  "Mợ Năm",  "Mợ Sáu",  "Mợ Bảy",  "Mợ Tám",  "Mợ Chín",  "Mợ Mười",  "Mợ Út"],
      "Dượng":  ["Dượng Cả","Dượng Hai","Dượng Ba","Dượng Tư","Dượng Năm","Dượng Sáu","Dượng Bảy","Dượng Tám","Dượng Chín","Dượng Mười","Dượng Út"],
      "Má":     ["Má Cả",  "Má Hai",  "Má Ba",  "Má Tư",  "Má Năm",  "Má Sáu",  "Má Bảy",  "Má Tám",  "Má Chín",  "Má Mười",  "Má Út"],
      "Ba":     ["Ba Cả",  "Ba Hai",  "Ba Ba",  "Ba Tư",  "Ba Năm",  "Ba Sáu",  "Ba Bảy",  "Ba Tám",  "Ba Chín",  "Ba Mười",  "Ba Út"],
      "O":      ["O Cả",   "O Hai",   "O Ba",   "O Tư",   "O Năm",   "O Sáu",   "O Bảy",   "O Tám",   "O Chín",   "O Mười",   "O Út"],
      "Standalone": ["Út", "Út cưng", "Út nam", "Út nữ"],
    },
  },
};

/* ============================================================
   English nuance map for runtime swap-bank items.
   Hand-written so the SWAP "tôi" card reads English-primary.
   ============================================================ */
const KINSHIP_EN = {
  // basicPronouns
  "tôi":          "neutral, slightly formal self — rarely used at home",
  "tui":          "Southern variant of tôi — soft, easy",
  "ta":           "elevated self — ceremonial or self-important",
  "tao":          "rough self, or extremely intimate / annoyed",
  "tau":          "Central variant of tao",
  "mày":          "rough or extremely intimate 'you'",
  "mi":           "Central archaic variant of mày",
  "mình":         "soft self — both 'I' and 'we'; also between intimate partners",
  "con":          "family pronoun — child speaking up, OR parent calling down",
  "em":           "the younger party — for self or for the addressed",
  "chồng":        "self as husband",
  "vợ":           "self as wife",
  "người đẹp":    "flirty 'beautiful one' address",
  "xóm làng":     "the whole village, a collective self",
  "cha nội":      "mock-familiar 'old man' — half intimate, half teasing",
  "nó":           "third-person 'they/it' when telling a story",
  "trẫm":         "royal 'I'. Archaic, now only in jest",
  "thiếp":        "concubine/wife humble self (archaic). Now jest or literary",
  "ngài":         "respectful address — officials, diplomats",
  "hoàng thượng": "'Your Majesty'. Archaic, now only in jest",

  // atomicWords
  "ông":     "elder male, two or more generations up",
  "bà":      "elder female, two or more generations up",
  "nội":     "father's side — standalone or compounded",
  "ngoại":   "mother's side — standalone or compounded",
  "cụ":      "great-grandparent generation — Northern",
  "cố":      "great-grandparent generation — Central / Southern",
  "kỵ":      "great-great-grandparent — Northern",
  "sơ":      "great-great-grandparent — Central / Southern",
  "cha":     "father (general)",
  "mẹ":      "mother (general). Sentence-initial = subject; final = vocative",
  "bố":      "Northern: father",
  "ba":      "Central / Southern: father",
  "má":      "Southern: mother",
  "mạ":      "Central: mother",
  "bác":     "older sibling of either parent (Northern uses age-based)",
  "chú":     "younger brother of father (paternal)",
  "thím":    "wife of chú",
  "cô":      "younger sister of father (paternal). Northern also for older sister",
  "dượng":   "husband of cô or dì",
  "cậu":     "younger brother of mother (maternal). Old Northern usage = father",
  "mợ":      "wife of cậu. Old Northern usage = mother",
  "dì":      "sister of mother (maternal)",
  "anh":     "older brother. Also polite for older men",
  "chị":     "older sister. Also polite for older women",
  "út":      "youngest child of the family",
  "thằng":   "familiar/rough classifier for boys",
  "đại ca":  "big brother — gang boss or respectful 'boss'",
  "cu":      "affectionate classifier for little boys",
};

/* ============================================================
   Derive the flat runtime bank for the SWAP "tôi" card.

   We pull from:
     - basicPronouns (16 entries)
     - atomicWords   (~28 entries)
     - southernNumbering.combos (143+ formulaic entries)

   Each entry → { word, en, vi }.
   ============================================================ */

function entryFromBasic(e) {
  return {
    word: e.vi,
    en:   KINSHIP_EN[e.vi] || e.nuance_en || "",
    vi:   e.nuance || e.nuance_vi || "",
  };
}

function comboToBankItem(combo, base) {
  const parts = combo.split(" ");
  const rank = parts.slice(1).join(" ");
  if (base === "Standalone") {
    const standaloneEn = {
      "Út":      "the youngest of the family",
      "Út cưng": "the darling youngest",
      "Út nam":  "the youngest male child",
      "Út nữ":   "the youngest female child",
    };
    return {
      word: combo,
      en:   standaloneEn[combo] || "youngest child",
      vi:   "Nam — con út trong nhà",
    };
  }
  return {
    word: combo,
    en:   `Southern birth-rank — ${base.toLowerCase()} ranked "${rank}"`,
    vi:   `Nam: ${base} thứ "${rank}" (đếm theo thứ sinh)`,
  };
}

function deriveKinshipBank() {
  const items = [];
  for (const e of BANK_KINSHIP.basicPronouns) items.push(entryFromBasic(e));
  for (const e of BANK_KINSHIP.atomicWords)   items.push(entryFromBasic(e));
  for (const [base, combos] of Object.entries(BANK_KINSHIP.southernNumbering.combos)) {
    for (const combo of combos) items.push(comboToBankItem(combo, base));
  }
  // Deduplicate by word — atomicWords may overlap with basicPronouns
  const seen = new Set();
  return items.filter(it => {
    if (seen.has(it.word)) return false;
    seen.add(it.word);
    return true;
  });
}

// ----- expose -----
window.BANK_KINSHIP = BANK_KINSHIP;
window.KINSHIP_BANK_DERIVED = deriveKinshipBank();
