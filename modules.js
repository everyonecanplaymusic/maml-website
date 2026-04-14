/* ============================================================
   modules.js  —  data registry for Tôi Ăn Cơm trailer cards

   To add a new card, just append another object to MODULES.
   The engine in script.js renders + wires up everything from
   this list alone. No HTML or CSS edits required.

   Schema (type "swap"):
   {
     id:        "swap-<slot>"     unique
     type:      "swap"            currently the only supported behavior
     slot:      "<slot>"          internal key, used in dataset.slot
     color:     "#rrggbb"         per-card accent color (becomes --accent)
     target:    "tôi"             word that appears in the SWAP "<word>" label
     sentence:  ["", "tôi", "ăn cơm"]   left context · active · right context
     role: {
       en: "the one speaking",    English role label
       vi: "người đang nói"       Vietnamese role label (auxiliary)
     }
     bank: [
       { word, en, vi },          variants. First entry is treated as canonical.
       ...
     ]
   }

   Future types ("addrem", "overlapping", …) will define their own
   shape and renderer/behavior in script.js.
   ============================================================ */

window.MODULES = [

  // ---------- SWAP "tôi" ----------
  // Bank pulled from BANK_KINSHIP corpus (data/kinship.js).
  // The runtime list (KINSHIP_BANK_DERIVED) flattens basicPronouns,
  // atomicWords, and southernNumbering.combos into {word, en, vi}.
  {
    id:    "swap-toi",
    type:  "swap",
    slot:  "toi",
    color: "#d24a3d",
    target:   "tôi",
    sentence: ["", "tôi", "ăn cơm"],
    role: {
      en: "the one speaking",
      vi: "người đang nói",
    },
    bank: window.KINSHIP_BANK_DERIVED,
  },

  // ---------- SWAP "ăn" ----------
  // Bank pulled from BANK_AN corpus (data/an.js).
  // Spans polite → royal → working-class → disdainful → baby-talk →
  // chopstick-cultural → metaphorical extensions of "ăn".
  {
    id:    "swap-an",
    type:  "swap",
    slot:  "an",
    color: "#2a8c6a",
    target:   "ăn",
    sentence: ["tôi", "ăn", "cơm"],
    role: {
      en: "how it is taken in",
      vi: "cách đưa vào miệng",
    },
    bank: window.AN_BANK_DERIVED,
  },

  // ---------- SWAP "cơm" ----------
  // Bank pulled from BANK_DOI_TAC corpus (data/com.js).
  // Each food carries class, tempo, health, emotion — swapping
  // the dish swaps the entire scene.
  {
    id:    "swap-com",
    type:  "swap",
    slot:  "com",
    color: "#c08416",
    target:   "cơm",
    sentence: ["tôi ăn", "cơm", ""],
    role: {
      en: "what is on the plate",
      vi: "thứ trên bàn ăn",
    },
    bank: window.COM_BANK_DERIVED,
  },

];
