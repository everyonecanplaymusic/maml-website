/* ============================================================
   data/addrem-question.js — Nghi vấn (câu hỏi)

   Question markers. A mix of:
     1. Sentence-final particles (hả, chứ, sao, ha, hông, à, ta, nhỉ)
     2. Opener particles that also mark questions (ủa)
     3. TEMPLATES — two-word clamps that bracket the verb from
        both sides (có...không, có...chứ, đã...chưa, …). Both
        halves are highlighted; removing either half changes
        the meaning.
     4. WH fillers sitting at the empty slot (hồi nào, chừng nào,
        bao giờ, với ai, mấy).

   Every item renders with a trailing "?" baked into its last
   highlighted segment — the question mark IS the sentence's
   acoustic rise, made visible on the page.

   Exposed:
     window.BANK_QUESTION
     window.QUESTION_BANK_DERIVED
   ============================================================ */

const BANK_QUESTION = {
  name:    "Nghi vấn — chữ đánh dấu câu hỏi",
  note:    "Chấp nhận trùng với chữ mở câu và tiểu từ cuối câu. Templates (có...không, đã...chưa) cũng ghi ở đây.",
  note_en: "Overlap with head and tail banks is expected. Two-word template clamps live here too.",
  items: [
    // ---------- Particles nghi vấn (single word) ----------
    { vi: "hả",
      render: ["tôi ăn cơm", "+hả?"],
      nuance_vi: "Xác nhận thị giác, bắt gặp tận tay. OVERLAP: cũng là TAIL.",
      nuance_en: "Visual confirmation — catching someone in the act. OVERLAP: also a tail particle." },

    { vi: "chứ",
      render: ["tôi ăn cơm", "+chứ?"],
      nuance_vi: "Tin chắc 90%, hỏi để an tâm. OVERLAP: cũng là TAIL.",
      nuance_en: "90% certain, asking for reassurance. 'You ARE eating, right?' OVERLAP: also a tail." },

    { vi: "sao",
      render: ["tôi ăn cơm", "+sao?"],
      nuance_vi: "DUAL: đầu câu = 'tại sao' (truy cứu); cuối câu = ngỡ ngàng. OVERLAP: HEAD + TAIL.",
      nuance_en: "DUAL: at the head it means 'why' (interrogation); at the tail it means stunned. OVERLAP: both HEAD and TAIL.",
      multi: ["đầu: truy cứu", "cuối: ngỡ ngàng"] },

    { vi: "ha",
      render: ["tôi ăn cơm", "+ha?"],
      nuance_vi: "Biến âm Nam Bộ của 'hả'.",
      nuance_en: "Southern phonetic variant of 'hả'." },

    { vi: "hông",
      render: ["tôi ăn cơm", "+hông?"],
      nuance_vi: "Biến âm Nam Bộ của 'không' khi dùng trong câu hỏi.",
      nuance_en: "Southern variant of 'không' in interrogatives." },

    { vi: "à",
      render: ["tôi ăn cơm", "+à?"],
      nuance_vi: "Dò xét nhẹ, hơi ngạc nhiên. OVERLAP: cũng là TAIL.",
      nuance_en: "Gentle probing, slight surprise. OVERLAP: also a tail." },

    { vi: "ta",
      render: ["tôi ăn cơm", "+ta?"],
      nuance_vi: "Tự vấn — nói lầm bầm với chính mình. 'Mình ăn chưa ta?'",
      nuance_en: "Self-questioning — muttering to oneself. 'Did I eat yet...?'" },

    { vi: "ủa",
      render: ["+ủa,", "tôi ăn cơm?"],
      nuance_vi: "Bất ngờ + mở nghi vấn. Nam Bộ. OVERLAP: cũng là HEAD.",
      nuance_en: "Surprise opening into a question. Southern. OVERLAP: also a head.",
      multi: ["bất ngờ", "nghi vấn"] },

    { vi: "nhỉ",
      render: ["tôi ăn cơm", "+nhỉ?"],
      nuance_vi: "Câu hỏi tự vấn, mời đồng thuận. OVERLAP: cũng là TAIL (đồng thuận).",
      nuance_en: "Self-wondering aloud, inviting agreement. OVERLAP: also a tail.",
      multi: ["đồng thuận", "tự vấn"] },

    // ---------- TEMPLATES KẸP — 2 chữ ở 2 slot cùng lúc ----------
    // Luật: Chữ 1 ở slot [PERSON → _ → VERB], Chữ 2 ở slot [OBJECT → _ → <END>]
    // Ví dụ: "Mày [có] ăn cơm [không]?" — slot A kẹp trước verb, slot B kẹp sau object.
    // Hai chữ PHẢI xuất hiện cùng nhau — bỏ một là câu đổi nghĩa hoàn toàn.

    { vi: "có ... không",
      render: ["tôi", "+có", "ăn cơm", "+không?"],
      isTemplate: true,
      pos1: { vi: "có",    slot: "PERSON → _ → VERB",   nuance: "Mở khung kiểm chứng" },
      pos2: { vi: "không", slot: "OBJECT → _ → <END>",  nuance: "Đóng khung — buộc Yes/No" },
      nuance_vi: "Hỏi hiện tại/tương lai. Buộc Yes/No. Template câu hỏi trung tính nhất.",
      nuance_en: "Present/future question forcing Yes/No. The most neutral interrogative template." },

    { vi: "có ... chứ",
      render: ["tôi", "+có", "ăn cơm", "+chứ?"],
      isTemplate: true,
      pos1: { vi: "có",  slot: "PERSON → _ → VERB" },
      pos2: { vi: "chứ", slot: "OBJECT → _ → <END>", nuance: "Tin chắc 90%" },
      nuance_vi: "Tin chắc 90%, hỏi để an tâm. 'Mày có ăn cơm chứ?'",
      nuance_en: "90% certain, seeking reassurance. 'You ARE eating, right?'" },

    { vi: "có ... hông",
      render: ["tôi", "+có", "ăn cơm", "+hông?"],
      isTemplate: true,
      pos1: { vi: "có",   slot: "PERSON → _ → VERB" },
      pos2: { vi: "hông", slot: "OBJECT → _ → <END>", nuance: "Biến âm Nam" },
      nuance_vi: "Biến âm Nam Bộ của 'có...không'.",
      nuance_en: "Southern variant of the 'có...không' clamp." },

    { vi: "có ... chứ ta",
      render: ["tôi", "+có", "ăn cơm", "+chứ", "+ta?"],
      isTemplate: true,
      pos1: { vi: "có",  slot: "PERSON → _ → VERB" },
      pos2: { vi: "chứ", slot: "OBJECT → _ → <END>" },
      pos3: { vi: "ta",  slot: "sau pos2", nuance: "Tự vấn" },
      nuance_vi: "Kẹp + tự vấn. 'Mình có ăn cơm chứ ta?' — vừa hỏi người vừa hỏi mình.",
      nuance_en: "Template + self-questioning. Half asking, half wondering aloud." },

    { vi: "có ... hông ta",
      render: ["tôi", "+có", "ăn cơm", "+hông", "+ta?"],
      isTemplate: true,
      pos1: { vi: "có",   slot: "PERSON → _ → VERB" },
      pos2: { vi: "hông", slot: "OBJECT → _ → <END>" },
      pos3: { vi: "ta",   slot: "sau pos2", nuance: "Tự vấn Nam" },
      nuance_vi: "Kẹp Nam Bộ + tự vấn. 'Mình có ăn cơm hông ta?'",
      nuance_en: "Southern template + self-questioning." },

    { vi: "đã ... chưa",
      render: ["tôi", "+đã", "ăn cơm", "+chưa?"],
      isTemplate: true,
      pos1: { vi: "đã",   slot: "PERSON → _ → VERB",  nuance: "Áp lực thời gian quá khứ" },
      pos2: { vi: "chưa", slot: "OBJECT → _ → <END>", nuance: "Hàm ý đáng lẽ xong rồi" },
      nuance_vi: "Hỏi quá khứ có áp lực thời gian. 'Mày đã ăn cơm chưa?' — đáng lẽ xong rồi.",
      nuance_en: "Past question with time pressure. 'Have you eaten YET?' — implies you should have by now." },

    { vi: "có ... chưa",
      render: ["tôi", "+có", "ăn cơm", "+chưa?"],
      isTemplate: true,
      pos1: { vi: "có",   slot: "PERSON → _ → VERB",  nuance: "Kiểm chứng sự tồn tại" },
      pos2: { vi: "chưa", slot: "OBJECT → _ → <END>", nuance: "Dò xét" },
      nuance_vi: "Kiểm chứng quá khứ, dò xét. 'Con có ăn cơm chưa?' — rốt cuộc ăn hay nhịn?",
      nuance_en: "Verifying past action, suspicious tone. 'Did you actually eat, or did you skip?'" },

    // ---------- Slot rỗng (WH fillers) ----------

    { vi: "hồi nào",
      render: ["tôi ăn cơm", "+hồi nào?"],
      nuance_vi: "Hỏi thời điểm quá khứ. Slot rỗng tại chỗ, không đem lên đầu câu.",
      nuance_en: "Asking a past time. Fills the slot in place, never fronted." },

    { vi: "chừng nào",
      render: ["+chừng nào", "tôi ăn cơm?"],
      nuance_vi: "Hỏi thời điểm tương lai. Nam Bộ / Trung Bộ. Phải đưa lên đầu câu — để cuối câu thì đọc thành rhetorical.",
      nuance_en: "Asking a future time. Central / Southern. Must front — leaving it at the end turns it rhetorical." },

    { vi: "bao giờ",
      render: ["+bao giờ", "tôi ăn cơm?"],
      nuance_vi: "Hỏi thời điểm tương lai. Bắc Bộ. Phải đưa lên đầu câu — 'tôi ăn cơm bao giờ?' đọc thành 'khi nào mới ăn nổi'.",
      nuance_en: "Asking a future time. Northern. Must front — at sentence-end it reads as 'when will I ever get to…'." },

    { vi: "với ai",
      render: ["tôi ăn cơm", "+với ai?"],
      nuance_vi: "Hỏi đối tác, bạn ăn.",
      nuance_en: "Asking the companion — with whom." },

    { vi: "mấy chén",
      render: ["tôi ăn", "+mấy chén", "cơm?"],
      nuance_vi: "Hỏi số lượng. 'Mấy' kẹp trước loại từ (chén, tô, bát).",
      nuance_en: "Asking quantity. 'Mấy' attaches to a classifier (bowl, plate)." },
  ],
};

function _parseRenderQuestion(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveQuestionBank() {
  const bare = {
    word: "",
    segments: [{ text: "tôi ăn cơm?", hit: true }],
    en: "Bare question — rising intonation alone, no overt marker.",
    vi: "Câu hỏi trần — chỉ cần lên giọng cuối câu, không chữ đánh dấu.",
  };

  const items = BANK_QUESTION.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderQuestion(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return [bare, ...items];
}

window.BANK_QUESTION         = BANK_QUESTION;
window.QUESTION_BANK_DERIVED = deriveQuestionBank();
