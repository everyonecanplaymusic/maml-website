/* ============================================================
   data/addrem-head.js — Mở lời (đầu câu)

   Opening words — the vocative, deferential, exclamatory, or
   attention-getting token that Vietnamese speakers tack onto
   the front of an utterance before the main clause begins.
   Some are formal (dạ, bẩm), some are rough (ê, tiên sư), some
   are regional (nè, chèn ơi), some are overlap-homonyms that
   also live at the sentence tail with a different meaning.

   Schema: each item carries a `render` array where a segment
   prefixed with '+' is accent-highlighted. Commas and
   exclamation marks are baked into the highlighted opener
   because punctuation IS part of the opener's signature.

   Exposed:
     window.BANK_HEAD
     window.HEAD_BANK_DERIVED
   ============================================================ */

const BANK_HEAD = {
  name:    "Đầu câu — mở cửa bối cảnh / thái độ",
  note:    "Chữ mở câu. Chấp nhận trùng với chữ hỏi và tiểu từ cuối câu — cùng 1 chữ có thể đứng đầu VÀ đứng cuối.",
  note_en: "Openers. Overlap with the question and tail banks is expected — the same word can sit at the head AND the tail.",
  items: [
    { vi: "dạ",
      render: ["+dạ,", "tôi ăn cơm"],
      nuance_vi: "Lễ phép cửa dưới. 'Dạ, con ăn rồi.' Cùng chữ này đặt ở cuối câu = nũng nịu kiểu Nam.",
      nuance_en: "Deferential — spoken upward to an elder or superior. 'Yes sir, I've eaten.' OVERLAP: at sentence end it becomes a Southern coo.",
      multi: ["đầu: kính", "cuối: nũng"] },

    { vi: "bẩm",
      render: ["+bẩm,", "tôi ăn cơm"],
      nuance_vi: "Từ cổ, siêu kính trọng, hầu hạ. Dùng cho hoàng gia / quan lại.",
      nuance_en: "Archaic, ultra-deferential. Servant-to-master. Old court Vietnamese." },

    { vi: "ê",
      render: ["+ê,", "tôi ăn cơm"],
      nuance_vi: "Gọi giật, hơi thô. Ngang hàng hoặc trên xuống. Không dùng với người lớn.",
      nuance_en: "Curt calling — a bit rude. Peer-to-peer or downward only. Never to an elder." },

    { vi: "này",
      render: ["+này,", "tôi ăn cơm"],
      nuance_vi: "Gọi trung tính hơn 'ê'. Bắc Bộ dùng nhiều.",
      nuance_en: "More neutral than 'ê'. A common Northern attention-call." },

    { vi: "nè",
      render: ["+nè,", "tôi ăn cơm"],
      nuance_vi: "Nam Bộ. Mềm hơn 'ê' và 'này'. Gấp đôi 'nè nè' = nũng nịu.",
      nuance_en: "Southern. Softer than 'ê' or 'này'. Doubled 'nè nè' becomes playful cooing." },

    { vi: "nói nghe nè",
      render: ["+nói nghe nè,", "tôi ăn cơm"],
      nuance_vi: "Báo sắp có đề xuất hoặc chuyện bí mật. Hạ tông, kéo người nghe lại gần.",
      nuance_en: "Announcing a proposal or a secret. Voice drops, pulls the listener in close." },

    { vi: "coi nè",
      render: ["+coi nè,", "tôi ăn cơm"],
      nuance_vi: "Hướng mắt người nghe vào hiện trường. 'Coi nè, nó đang ăn kìa.'",
      nuance_en: "Pointing the listener's gaze at the scene. 'Look, see — he's eating.'" },

    { vi: "trời ơi",
      render: ["+trời ơi,", "tôi ăn cơm"],
      nuance_vi: "Bất ngờ lớn, kèm xót xa hoặc bực bội.",
      nuance_en: "Big surprise, laced with pity or frustration. 'Oh heavens!'" },

    { vi: "chết cha",
      render: ["+chết cha,", "tôi ăn cơm"],
      nuance_vi: "Phát hiện lỗi lầm khẩn cấp. 'Chết cha, quên mất!'",
      nuance_en: "Catching a mistake in the moment. 'Oh no — I forgot!'" },

    { vi: "á",
      render: ["+á,", "tôi ăn cơm"],
      nuance_vi: "Phản xạ vật lý — nóng, đau, giật mình.",
      nuance_en: "Physical reflex — burnt tongue, sudden pain, startle." },

    { vi: "chèn ơi",
      render: ["+chèn ơi,", "tôi ăn cơm"],
      nuance_vi: "Thán từ Nam Bộ — tiếc, than, hoặc bất ngờ nhẹ.",
      nuance_en: "Southern exclamation — regret, lament, or mild surprise." },

    { vi: "tiên sư",
      render: ["+tiên sư,", "tôi ăn cơm"],
      nuance_vi: "Chửi nhẹ, mắng đầu câu. Bắc Bộ, đời thường.",
      nuance_en: "Light curse-opener — 'dammit.' Northern everyday speech." },

    { vi: "tía má nó",
      render: ["+tía má nó,", "tôi ăn cơm"],
      nuance_vi: "Thán từ Nam Bộ — bất ngờ thân tình, không phải chửi.",
      nuance_en: "Southern exclamation of friendly shock — not actually cursing." },

    { vi: "vậy",
      render: ["+vậy,", "tôi ăn cơm"],
      nuance_vi: "Chốt phương án. 'Vậy đi ăn nha.' Cùng chữ này đặt ở cuối câu = nhượng bộ.",
      nuance_en: "Closing a decision. 'Alright then, let's eat.' OVERLAP: at sentence end it becomes a concession.",
      multi: ["đầu: chốt", "cuối: nhượng bộ"] },
  ],
};

function _parseRenderHead(arr) {
  return arr.map(s => {
    if (typeof s === "string" && s.startsWith("+")) {
      return { text: s.slice(1), hit: true };
    }
    return { text: s, hit: false };
  });
}

function deriveHeadBank() {

  const items = BANK_HEAD.items.map(it => ({
    word:     it.vi,
    segments: _parseRenderHead(it.render),
    en:       it.nuance_en || "",
    vi:       it.nuance_vi || "",
  }));

  return items;
}

window.BANK_HEAD         = BANK_HEAD;
window.HEAD_BANK_DERIVED = deriveHeadBank();
