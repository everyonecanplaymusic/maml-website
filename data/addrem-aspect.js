/* ============================================================
   data/addrem-aspect.js — Thời gian (hạt nêm thời gian & trạng thái)

   Vietnamese never conjugates verbs. Instead, speakers sprinkle
   a small set of particles around the base verb to mark when
   an action sits in time and what state it's in — past, now,
   soon, already, finished, ongoing, never-yet. Many can be
   stacked (đã+định, sắp+xong, vẫn+chưa), producing nuanced
   compound readings that English verb-tense can't match.

   Exposed:
     window.BANK_THOI_GIAN
     window.THOI_GIAN_BANK_DERIVED
   ============================================================ */

const BANK_THOI_GIAN = {
  name:    "Hạt nêm thời gian & trạng thái hành động",
  note:    "Tiếng Việt không chia động từ. Rải các chữ này quanh verb gốc để đánh dấu thời điểm + trạng thái. Có thể xếp chồng (đã+định, sắp+xong, vẫn+chưa).",
  note_en: "Vietnamese never conjugates verbs. These particles are scattered around the base verb to mark time + aspect. Stackable (đã+định, sắp+xong, vẫn+chưa).",
  items: [
    { vi: "sẽ",
      en: "will",
      render: ["tôi", "+sẽ", "ăn cơm"],
      nuance_vi: "Tương lai chung, mang tính cam kết hoặc thông báo. Chưa biết chính xác bao giờ. Có tính lý trí.",
      nuance_en: "General future. A commitment or announcement. Timing unspecified. Rational, planned." },

    { vi: "sắp",
      en: "about to, almost",
      render: ["tôi", "+sắp", "ăn cơm"],
      nuance_vi: "Tương lai rất gần — chỉ vài phút nữa. Mâm cơm đã dọn hoặc bụng đã sôi. Cấp bách.",
      nuance_en: "Very near future — minutes away. The table is set or the stomach is growling. Urgency." },

    { vi: "sắp sửa",
      en: "just about to",
      render: ["tôi", "+sắp sửa", "ăn cơm"],
      nuance_vi: "Nhấn mạnh quá trình chuyển giao trạng thái. Hay dùng để từ chối khéo: 'Sắp sửa ăn cơm rồi, không đi chơi đâu.'",
      nuance_en: "Emphasizes the transition process. Often used to politely decline: 'About to eat, can't go out.'" },

    { vi: "chuẩn bị",
      en: "preparing to, getting ready to",
      render: ["tôi", "+chuẩn bị", "ăn cơm"],
      nuance_vi: "Focus vào hành động vật lý tiền trạm: rửa tay, xới cơm, lau bàn. Thân thể đang chuẩn bị.",
      nuance_en: "Focus on the physical preparation: washing hands, scooping rice, wiping the table. The body is staging for the act." },

    { vi: "định",
      en: "intend to, plan to",
      render: ["tôi", "+định", "ăn cơm"],
      nuance_vi: "Chỉ mới là ý nghĩ trong đầu. Rất dễ bị thay đổi nếu có ngoại cảnh: 'Định ăn cơm mà tự nhiên cúp điện.'",
      nuance_en: "Only a thought in the mind. Easily derailed by circumstances: 'Was going to eat but the power went out.' Pure mental state, not yet physical." },

    { vi: "tính",
      en: "thinking of, considering",
      render: ["tôi", "+tính", "ăn cơm"],
      nuance_vi: "Như 'định', nhưng nhẹ hơn, bâng quơ hơn. Ý định chưa chắc chắn.",
      nuance_en: "Like 'định' but even lighter, more casual. The intention is barely formed." },

    { vi: "lát nữa",
      en: "a little later",
      render: ["+lát nữa", "tôi ăn cơm"],
      nuance_vi: "Hoãn sang sau, nhưng không xa. Vài chục phút.",
      nuance_en: "Postponed, but not far. A few dozen minutes." },

    { vi: "đang",
      en: "currently, right now (progressive)",
      render: ["tôi", "+đang", "ăn cơm"],
      nuance_vi: "Sự thật khách quan: hành động đang dang dở ngay tại thời điểm nói. Miệng đang nhai.",
      nuance_en: "Objective fact: the action is in progress at the moment of speaking. The mouth is chewing right now." },

    { vi: "vẫn",
      en: "still",
      render: ["tôi", "+vẫn", "ăn cơm"],
      nuance_vi: "Kéo dài vượt khỏi kỳ vọng. 'Vẫn đang ăn' = sao ăn lâu thế mà chưa xong?",
      nuance_en: "Duration exceeding expectation. 'Still eating' = why is it taking so long? Implies the listener expected it to be over." },

    { vi: "cứ",
      en: "just keep (doing), go ahead and",
      render: ["tôi", "+cứ", "ăn cơm"],
      nuance_vi: "Liên tục bất chấp ngoại cảnh. 'Mặc kệ mưa bão, tôi cứ ăn cơm.'",
      nuance_en: "Continuing regardless of external circumstances. 'Despite the storm, I just keep eating.' Defiance or indifference." },

    { vi: "đã",
      en: "already (completed, often defensive)",
      render: ["tôi", "+đã", "ăn cơm"],
      nuance_vi: "Xác nhận SỰ THẬT của hành động. Người Việt rất ít khi tự nhiên nói 'Tôi đã ăn.' Chữ 'đã' thường xuất hiện để PHẢN BÁC nghi ngờ: 'Tôi ĐÃ ăn cơm rồi!'",
      nuance_en: "Confirms the FACT of the action. Vietnamese rarely use 'đã' voluntarily — it usually appears to REBUT suspicion: 'I DID eat already!' The word carries argumentative weight." },

    { vi: "rồi",
      en: "already (status: done)",
      render: ["tôi ăn cơm", "+rồi"],
      nuance_vi: "Xác nhận TRẠNG THÁI HIỆN TẠI. 'Ăn cơm rồi' = bụng đang no, không cần ăn nữa. Khác 'đã': 'đã' = sự thật hành động, 'rồi' = trạng thái kết quả.",
      nuance_en: "Confirms CURRENT STATUS. 'Ăn cơm rồi' = belly is full now, no need to eat more. Different from 'đã': 'đã' = factual action, 'rồi' = resulting state." },

    { vi: "xong",
      en: "finished, done",
      render: ["tôi ăn cơm", "+xong"],
      nuance_vi: "Focus vào sự kết thúc quy trình vật lý. Thường làm bản lề mở hành động tiếp: 'Ăn xong rồi đi ngủ.'",
      nuance_en: "Focus on the physical process reaching its end. Usually a hinge to the next action: 'Done eating, now sleep.'" },

    { vi: "vừa",
      en: "just (moments ago)",
      render: ["tôi", "+vừa", "ăn cơm"],
      nuance_vi: "Quá khứ cực gần — vừa chấm dứt cách đây vài phút. Hay dùng để từ chối lời mời ăn tiếp.",
      nuance_en: "Extremely recent past — ended minutes ago. Often used to decline another invitation to eat." },

    { vi: "mới",
      en: "just (recently) / only (limiting)",
      render: ["tôi", "+mới", "ăn cơm"],
      nuance_vi: "DUAL: (1) Quá khứ gần như 'vừa'. (2) Giới hạn: 'mới ăn có nửa bát' = mới chỉ ăn được chút. (3) Trình tự: 'ăn cơm mới đi' = ăn xong RỒI MỚI đi. Ba lớp nghĩa, đều liên quan thời gian.",
      nuance_en: "TRIPLE meaning, all time-related: (1) Recent past like 'vừa'. (2) Limiting: 'only ate half a bowl so far'. (3) Sequencing: 'eat first, THEN go'. Three layers." },

    { vi: "từng",
      en: "once (in life), have ever",
      render: ["tôi", "+từng", "ăn cơm"],
      nuance_vi: "Trải nghiệm trong quá khứ xa. 'Từng ăn cơm ở nhà hàng này.' Hành động không còn liên quan hiện tại — chỉ là kinh nghiệm đã trải.",
      nuance_en: "A distant past experience. The action is disconnected from the present — just something that happened once in a lifetime." },

    { vi: "chưa",
      en: "not yet",
      render: ["tôi", "+chưa", "ăn cơm"],
      nuance_vi: "Chưa xảy ra, nhưng có tiềm năng/kỳ vọng SẼ xảy ra. Khác 'không' (từ chối hoàn toàn).",
      nuance_en: "Has not happened, but carries the expectation that it WILL. Unlike 'không' (flat refusal). The Vietnamese 'not yet' is inherently optimistic." },

    { vi: "đây",
      en: "right now, here and now",
      render: ["tôi ăn cơm", "+đây"],
      nuance_vi: "Thời điểm hiện tại, tức thì. 'Con ăn cơm đây.' = con ăn ngay bây giờ.",
      nuance_en: "Right now, this instant. 'I'm eating right now.' A live, unfolding present." },
  ],
};

function _parseRenderThoiGian(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveThoiGianBank() {

  const items = BANK_THOI_GIAN.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderThoiGian(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return items;
}

/* Back-compat: the module registry still imports ASPECT_BANK_DERIVED,
   and will be renamed alongside the type rename. Expose both names
   during the transition. */
window.BANK_THOI_GIAN         = BANK_THOI_GIAN;
window.THOI_GIAN_BANK_DERIVED = deriveThoiGianBank();
window.BANK_ASPECT            = BANK_THOI_GIAN;
window.ASPECT_BANK_DERIVED    = window.THOI_GIAN_BANK_DERIVED;
