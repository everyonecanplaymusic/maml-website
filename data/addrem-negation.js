/* ============================================================
   data/addrem-negation.js — Ma trận Phủ định

   Unlike simple one-word particles (không, chưa …), many
   Vietnamese negations are TEMPLATES that wrap the verb at two
   different positions — e.g. "đâu có … " leads upfront while
   "có … đâu" clamps the verb between two markers. A few are
   POSITION-DEPENDENT: moving "gì" before or after "nổi" flips
   the meaning from internal incapacity to external obstruction.

   Schema note: each item carries a `render` array of segments
   laying out the full inflected sentence. A segment string
   prefixed with '+' is accent-highlighted in the card. This
   lets one item highlight BOTH halves of a split pair at once
   (see "có … đâu", "làm sao mà … được").

   Exposed:
     window.BANK_NEGATION
     window.NEGATION_BANK_DERIVED
   ============================================================ */

const BANK_NEGATION = {
  name: "Ma trận Phủ định",
  note: "Không rank — mỗi cách phủ định mang một thái độ/hoàn cảnh. Một số là TEMPLATE (khuôn) chứ không phải word đơn. Chả/chẳng ở ranh giới khách quan ↔ thái độ.",
  note_en: "No ranking — each negation carries its own attitude or situation. Some are TEMPLATES (frames), not single words. 'Chả' and 'chẳng' live on the border between objective negation and pouty attitude.",
  groups: [
    {
      name: "Phủ định trực tiếp",
      name_en: "Direct negation",
      items: [
        { vi: "không",
          render: ["tôi", "+không", "ăn cơm"],
          nuance_vi: "Trung tính nhất. Mặc định.",
          nuance_en: "The most neutral. The default 'no'." },

        { vi: "chưa",
          render: ["tôi", "+chưa", "ăn cơm"],
          nuance_vi: "Chưa xảy ra, hàm ý SẼ xảy ra.",
          nuance_en: "Hasn't happened yet — with the implication that it WILL." },

        { vi: "chả",
          render: ["tôi", "+chả", "ăn cơm"],
          nuance_vi: "Biến thể 'không', Bắc Bộ, đời thường. LUÔN mang dằn dỗi nhẹ — không hoàn toàn khách quan.",
          nuance_en: "Casual Northern variant of 'không'. ALWAYS carries a flicker of pout — never fully objective.",
          multi: ["phủ định", "thái độ dằn dỗi"] },

        { vi: "chẳng",
          render: ["tôi", "+chẳng", "ăn cơm"],
          nuance_vi: "Biến thể 'không', văn học hơn 'chả'. Cũng mang dằn dỗi nhưng cứng hơn, lạnh hơn.",
          nuance_en: "Literary sibling of 'chả'. Same pout, but harder, colder, more clipped.",
          multi: ["phủ định", "thái độ dằn dỗi"] },
      ],
    },

    {
      name: "Phủ định cãi lại (TEMPLATE — khuôn, không phải word đơn)",
      name_en: "Counter-denial (templates, not single words)",
      note: "'có' và 'đâu' là 2 chữ riêng, nằm ở 2 vị trí khác nhau. Tagger coi chúng tách rời.",
      note_en: "'có' and 'đâu' are two separate words at two different positions. Tagger treats them independently.",
      items: [
        { vi: "đâu",
          render: ["tôi ăn cơm", "+đâu"],
          nuance_vi: "Phủ định hất ngược. 'Có ăn cơm đâu!' Homophone: cũng là tiểu từ cuối câu (xem BANK tiểu từ).",
          nuance_en: "Negation by reversal. 'I didn't eat at all!' Homophone: also a sentence-final particle (see final-particles bank)." },

        { vi: "đâu có ...",
          render: ["tôi", "+đâu", "+có", "ăn cơm"],
          nuance_vi: "TEMPLATE: 'đâu' lên trước, chặn buộc tội ngay từ đầu câu.",
          nuance_en: "TEMPLATE: 'đâu' leads, blocking the accusation upfront.",
          isTemplate: true },

        { vi: "có ... đâu",
          render: ["tôi", "+có", "ăn cơm", "+đâu"],
          nuance_vi: "TEMPLATE: kẹp động từ ở giữa. Mềm hơn, giãi bày hơn.",
          nuance_en: "TEMPLATE: wraps the verb between two markers. Softer, more explanatory.",
          isTemplate: true },

        { vi: "làm gì có chuyện ...",
          render: ["+làm gì có chuyện", "tôi ăn cơm"],
          nuance_vi: "TEMPLATE: phủ định sạch trơn. 'Làm gì có chuyện đó!' — xoá cả khả năng.",
          nuance_en: "TEMPLATE: sweeping denial — erases the very possibility.",
          isTemplate: true },
      ],
    },

    {
      name: "Phủ định bất lực (POSITION-DEPENDENT)",
      name_en: "Helplessness (position-dependent)",
      note: "Vị trí 'gì' trước/sau 'nổi' CHÍNH LÀ cái tạo nghĩa. Đây là ví dụ tuyệt vời của position = meaning.",
      note_en: "The position of 'gì' before or after 'nổi' IS what generates the meaning — a beautiful example of position = meaning.",
      items: [
        { vi: "gì nổi",
          render: ["tôi ăn", "+gì", "+nổi"],
          nuance_vi: "Lực bất tòng tâm từ BÊN TRONG: đau, ốm, buồn, không nuốt nổi. 'Gì' đứng TRƯỚC 'nổi'.",
          nuance_en: "Helplessness from WITHIN: sickness, grief, can't stomach it. 'Gì' BEFORE 'nổi'.",
          positionNote: "gì TRƯỚC nổi = bên trong" },

        { vi: "nổi gì",
          render: ["tôi ăn", "+nổi", "+gì"],
          nuance_vi: "Lực cản từ BÊN NGOÀI: ồn ào, nghèo, bận rộn. 'Gì' đứng SAU 'nổi'.",
          nuance_en: "Obstruction from WITHOUT: noise, poverty, busyness. 'Gì' AFTER 'nổi'.",
          positionNote: "gì SAU nổi = bên ngoài" },

        { vi: "làm sao mà ... được",
          render: ["+làm sao mà", "tôi ăn cơm", "+được"],
          nuance_vi: "TEMPLATE: đổ lỗi hoàn cảnh. 'Làm sao mà ăn cơm được trong cái ồn này?'",
          nuance_en: "TEMPLATE: blaming the circumstances. 'How am I supposed to eat in this racket?'",
          isTemplate: true },
      ],
    },

    {
      name: "Phủ định chủ ý",
      name_en: "Deliberate abstention",
      items: [
        { vi: "nhịn",
          render: ["tôi", "+nhịn", "ăn cơm"],
          nuance_vi: "Chịu đói vì giận hoặc nghèo. Ý chí cầm cự.",
          nuance_en: "Going without — out of anger or poverty. Willed deprivation." },

        { vi: "kiêng",
          render: ["tôi", "+kiêng", "ăn cơm"],
          nuance_vi: "Phủ định chủ ý vì sức khoẻ hoặc tâm linh. Kiêng cữ, kiêng đồ mặn.",
          nuance_en: "Abstaining deliberately — for health or spiritual reasons." },

        { vi: "cữ",
          render: ["tôi", "+cữ", "ăn cơm"],
          nuance_vi: "Như 'kiêng', biến âm Nam Bộ.",
          nuance_en: "Southern variant of 'kiêng' — same deliberate abstinence." },

        { vi: "bỏ",
          render: ["tôi", "+bỏ", "ăn cơm"],
          nuance_vi: "Cắt đứt thói quen. Không phải một bữa — mà từ đây về sau.",
          nuance_en: "Quitting for good. Not just this meal — from now on." },
      ],
    },

    {
      name: "Phủ định tu từ / lóng",
      name_en: "Rhetorical / slang",
      items: [
        { vi: "ai mà",
          render: ["+ai mà", "ăn cơm"],
          nuance_vi: "Phủ định vô xưng — khái quát hoá sự vô lý. 'Ai mà ăn được!'",
          nuance_en: "Impersonal rhetorical denial — generalizing the absurdity. 'As if anyone could eat this!'" },

        { vi: "đéo",
          render: ["tôi", "+đéo", "ăn cơm"],
          nuance_vi: "Gay gắt, thô bỉ nhất. Tránh dùng nơi công cộng hoặc với người lớn.",
          nuance_en: "The harshest, most vulgar. Avoid in public or with elders." },

        { vi: "đách",
          render: ["tôi", "+đách", "ăn cơm"],
          nuance_vi: "Nhẹ hơn 'đéo' một chút, vẫn thô.",
          nuance_en: "A notch softer than 'đéo' — still rude." },

        { vi: "méo",
          render: ["tôi", "+méo", "ăn cơm"],
          nuance_vi: "Biến thể đời thường của 'đéo'. Nghe bớt tục hơn.",
          nuance_en: "Everyday slang variant of 'đéo'. Less vulgar on the ear." },

        { vi: "đếch",
          render: ["tôi", "+đếch", "ăn cơm"],
          nuance_vi: "Như 'đéo', nhẹ hơn một chút. Dân dã Bắc Bộ.",
          nuance_en: "Like 'đéo' but slightly softer. Northern folk speech." },

        { vi: "nịt",
          render: ["tôi", "+nịt", "ăn cơm"],
          nuance_vi: "Biến thể nhẹ nhất. Đôi khi chỉ đùa.",
          nuance_en: "The mildest variant — sometimes just playful." },
      ],
    },
  ],
};

/* ----- derive runtime list -----
   Flattens groups and prepends a canonical bare affirmative so
   the card at rest shows "tôi ăn cơm" plain (the state from
   which every negation departs). */

function _parseRender(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveNegationBank() {
  const bare = {
    word: "",
    segments: [{ text: "tôi ăn cơm", hit: true }],
    en: "Plain affirmative. No negation — the state each item departs from.",
    vi: "Câu khẳng định. Không phủ định — trạng thái gốc mà mỗi mục rẽ ra từ đó.",
  };

  const items = BANK_NEGATION.groups.flatMap(g => g.items).map(it => ({
    word:     it.vi,
    segments: _parseRender(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return [bare, ...items];
}

window.BANK_NEGATION         = BANK_NEGATION;
window.NEGATION_BANK_DERIVED = deriveNegationBank();
