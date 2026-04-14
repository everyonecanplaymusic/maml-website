/* ============================================================
   data/addrem-final.js — Sentence-final particles (tiểu từ cuối câu)

   Appended to "tôi ăn cơm". Each particle reshapes the social
   temperature of the sentence — kính, mời, biện bạch, hờn, than.
   English has no clean equivalent; you're not adding a word,
   you're choosing a relationship.

   Exposed:
     window.BANK_FINAL_PARTICLES
     window.FINAL_BANK_DERIVED
   ============================================================ */

const BANK_FINAL_PARTICLES = {
  name:    "Tiểu từ cuối câu — đắp sau 'Tôi Ăn Cơm'",
  note:    "Mỗi hạt là một nhiệt độ xã hội. Bỏ hạt: câu nghe lạnh, như báo cáo.",
  note_en: "Each particle is a social temperature. Drop it and the sentence turns clinical — like a report.",
  items: [
    { vi: "",
      sentence: ["", "tôi ăn cơm", ""],
      nuance_vi: "Câu trần. Không hạt. Lạnh, trung tính, nghe như báo cáo máy móc.",
      nuance_en: "Bare statement. No particle. Cold, clinical — sounds like a machine's report." },

    { vi: "ạ",
      sentence: ["tôi ăn cơm", "ạ", ""],
      nuance_vi: "Kính. Với ông bà, cha mẹ, thầy cô, khách. Thiếu 'ạ' ở chỗ cần có = hỗn.",
      nuance_en: "Deferential. To elders, parents, teachers, guests. Missing where required = rude." },

    { vi: "nhé",
      sentence: ["tôi ăn cơm", "nhé", ""],
      nuance_vi: "Mềm. Rủ đồng tình, thông báo nhẹ. Bắc Bộ là mặc định.",
      nuance_en: "Soft. Seeking agreement, gently announcing. Northern default." },

    { vi: "nha",
      sentence: ["tôi ăn cơm", "nha", ""],
      nuance_vi: "Nam Bộ. Thân mật, dễ thương, mềm hơn 'nhé'. Nhắn tin cực kỳ phổ biến.",
      nuance_en: "Southern. Warm, cute, softer than 'nhé'. Ubiquitous in texting." },

    { vi: "đây",
      sentence: ["tôi ăn cơm", "đây", ""],
      nuance_vi: "Thông báo đang làm, ngay lúc này. 'Đấy, đang ăn đây, đừng réo nữa'.",
      nuance_en: "Announcing the present act. 'See, I'm eating right now — stop calling me.'" },

    { vi: "thôi",
      sentence: ["tôi ăn cơm", "thôi", ""],
      nuance_vi: "Chỉ thế thôi. Khép lại, không bàn thêm, có chút cam chịu.",
      nuance_en: "That's all. Closing the matter, lightly resigned." },

    { vi: "mà",
      sentence: ["tôi ăn cơm", "mà", ""],
      nuance_vi: "Biện bạch, thanh minh. 'Thì tôi ăn cơm mà' — tự bênh mình.",
      nuance_en: "Protesting, explaining oneself. 'I AM eating' — defending against accusation." },

    { vi: "chứ",
      sentence: ["tôi ăn cơm", "chứ", ""],
      nuance_vi: "Khẳng định dứt khoát. 'Đương nhiên ăn chứ, sao lại không'.",
      nuance_en: "Of course. 'Naturally I eat — what did you expect?'" },

    { vi: "nhỉ",
      sentence: ["tôi ăn cơm", "nhỉ", ""],
      nuance_vi: "Tự nhủ, rủ người nghe cùng suy nghĩ. 'Ừ, ăn cơm nhỉ, mấy giờ rồi'.",
      nuance_en: "Wondering aloud, inviting the listener to think along. 'Right, eating — what time is it...'" },

    { vi: "đấy",
      sentence: ["tôi ăn cơm", "đấy", ""],
      nuance_vi: "Nhấn mạnh, cảnh báo nhẹ. 'Đang ăn ĐẤY nhé, đừng làm phiền'.",
      nuance_en: "Emphatic, mild warning. 'I AM eating — don't interrupt me.'" },

    { vi: "cơ",
      sentence: ["tôi ăn cơm", "cơ", ""],
      nuance_vi: "Hờn dỗi, trẻ con, nhõng nhẽo. 'Không, tôi muốn ăn cơm CƠ!'",
      nuance_en: "Pouty, childish insistence. 'No, I want rice!' — stamping a foot." },

    { vi: "à",
      sentence: ["tôi ăn cơm", "à", ""],
      nuance_vi: "Vừa hỏi vừa nhận ra. 'À thì tôi ăn cơm à' — dòng suy nghĩ bật lời.",
      nuance_en: "Half question, half realization — a thought leaking aloud." },

    { vi: "đó",
      sentence: ["tôi ăn cơm", "đó", ""],
      nuance_vi: "Nam Bộ thay cho 'đấy'. Nhấn nhẹ, kể lại, thân tình.",
      nuance_en: "Southern equivalent of 'đấy'. Lightly emphatic, narrative, warm." },

    { vi: "này",
      sentence: ["tôi ăn cơm", "này", ""],
      nuance_vi: "Gọi chú ý, mở lời. 'Này, tôi ăn cơm này, ăn cùng không?'",
      nuance_en: "Calling attention, opening a conversation. 'Hey, I'm eating — join me?'" },
  ],
};

function _sentenceToSegments([L, M, R]) {
  const segs = [];
  if (L) segs.push({ text: L, hit: false });
  if (M) segs.push({ text: M, hit: true });
  if (R) segs.push({ text: R, hit: false });
  return segs;
}

function deriveFinalParticlesBank() {
  return BANK_FINAL_PARTICLES.items.map(it => ({
    word:     it.vi,
    segments: _sentenceToSegments(it.sentence),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));
}

window.BANK_FINAL_PARTICLES = BANK_FINAL_PARTICLES;
window.FINAL_BANK_DERIVED   = deriveFinalParticlesBank();
