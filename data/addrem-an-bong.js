/* ============================================================
   data/addrem-an-bong.js — Nghĩa bóng của 'ăn' (không phải ăn bằng miệng)

   'Ăn' trong tiếng Việt mở rộng trường nghĩa theo cách không một
   động từ tiếng Anh nào làm nổi: chịu đòn, hấp thụ ánh sáng, ăn
   cắp, ăn lương, ăn vạ, ăn ảnh. Card này gom các nghĩa BÓNG — tức
   là 'ăn' không còn là động tác miệng nhai. Những compound kiểu
   'ăn giỗ', 'ăn cưới', 'ăn Tết' (dự lễ/sự kiện) sẽ nằm ở card
   khác — chưa gom vào đây.

   Exposed:
     window.BANK_AN_BONG
     window.AN_BONG_BANK_DERIVED
   ============================================================ */

const BANK_AN_BONG = {
  name:    "Ăn + danh từ = nghĩa bóng",
  note:    "Danh sách phẳng. 'Ăn' mở rộng trường nghĩa: từ dự tiệc, chịu đòn, thu lợi, đến tương thích vật lý. Tiếng Anh không có verb nào bao sân thế này. Nhớ cái này là ăn mà không phải ăn bằng miệng như bình thường. Những từ kiểu ăn giỗ sẽ có card khác.",
  note_en: "Flat list. 'Eat' extends its semantic field to cover: attending events, suffering blows, earning profits, physical compatibility. No English verb covers this range.",
  items: [
    // ---- Chịu đựng — biến trừng phạt thành thức ăn phải nuốt ----
    { vi: "ăn đòn",
      render: ["tôi ăn", "+đòn"],
      en: "to get beaten",
      nuance_vi: "Chịu trừng phạt vật lý. 'Ăn' làm nỗi đau mang tính thể xác rõ rệt hơn — như bị nhét cái đòn vào cơ thể.",
      nuance_en: "To receive a beating. 'Eat' makes the pain viscerally physical — as if the blow is stuffed into the body." },

    { vi: "ăn tát",
      render: ["tôi ăn", "+tát"],
      en: "to get slapped",
      nuance_vi: "Bị tát.",
      nuance_en: "To receive a slap." },

    { vi: "ăn đấm",
      render: ["tôi ăn", "+đấm"],
      en: "to get punched",
      nuance_vi: "Bị đấm.",
      nuance_en: "To receive a punch." },

    { vi: "ăn mắng",
      render: ["tôi ăn", "+mắng"],
      en: "to get scolded",
      nuance_vi: "Lời nhục mạ được vật chất hoá thành thức ăn độc hại phải nuốt vào tai.",
      nuance_en: "Words of abuse materialized into toxic food that must be swallowed through the ears." },

    { vi: "ăn chửi",
      render: ["tôi ăn", "+chửi"],
      en: "to get cursed at",
      nuance_vi: "Như ăn mắng, nặng hơn.",
      nuance_en: "Like ăn mắng but harsher." },

    { vi: "ăn phạt",
      render: ["tôi ăn", "+phạt"],
      en: "to get penalized",
      nuance_vi: "Chịu hậu quả pháp lý/quy định.",
      nuance_en: "To suffer a legal or regulatory penalty." },

    { vi: "ăn thẻ",
      render: ["tôi ăn", "+thẻ"],
      en: "to get carded (sports)",
      nuance_vi: "Bị phạt thẻ trong thể thao.",
      nuance_en: "To receive a penalty card in sports." },

    { vi: "ăn đạn",
      render: ["tôi ăn", "+đạn"],
      en: "to get shot",
      nuance_vi: "Bị trúng đạn.",
      nuance_en: "To be hit by a bullet." },

    // ---- Vật lý & tương thích — 'ăn' = hấp thụ, bắt vào ----
    { vi: "ăn ảnh",
      render: ["tôi ăn", "+ảnh"],
      en: "photogenic",
      nuance_vi: "Khuôn mặt 'hấp thụ' ống kính tốt, chụp lên đẹp hơn ngoài đời.",
      nuance_en: "The face 'absorbs' the camera lens well — looks better in photos than in person." },

    { vi: "ăn nắng",
      render: ["tôi ăn", "+nắng"],
      en: "to absorb sunlight (skin)",
      nuance_vi: "Da bắt nắng, dễ đen.",
      nuance_en: "Skin that catches sunlight easily, tans/darkens quickly." },

    { vi: "ăn khớp",
      render: ["tôi ăn", "+khớp"],
      en: "to mesh, to fit together",
      nuance_vi: "Hai thứ phối hợp trơn tru, vừa vặn.",
      nuance_en: "Two things fitting together smoothly — gears meshing, plans aligning." },

    { vi: "ăn nhịp",
      render: ["tôi ăn", "+nhịp"],
      en: "to be in sync",
      nuance_vi: "Hợp nhịp.",
      nuance_en: "In rhythm, in sync." },

    { vi: "ăn mực",
      render: ["tôi ăn", "+mực"],
      en: "to absorb ink well",
      nuance_vi: "Giấy/vải thấm mực tốt.",
      nuance_en: "Paper or fabric that absorbs ink well." },

    // ---- Lối sống & bản chất ----
    { vi: "ăn chơi",
      render: ["tôi ăn", "+chơi"],
      en: "to live the high life",
      nuance_vi: "Lối sống phóng túng, tiêu xài vào thú vui.",
      nuance_en: "A profligate lifestyle — spending time and money on pleasures." },

    { vi: "ăn nhậu",
      render: ["tôi ăn", "+nhậu"],
      en: "to drink and feast (as lifestyle)",
      nuance_vi: "Sống nhậu.",
      nuance_en: "Living the drinking-and-feasting life." },

    { vi: "ăn bám",
      render: ["tôi ăn", "+bám"],
      en: "to leech off others",
      nuance_vi: "Ký sinh trùng xã hội — dùng tài nguyên người khác mà không tạo giá trị.",
      nuance_en: "A social parasite — consuming others' resources without producing value." },

    { vi: "ăn hại",
      render: ["tôi ăn", "+hại"],
      en: "to be a useless freeloader",
      nuance_vi: "Như ăn bám, thêm làm hỏng việc.",
      nuance_en: "Like ăn bám but also breaks things. A net negative." },

    { vi: "ăn vạ",
      render: ["tôi ăn", "+vạ"],
      en: "to throw a tantrum to extort sympathy",
      nuance_vi: "Đặc sản tâm lý Việt: lấy thiệt thòi bản thân làm vũ khí ép người khác nhượng bộ. Như Chí Phèo rạch mặt ăn vạ.",
      nuance_en: "A distinctly Vietnamese psychological tactic: weaponizing one's own suffering to force others to yield. Like Chí Phèo slashing his own face to extort." },

    { vi: "ăn mày",
      render: ["tôi ăn", "+mày"],
      en: "to beg (for a living)",
      nuance_vi: "Phương thức mưu sinh bằng lòng thương hại. Động từ đã hoá đá thành danh từ chỉ tầng lớp: 'lão ăn mày'.",
      nuance_en: "Making a living through pity. The verb has fossilized into a noun for a social class: 'the beggar'." },

    { vi: "ăn xin",
      render: ["tôi ăn", "+xin"],
      en: "to beg",
      nuance_vi: "Như ăn mày.",
      nuance_en: "Synonym of ăn mày." },

    { vi: "ăn mặc",
      render: ["tôi ăn", "+mặc"],
      en: "style, way of dressing",
      nuance_vi: "Bao trùm toàn bộ gu thời trang. Ăn để ấm bụng, mặc để ấm thân → nhu cầu thiết yếu định hình con người.",
      nuance_en: "Encompasses one's entire fashion sense. 'Eating' warms the belly, 'wearing' warms the body → the two basic needs that define a person." },

    // ---- Chiếm đoạt & đạo đức ----
    { vi: "ăn gian",
      render: ["tôi ăn", "+gian"],
      en: "to cheat (small scale)",
      nuance_vi: "Lừa lọc quy mô nhỏ — trò chơi, cân đo.",
      nuance_en: "Small-scale cheating — in games, measurements." },

    { vi: "gian",
      render: ["tôi ăn", "+gian"],
      nuance_vi: "Chữ lẻ. Ăn gian = gian lận nhỏ.",
      nuance_en: "Standalone. Ăn gian = petty cheating." },

    { vi: "ăn cắp",
      render: ["tôi ăn", "+cắp"],
      en: "to steal (petty)",
      nuance_vi: "Trộm vặt.",
      nuance_en: "Petty theft." },

    { vi: "ăn trộm",
      render: ["tôi ăn", "+trộm"],
      en: "to steal (stealth)",
      nuance_vi: "Trộm lén.",
      nuance_en: "Theft by stealth." },

    { vi: "ăn cướp",
      render: ["tôi ăn", "+cướp"],
      en: "to rob",
      nuance_vi: "Cướp giật công khai.",
      nuance_en: "Open robbery." },

    { vi: "ăn chặn",
      render: ["tôi ăn", "+chặn"],
      en: "to skim, to embezzle",
      nuance_vi: "Lấy bớt từ cái tổng đáng lẽ thuộc người khác.",
      nuance_en: "Skimming off the top — taking a portion that belongs to others." },

    { vi: "ăn bớt",
      render: ["tôi ăn", "+bớt"],
      en: "to embezzle (portion)",
      nuance_vi: "Như ăn chặn.",
      nuance_en: "Same as ăn chặn." },

    { vi: "ăn quỵt",
      render: ["tôi ăn", "+quỵt"],
      en: "to dine and dash, to welch",
      nuance_vi: "Dùng dịch vụ/vay mượn nhưng không trả. Nuốt trọn phần nợ.",
      nuance_en: "Using a service or borrowing but never paying. Swallowing the debt whole." },

    { vi: "ăn hối lộ",
      render: ["tôi ăn", "+hối lộ"],
      en: "to accept a bribe",
      nuance_vi: "Nhận tiền để bẻ cong pháp luật.",
      nuance_en: "Accepting money to bend the law." },

    { vi: "ăn vụng",
      render: ["tôi ăn", "+vụng"],
      en: "to sneak food / to have an affair",
      nuance_vi: "DUAL: Nghĩa đen = lén cắp đồ ăn. Nghĩa bóng phổ biến = ngoại tình lén sau lưng vợ/chồng.",
      nuance_en: "DUAL: Literal = sneaking food. Figurative (very common) = having a secret affair behind one's spouse's back.",
      multi: ["nghĩa đen: lén ăn", "nghĩa bóng: ngoại tình"] },

    // ---- Kinh tế & lợi ích ----
    { vi: "ăn lương",
      render: ["tôi ăn", "+lương"],
      en: "to draw a salary",
      nuance_vi: "Sống phụ thuộc thù lao cố định hàng tháng.",
      nuance_en: "Living on a fixed monthly wage." },

    { vi: "ăn hoa hồng",
      render: ["tôi ăn", "+hoa hồng"],
      en: "to earn a commission",
      nuance_vi: "Hưởng phần trăm từ môi giới, bán hàng.",
      nuance_en: "Earning a percentage from brokering or sales." },

    { vi: "ăn chiết khấu",
      render: ["tôi ăn", "+chiết khấu"],
      en: "to earn a discount/rebate",
      nuance_vi: "Hưởng chiết khấu.",
      nuance_en: "Earning a discount or rebate." },

    { vi: "ăn chia",
      render: ["tôi ăn", "+chia"],
      en: "to split profits",
      nuance_vi: "Phân chia lợi ích giữa nhiều bên.",
      nuance_en: "Splitting gains among parties." },

    { vi: "ăn lời",
      render: ["tôi ăn", "+lời"],
      en: "to take a profit",
      nuance_vi: "Có giá trị thặng dư sau khi trừ vốn.",
      nuance_en: "Netting a profit after costs." },

    { vi: "ăn lãi",
      render: ["tôi ăn", "+lãi"],
      en: "to earn interest",
      nuance_vi: "Như ăn lời, thường về tài chính.",
      nuance_en: "Like ăn lời, usually financial." },

    { vi: "ăn khách",
      render: ["tôi ăn", "+khách"],
      en: "to be a commercial hit",
      nuance_vi: "Thu hút đông khách, mang lại lợi nhuận. 'Phim này ăn khách ghê.'",
      nuance_en: "Attracting many customers, generating profit. 'This movie is a huge hit.'" },

    // ---- Thiếu từ orphan ----
    { vi: "ăn dầm",
      render: ["tôi ăn", "+dầm"],
      en: "to overstay eating at someone's place",
      nuance_vi: "Ở dầm, sống bám ăn nhờ.",
      nuance_en: "Overstaying, mooching meals." },

    { vi: "ăn lấy thảo",
      render: ["tôi ăn", "+lấy thảo"],
      en: "to eat just to honor the gesture",
      nuance_vi: "Ăn để honor cử chỉ, không vì đói.",
      nuance_en: "Eating not from hunger but to honor someone's offering." },

    { vi: "ăn tạp",
      render: ["tôi ăn", "+tạp"],
      en: "to eat anything",
      nuance_vi: "Ăn không kén, bất kỳ gì.",
      nuance_en: "Eating indiscriminately." },

    { vi: "ăn báo",
      render: ["tôi ăn", "+báo"],
      en: "to freeload",
      nuance_vi: "Sống bám, ăn không.",
      nuance_en: "Freeloading." },

    { vi: "ăn báo cô",
      render: ["tôi ăn", "+báo cô"],
      en: "to freeload mercilessly",
      nuance_vi: "Freeload không biết xấu hổ.",
      nuance_en: "Freeloading shamelessly." },

    { vi: "ăn bòn",
      render: ["tôi ăn", "+bòn"],
      en: "to nibble away at resources",
      nuance_vi: "Vắt kiệt dần dần.",
      nuance_en: "Nibbling away at someone's resources slowly." },

    { vi: "ăn chịu",
      render: ["tôi ăn", "+chịu"],
      en: "to buy on credit",
      nuance_vi: "Ăn trước trả sau.",
      nuance_en: "Eating now, paying later." },

    { vi: "ăn chắc",
      render: ["tôi ăn", "+chắc"],
      en: "to play it safe",
      nuance_vi: "Không liều, chọn phương án an toàn. 'Con ăn chắc.' = con chọn cái chắc chắn.",
      nuance_en: "Playing it safe, choosing the secure option." },
  ],
};

function _parseRenderAnBong(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveAnBongBank() {
  const bare = {
    word: "",
    segments: [{ text: "tôi ăn cơm", hit: true }],
    en: "Literal 'ăn' — eating with the mouth, the baseline before metaphor.",
    vi: "'Ăn' nghĩa đen — nhai bằng miệng, gốc trước khi hoá nghĩa bóng.",
  };

  const items = BANK_AN_BONG.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderAnBong(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return [bare, ...items];
}

window.BANK_AN_BONG          = BANK_AN_BONG;
window.AN_BONG_BANK_DERIVED  = deriveAnBongBank();
