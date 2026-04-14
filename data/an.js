/* ============================================================
   data/an.js  —  Verbs that swap into the "ăn" slot

   BANK_AN preserves the user-authored corpus verbatim. Verbs span
   the spectrum from polite ("dùng") to royal ("ngự thiện") to
   working-class ("xực") to disdainful ("tọng") to baby-talk
   ("măm măm") to chopstick-specific ("và") to metaphorical
   ("nhai/nuốt cục tức").

   At the bottom we expose:

     window.BANK_AN       ← the raw corpus
     window.AN_BANK_DERIVED ← flat [{word, en, vi}, ...] for the
                              SWAP "ăn" card runtime
   ============================================================ */

const BANK_AN = {
  name:    "Verb vào slot 'ăn' — ăn / nấu / kiếm / dọn / chan / cướp",
  note:    "Tất cả verb swap vào vị trí 'ăn'. Từ ăn (miệng) đến nấu (bếp) đến kiếm (mưu sinh) đến cướp (quyền lực). Cùng 1 slot, khác scene.",
  note_en: "All verbs that swap into the 'ăn' position. From eating (mouth) to cooking (kitchen) to earning (livelihood) to seizing (power). Same slot, different scene.",
  items: [
    // ----- Verb gốc -----
    { vi: "ăn",            nuance:    "Verb gốc. Mở rộng sang mọi trường nghĩa: ăn cưới, ăn đòn, ăn hối lộ. Không ngôn ngữ nào có verb 'eat' bao sân như tiếng Việt.",
                           nuance_en: "The root verb. Expands into every semantic field: weddings, beatings, bribes. No language stretches 'eat' this far." },

    // ----- Thanh lịch / kính trọng -----
    { vi: "dùng",          nuance: "Trang trọng, thanh lịch. Thường đi với 'bữa' hơn 'cơm'. CŨNG nghĩa chung 'use'." },
    { vi: "xơi",           nuance: "Kính trọng mộc mạc (Bắc). CŨNG mỉa mai: 'Xơi cho rồi đi!' Context quyết định.", multi: ["kính trọng", "mỉa mai"] },
    { vi: "thưởng thức",   nuance: "Hưởng thụ cao cấp, đánh giá cao món ăn." },
    { vi: "ngự thiện",     nuance: "Từ cổ, vua chúa. Nay chỉ đùa nhây." },

    // ----- Lóng / bụi -----
    { vi: "chén",          nuance: "Vui vẻ, nhậu nhẹt ('chén thôi!'). CŨNG LÀ classifier (chén cơm = 1 bát). Hai chức năng hoàn toàn khác.", multi: ["verb lóng", "classifier"] },
    { vi: "xực",           nuance: "Bình dân, bụi đời, dứt khoát." },
    { vi: "xử",            nuance: "Biến thể 'xực'." },
    { vi: "quất",          nuance: "Vốn là verb đánh nhau — coi đồ ăn như đối thủ." },
    { vi: "múc",           nuance: "Đồng họ 'quất', hơi Nam." },
    { vi: "dứt",           nuance: "Đồng họ 'quất', ít phổ biến." },

    // ----- Miệt thị -----
    { vi: "đớp",           nuance: "Hành động chó/cá. Tham lam, chụp giật." },
    { vi: "hốc",           nuance: "Nhồi nhét lượng lớn vào miệng." },
    { vi: "tọng",          nuance: "Nhồi vào lỗ miệng. Khinh bỉ tột độ." },
    { vi: "dọng",          nuance: "Đồng nghĩa 'tọng'." },
    { vi: "ngốn",          nuance: "Ăn quá nhiều, cồng kềnh. CŨNG trung tính cho tiêu thụ lớn: 'ngốn tiền', 'ngốn xăng'.", multi: ["miệt thị", "trung tính tiêu thụ"] },
    { vi: "cạp",           nuance: "Răng cửa gặm đồ cứng — của động vật." },

    // ----- Baby talk -----
    { vi: "măm măm",       nuance: "Trẻ em, mô phỏng chóp chép." },
    { vi: "măm",           nuance: "Rút gọn 'măm măm'." },

    // ----- Đặc tả văn hoá -----
    { vi: "và",            nuance: "Đặc tả văn hoá dùng đũa: kề bát vào môi, đẩy thức ăn liên tục." },
    { vi: "lùa",           nuance: "Đồng nghĩa 'và'." },
    { vi: "ngấu nghiến",   nuance: "Thèm khát tột độ. CŨNG dùng cho đọc sách, nghe nhạc — trạng thái tâm lý chung.", multi: ["ăn", "đọc", "nghe", "bất kỳ"] },
    { vi: "nhâm nhi",      nuance: "Chậm rãi, thưởng thức từng chút. Thường rượu/trà. Ghép cơm → lạ hoá." },
    { vi: "nhấm nháp",     nuance: "Đồng nghĩa 'nhâm nhi'." },
    { vi: "nếm",           nuance: "Lượng cực nhỏ lên lưỡi thử vị. 'Nếm cơm xem chín chưa' tự nhiên." },
    { vi: "nhai",          nuance: "Tập trung vào hàm. ẨN DỤ: 'nhai không vô' = không chấp nhận lý do.", multi: ["sinh học", "ẩn dụ tâm lý"] },
    { vi: "nuốt",          nuance: "Tập trung vào cổ họng. ẨN DỤ: 'nuốt cục tức', 'nuốt không nổi' = cam chịu.", multi: ["sinh học", "ẩn dụ tâm lý"] },
    { vi: "nhơi",          nuance:    "Nhai lại, chậm rãi, uể oải. Như trâu nhơi cỏ. Ăn không hứng thú.",
                           nuance_en: "To chew cud — listlessly, like a buffalo. Eating without appetite." },
  ],
};

/* ----- Hand-written English nuance map ----- */
const AN_EN = {
  "ăn":          "the root verb. Expands everywhere: weddings, beatings, bribes",
  "dùng":        "polite, refined: 'to have' — usually with 'bữa' (a meal). Also general 'use'",
  "xơi":         "earthy Northern honorific. Also sarcastic — context decides",
  "thưởng thức": "to savor, to appreciate fully — high-end consumption",
  "ngự thiện":   "archaic royal verb. Now only in jest",
  "chén":        "lively drinking-buddy verb — 'let's chén!'. Also a bowl-classifier",
  "xực":         "rough, working-class, decisive",
  "xử":          "variant of xực",
  "quất":        "originally 'to whip' — treats food as an opponent",
  "múc":         "cousin of quất, slightly Southern",
  "dứt":         "cousin of quất, less common",
  "đớp":         "snapping like a fish or dog. Greedy, grabbing",
  "hốc":         "shoveling large quantities into the mouth",
  "tọng":        "stuffing into the mouth-hole. Maximum contempt",
  "dọng":        "synonym of tọng",
  "ngốn":        "eating too much. Also neutral for high consumption: ngốn tiền, ngốn xăng",
  "cạp":         "front-teeth gnawing at something hard — animal-like",
  "măm măm":     "child-talk imitating chewing sounds",
  "măm":         "shortened form of măm măm",
  "và":          "chopstick-specific: bowl pressed to lips, food pushed in continuously",
  "lùa":         "synonym of và",
  "ngấu nghiến": "ravenous craving. Also used for reading, listening — any consuming state",
  "nhâm nhi":    "slow, savoring sip by sip. Usually wine or tea — playful with rice",
  "nhấm nháp":   "synonym of nhâm nhi",
  "nếm":         "tiniest taste on the tongue. 'Nếm cơm xem chín chưa' — taste-test the rice",
  "nhai":        "focused on the jaw. Metaphor: 'nhai không vô' = won't accept the reasoning",
  "nuốt":        "focused on the throat. Metaphor: 'nuốt cục tức' — swallow anger",
  "nhơi":        "to chew cud — listlessly, like a buffalo. Eating without appetite",
};

function deriveAnBank() {
  return BANK_AN.items.map(it => ({
    word: it.vi,
    en:   AN_EN[it.vi] || it.nuance_en || "",
    vi:   it.nuance || "",
  }));
}

window.BANK_AN = BANK_AN;
window.AN_BANK_DERIVED = deriveAnBank();
