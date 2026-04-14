// Single source of truth for the Đàn Tranh Basics section.
//
// These are the fundamentals — the physical ground a new player stands
// on before touching a piece from Repertoire: how to sit with the
// instrument, how to tune it, how to read the tablature notation.
//
// Schema is different from Repertoire. Each entry has a flat `blocks`
// array, walked in document order by the engine. Block types:
//   { type: "h2",    text: "..." }          ← section heading
//   { type: "h3",    text: "..." }          ← sub-section heading
//   { type: "h4",    text: "..." }          ← minor sub-heading
//   { type: "p",     text: "..." }          ← paragraph
//   { type: "image", file: "hero.png" }     ← full-bleed image (click→lightbox)
//   { type: "video", id: "..." }            ← YouTube facade (iframe on click)
//
// Every entry MUST have blurb.en AND blurb.vi.
//
// Assets live in basics/<slug>/. The thumbnail field names a file that
// must exist in that folder — swap the file (same name) to rebrand.

window.BASICS = [
  {
    slug: "your-dan-tranh",
    vi: "Làm Quen Đàn Tranh",
    en: "You and Your Đàn Tranh",
    region: { en: "Getting started", vi: "Bắt đầu" },
    thumbnail: "hero.png",
    blurb: {
      en: "Before the first note — where to place the instrument, how to shape the nails, where to pluck, and how to use the beads to navigate seventeen strings. The physical ground every new player needs to stand on.",
      vi: "Trước nốt đầu tiên — đặt đàn ở đâu, gọt móng thế nào, gảy chỗ nào, dùng hạt cườm định vị mười bảy dây ra sao. Nền tảng thân thể của người mới bắt đầu.",
    },
    blocks: [
      { type: "image", file: "hero.png" },
      { type: "h2", text: "How Far to Place Your Đàn Tranh" },
      { type: "video", id: "Cr8U1LSNBaM" },
      { type: "h3", text: "Adjusting the Nails" },
      { type: "video", id: "ja3toL8iFRA" },
      { type: "h3", text: "Where to Pluck with Your Index, Middle, and Thumb" },
      { type: "video", id: "PPNwn2HVhew" },
      { type: "image", file: "img-2.png" },
      { type: "image", file: "img-3.png" },
      { type: "h3", text: "Touch Points" },
      { type: "video", id: "nDHQ6FYpSQ8" },
      { type: "h3", text: "Bead Navigation" },
      { type: "video", id: "4FzL-DVzbE4" },
    ],
  },
  {
    slug: "tuning",
    vi: "Lên Dây Đàn Tranh",
    en: "Tuning the Đàn Tranh",
    region: { en: "Getting started", vi: "Bắt đầu" },
    thumbnail: "hero.png",
    blurb: {
      en: "The đàn tranh is tuned pentatonically across seventeen strings. This page walks through the standard C-pentatonic tuning (E3 up to A6), how the bridges slide to find pitch, and how to check each string against a reference.",
      vi: "Đàn tranh lên dây ngũ cung trên mười bảy dây. Trang này đi từng dây theo lối lên ngũ cung Đô (E3 đến A6), cách trượt nhạn tìm cao độ, cách so mỗi dây với một âm mẫu.",
    },
    blocks: [
      { type: "h2", text: "Standard tuning" },
      { type: "p", text: "Strings 1–17, from lowest to highest: E3, G3, A3, C4, D4, E4, G4, A4, C5, D5, E5, G5, A5, C6, D6, E6, G7. That is a pure C-pentatonic ladder spanning three octaves and change." },
      { type: "image", file: "hero.png" },
      { type: "h3", text: "Using your phone with the Ninja Tuner browser app (free)" },
      { type: "p", text: "Works well when you have one instrument to tune and a quiet space. Load the app in your phone browser, play a string, read the pitch." },
      { type: "image", file: "img-2.png" },
      { type: "h3", text: "Using a clip-on physical tuner" },
      { type: "p", text: "Works well in a noisy group class or when several players tune at once — the clip isolates your instrument's vibration from neighbouring sound." },
      { type: "image", file: "img-3.png" },
    ],
  },
  {
    slug: "tablature-reading",
    vi: "Đọc Tablature Đàn Tranh",
    en: "Reading Đàn Tranh Tablature",
    region: { en: "Getting started", vi: "Bắt đầu" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "The MAML tablature draws the seventeen strings as seventeen horizontal lines and marks which ones to play, in which order, with which hand. The video below is a short walkthrough of the entire notation system.",
      vi: "Tablature của MAML vẽ mười bảy dây đàn thành mười bảy đường ngang, đánh dấu dây nào phải gảy, theo thứ tự nào, tay nào. Video dưới đây là bản giới thiệu ngắn toàn bộ hệ ký âm.",
    },
    blocks: [
      { type: "p", text: "Đàn tranh tablature is an image of the 17 strings, showing which strings to play and in what order. Watch the video below as an introduction to how to read it." },
      { type: "video", id: "R7m82TP1BBs" },
    ],
  },
];
