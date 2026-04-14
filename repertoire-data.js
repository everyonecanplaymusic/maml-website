// Single source of truth for the Đàn Tranh repertoire / tab tutorials.
//
// Each entry is a piece. repertoire.html reads this to render the index
// grid; repertoire/<slug>/index.html reads this to render the subpage for
// its own slug. To add a piece: append an object here, drop its assets in
// repertoire/<slug>/, and create a matching subpage HTML that points at
// the same slug. Do not duplicate data anywhere else.
//
// Asset convention — everything per-piece lives in repertoire/<slug>/:
//   thumbnail.jpg|png     ← index grid cover (swap file to rebrand)
//   overview.png          ← tablature overview image (optional)
//   level-1.png ...       ← per-level tablature images
//   index.html            ← subpage for this piece
//
// Videos are YouTube IDs (11 chars). The engine embeds them lazily as
// iframes so first paint stays fast even with 50+ videos on a page.

window.REPERTOIRE = [
  {
    slug: "ly-ngua-o",
    vi: "Lý Ngựa Ô",
    en: "Song of the Black Stallion",
    region: { en: "South Vietnam", vi: "Nam Bộ" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Lý Ngựa Ô Nam, a folk song of south Vietnam. Lý is a folk song with a theme, special to the region south of Huế. This song describes the excitement of a groom-to-be decorating his black stallion to carry his bride to their new home.",
      vi: "Lý Ngựa Ô Nam, dân ca Nam Bộ. Lý là thể dân ca có chủ đề, đặc trưng của vùng từ Huế trở vào. Bài này tả niềm háo hức của chàng rể trang trí con ngựa ô để rước cô dâu về nhà mới."
    },
    terms: [
      { vi: "ngựa ô",   en: "black stallion" },
      { vi: "khớp",     en: "bit, harness" },
      { vi: "kiệu",     en: "palanquin" },
      { vi: "lục lạc",  en: "rattle, bell" },
      { vi: "búp sen",  en: "lotus brass" },
      { vi: "lá dặm",   en: "leaf blinkers" },
      { vi: "dây cương",en: "rein" },
      { vi: "cán roi",  en: "whip handle" }
    ],
    overview: {
      image: "overview.png",
      video: "heN5IaQGxcE",
      caption: {
        en: "Levels 1, 2, 3, and 7 played side-by-side so you can hear how the same phrase grows across difficulty.",
        vi: "Level 1, 2, 3 và 7 chơi cạnh nhau để nghe cùng một phrase nở ra theo độ khó."
      }
    },
    levels: [
      { n: 1, tablature: "level-1.png", videos: [
        { label: "Phrase 1",          id: "xjT8huPmPuQ" },
        { label: "Phrase 2",          sameAs: "Phrase 1" },
        { label: "Phrase 3",          id: "Y1QrazxlWU8" },
        { label: "Phrase 4",          id: "wPMjjjPoVEE" },
        { label: "Phrases 5-6",       id: "D06SQRgwap0" },
        { label: "Phrases 7-8-9",     id: "VwWndzz35gU" },
        { label: "Phrases 10-11-12",  id: "7j2GPv9B38Y" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 2, tablature: "level-2.png", videos: [
        { label: "Phrase 1",          id: "fu3QcO_Oq2o" },
        { label: "Phrase 2",          sameAs: "Phrase 1" },
        { label: "Phrase 3",          id: "fV9UaPJUCn8" },
        { label: "Phrase 4",          id: "QtG_rnEBXDo" },
        { label: "Phrases 5-6",       id: "_x69cisCAO0" },
        { label: "Phrases 7-8-9",     id: "gbeWfXHSCG0" },
        { label: "Phrases 10-11-12",  id: "SFBs14F6zXI" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 3, tablature: "level-3.png", videos: [
        { label: "Phrase 1",          id: "w8oon1OoNdI" },
        { label: "Phrase 2",          sameAs: "Phrase 1" },
        { label: "Phrase 3",          id: "S7PNWiV8hY8" },
        { label: "Phrase 4",          id: "O9CXDPI6mtc" },
        { label: "Phrases 5-6",       id: "pJpdxwrtHfE" },
        { label: "Phrases 7-8-9",     id: "cdrsziL5O-g" },
        { label: "Phrases 10-11-12",  id: "kPya27D69ds" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 4, tablature: "level-4.png", videos: [
        { label: "Phrase 1",          id: "4kPS3dTjrfc" },
        { label: "Phrase 2",          sameAs: "Phrase 1" },
        { label: "Phrase 3",          id: "eAQdNnYc0EM" },
        { label: "Phrase 4",          id: "PNDWx1gqQgs" },
        { label: "Phrases 5-6",       id: "ekZzxTuzMDE" },
        { label: "Phrases 7-8-9",     id: "cdrsziL5O-g" },
        { label: "Phrases 10-11-12",  id: "kPya27D69ds" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 5, tablature: "level-5.png", videos: [
        { label: "Phrase 1",          id: "6LgVk9sFi84" },
        { label: "Phrase 2",          id: "1DG4EZywFc4" },
        { label: "Phrase 3",          id: "7ZjCKWUfjok" },
        { label: "Phrase 4",          id: "cejkKu_nAyM" },
        { label: "Phrases 5-6",       id: "wDST86N3WMc" },
        { label: "Phrases 7-8-9",     id: "HzH18at9ojE" },
        { label: "Phrases 10-11-12",  id: "UirZOxPKI7Y" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 6, tablature: "level-6.png", videos: [
        { label: "Phrase 1",          id: "egKAoUOxtqo" },
        { label: "Phrase 2",          id: "9nZ7K4PF1gY" },
        { label: "Phrase 3",          id: "QY-nBeRaYLs" },
        { label: "Phrase 4",          id: "TDFa4R5diyY" },
        { label: "Phrases 5-6",       id: "dmWpTL7PGJU" },
        { label: "Phrases 7-8-9",     id: "wwaFgi47UkA" },
        { label: "Phrases 10-11-12",  id: "cwHbu5-ZhZc" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 7, tablature: "level-7.png", videos: [
        { label: "Phrase 1",          id: "p_ICVnCmlCc" },
        { label: "Phrase 2",          id: "CDJ769z_460" },
        { label: "Phrase 3",          id: "gDR0LCIO5jQ" },
        { label: "Phrase 4",          id: "r7YSKM7lX9M" },
        { label: "Phrases 5-6",       id: "Y_ZLHHPZ4FA" },
        { label: "Phrases 7-8-9",     id: "-fkfAhOJrn8" },
        { label: "Phrases 10-11-12",  id: "tl6G93noa6E" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]},
      { n: 8, tablature: "level-8.png", videos: [
        { label: "Phrase 1",          id: "u0rAFL03Od4" },
        { label: "Phrase 2",          id: "ZT2j5al_stw" },
        { label: "Phrase 3",          id: "dngaMIX03Oc" },
        { label: "Phrase 4",          id: "9XjWTbhU7N4" },
        { label: "Phrases 5-6",       id: "FV9xnmN52ik" },
        { label: "Phrases 7-8-9",     id: "kY5g6lEYxBs" },
        { label: "Phrases 10-11-12",  id: "thEA85kPhcU" },
        { label: "Phrases 13-14-15",  sameAs: "Phrases 10-11-12" }
      ]}
    ],
    performance: {
      id: "SZk8Txbc45E",
      label: {
        en: "Performance Tempo Play-Along Track",
        vi: "Đệm hòa tấu tốc độ trình diễn"
      }
    }
  },
  {
    slug: "hoa-anh-dao",
    vi: "Hoa Anh Đào",
    en: "Sakura Sakura",
    region: { en: "Japan · folk song", vi: "Dân ca Nhật Bản" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Sakura Sakura, the classic Japanese folk song of spring and cherry blossoms. Its pentatonic line sits naturally on the đàn tranh — arranged here across nine graded levels, from plain melody up to alternating-hand technique.",
      vi: "Hoa Anh Đào là bài dân ca Nhật cổ tả cảnh hoa anh đào nở rộ. Giai điệu ngũ cung vừa vặn với đàn tranh, người học mới có thể ráp bài nhanh.",
    },
    levels: [
      { n: 1, title: "Level 1: Main Melody", videos: [
        { label: "◆ Practice Video for Phrase 1+2 (looped many times so you can play along)", id: "ed34xdLTeJQ", signal: { head: "phrase", num: "1+2" } },
        { label: "◆ Practice Video for Phrase 4 (looped 4 times so you can play along)", id: "N4yoRD-OoXs", signal: { head: "phrase", num: "4" } },
        { label: "◆ Practice Video for Phrase 3 (looped 4 times so you can play along)", id: "MKVxORYnkZA", signal: { head: "phrase", num: "3" } },
        { label: "◆ Practice Video for Phrase 9 (looped 4 times so you can play along)", id: "lh77C7ZdJrs", signal: { head: "phrase", num: "9" } },
        { label: "Whole song", id: "36EelJV3RtU", signal: { head: "", num: "whole" } },
      ]},
      { n: 2, title: "Level 2: Main Melody and Á", videos: [
        { label: "◆ Practice Video for Phrase 1+2", id: "JM14KJM0_qA", signal: { head: "phrase", num: "1+2" } },
        { label: "◆ Practice Video for Phrase 4", id: "tc0BSnZJeoE", signal: { head: "phrase", num: "4" } },
        { label: "◆ Practice Video for Phrase 3", id: "8EJzHXseme4", signal: { head: "phrase", num: "3" } },
        { label: "◆ Practice Video for Phrase 9", id: "m12AZ296Y9E", signal: { head: "phrase", num: "9" } },
        { label: "◆ Whole song", id: "FXdNWGJt7_g", signal: { head: "", num: "whole" } },
      ]},
      { n: 3, title: "Level 3: Main Melody and song thanh chập", videos: [
        { label: "◆ Whole song", id: "wkXlXVoDBo0", signal: { head: "", num: "whole" } },
      ]},
      { n: 4, title: "Level 4: Main Melody, song thanh chập", videos: [
        { label: "◆ Whole song", id: "wkXlXVoDBo0", signal: { head: "", num: "whole" } },
      ]},
      { n: 5, title: "Level 5: Main Melody, song thanh rời", videos: [
        { label: "◆ Practice Video for Phrase 1+2", id: "Mpd2ArvlMXE", signal: { head: "phrase", num: "1+2" } },
        { label: "◆ Practice Video for Phrase 4", id: "AHUIoGJ3cE8", signal: { head: "phrase", num: "4" } },
        { label: "◆ Practice Video for Phrase 3", id: "hxOOHVQ9lDA", signal: { head: "phrase", num: "3" } },
        { label: "◆ Practice Video for Phrase 9", id: "unndthDhk4M", signal: { head: "phrase", num: "9" } },
        { label: "◆ Whole song", id: "HzELYblC4GU", signal: { head: "", num: "whole" } },
      ]},
      { n: 6, title: "Level 6: Left hand with three-note blocked chords", videos: [
        { label: "◆ Whole song", id: "M3aRMZ37dA4", signal: { head: "", num: "whole" } },
      ]},
      { n: 9, title: "Level 9: Prep Step", videos: [
        { label: "◆ Practice Video for Phrase 1+2", id: "GmH3Rl4ehXc", signal: { head: "phrase", num: "1+2" } },
        { label: "◆ Practice Video for Phrase 4", id: "K5uESYEwPg4", signal: { head: "phrase", num: "4" } },
        { label: "◆ Practice Video for Phrase 3", id: "lQtmEiDGkFE", signal: { head: "phrase", num: "3" } },
        { label: "◆ Practice Video for Phrase 9", id: "Ds5XXhtlxjU", signal: { head: "phrase", num: "9" } },
        { label: "◆ Whole song", id: "hUXJ-xq4fZY", signal: { head: "", num: "whole" } },
      ]},
      { n: 9, title: "Level 9: play with alternating hands", videos: [
        { label: "◆ Whole song", id: "X3cVlgGiBzY", signal: { head: "", num: "whole" } },
      ]},
    ],
  },
  {
    slug: "twinkle-twinkle",
    vi: "Ngôi Sao Lấp Lánh",
    en: "Twinkle Twinkle Little Star",
    region: { en: "English nursery rhyme", vi: "Đồng dao tiếng Anh" },
    thumbnail: "thumbnail.jpeg",
    blurb: {
      en: "Twinkle Twinkle Little Star, the classic English nursery rhyme, arranged for đàn tranh beginners as a first bilingual practice piece.",
      vi: "Ngôi Sao Lấp Lánh — đồng dao kinh điển tiếng Anh — chuyển soạn cho người mới học đàn tranh, làm bài luyện tập song ngữ đầu tiên.",
    },
    levels: [
      { n: 1, title: "Level 1 — Main Melody", videos: [
        { label: "Practice Video for Phrase 1+2 (looped 4 times so you can play along)", id: "J3P8kWAjs7E", signal: { head: "phrase", num: "1+2" } },
        { label: "Practice Video for Phrase 5+6 (looped 4 times so you can play along)", id: "f8NMJoEwB5Y", signal: { head: "phrase", num: "5+6" } },
        { label: "Practice Video for Phrase 3+4 (looped 4 times so you can play along)", id: "ku2I9lh8LOg", signal: { head: "phrase", num: "3+4" } },
        { label: "Whole song played once", id: "1DCNvZg5TIQ", signal: { head: "", num: "whole" } },
      ]},
      { n: 2, title: "Level 2 — Main Melody and Á", videos: [
        { label: "Practice Video for Phrase 1+2 (looped 4 times so you can play along)", id: "2UlLlqNMlbY", signal: { head: "phrase", num: "1+2" } },
        { label: "Practice Video for Phrase 5+6 (looped 4 times so you can play along)", id: "whlbokFkMJc", signal: { head: "phrase", num: "5+6" } },
        { label: "Practice Video for Phrase 3+4 (looped 4 times so you can play along)", id: "9BbZBuQCZwU", signal: { head: "phrase", num: "3+4" } },
        { label: "Whole song played once", id: "UNwqr2qHnuU", signal: { head: "", num: "whole" } },
      ]},
      { n: 3, title: "Level 3 — Main Melody with a supporting note", videos: [
        { label: "Practice Video for Phrase 1+2 (looped 4 times so you can play along)", id: "iatTWJmEgzk", signal: { head: "phrase", num: "1+2" } },
        { label: "Practice Video for Phrase 5+6 (looped 4 times so you can play along)", id: "4o1F3ZvdKSE", signal: { head: "phrase", num: "5+6" } },
        { label: "Practice Video for Phrase 3+4 (looped 4 times so you can play along)", id: "Cavws2IKLsg", signal: { head: "phrase", num: "3+4" } },
        { label: "Whole song played once", id: "3ODcioPsU9k", signal: { head: "", num: "whole" } },
      ]},
      { n: 4, title: "Level 4 — Main Melody with a supporting note", videos: [
        { label: "Practice Video for Phrase 1+2 (looped 4 times so you can play along)", id: "foMqQp31Ed8", signal: { head: "phrase", num: "1+2" } },
        { label: "Practice Video for Phrase 5+6 (looped 4 times so you can play along)", id: "oi1HXlW_dD8", signal: { head: "phrase", num: "5+6" } },
        { label: "Practice Video for Phrase 3+4 (looped 4 times so you can play along)", id: "L8iwA4HMwJI", signal: { head: "phrase", num: "3+4" } },
        { label: "Whole song played once", id: "cmWgxjAy4jo", signal: { head: "", num: "whole" } },
      ]},
    ],
  },
  {
    slug: "baby-shark",
    vi: "Cá Mập Con",
    en: "Baby Shark",
    region: { en: "Children's song", vi: "Nhạc thiếu nhi" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "Baby Shark — the children's song every parent knows — arranged as a short demonstration for very young đàn tranh learners.",
      vi: "Baby Shark — bài hát thiếu nhi phụ huynh nào cũng biết — chuyển soạn thành bản demo ngắn cho trẻ nhỏ mới cầm đàn tranh.",
    },
    videos: [
      { label: "Video", id: "Zea9rKxrUSg", signal: { head: "", num: "Video" } },
    ],
  },
  {
    slug: "happy-birthday",
    vi: "Mừng Ngày Sinh Nhật",
    en: "Happy Birthday to You",
    region: { en: "International · celebration", vi: "Quốc tế · chúc mừng" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "Happy Birthday to You on đàn tranh, arranged in four graded levels to show how a single melody grows from plain notes into a richly ornamented performance.",
      vi: "Bài Happy Birthday trên đàn tranh, chia bốn cấp để minh hoạ một giai điệu đơn có thể lớn thành một bản diễn đầy hoa tay như thế nào.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
      { image: "img-4.png" },
      { image: "img-5.png" },
      { image: "img-6.png" },
      { image: "img-7.png" },
    ],
    videos: [
      { label: "Play-along videos", id: "tRNXCjexT1s", signal: { head: "video", num: "01" } },
    ],
  },
  {
    slug: "trong-com",
    vi: "Trống Cơm",
    en: "Song of the Rice Drum",
    region: { en: "North Vietnam · folk song", vi: "Dân ca Bắc Bộ" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "Trống Cơm is a northern Vietnamese folk song about the rice drum — a small clay drum tuned by sticking sweet rice dough to its heads. The playful melody doubles as a preparation drill for right-hand attack and left-hand bending.",
      vi: "Trống Cơm là dân ca Bắc Bộ về cái trống đất nhỏ có dán cơm nếp hai mặt để chỉnh âm. Giai điệu vui nhộn; bài học giới thiệu kỹ thuật tay phải chuẩn bị và tay trái nhấn.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
      { image: "img-4.png" },
      { image: "img-5.jpg" },
      { image: "img-6.jpg" },
      { image: "img-7.jpg" },
    ],
    videos: [
      { label: "PREPARATION FOR RIGHT HAND:", id: "a3rdImnsLpo", signal: { head: "video", num: "01" } },
      { label: "PREPARATION FOR RIGHT HAND:", id: "rzIEX9LBwgc", signal: { head: "video", num: "02" } },
      { label: "PREPARATION FOR BENDING with LEFT HAND:", id: "DR8JXlgxzj8", signal: { head: "video", num: "03" } },
      { label: "PREPARATION FOR BENDING with LEFT HAND:", id: "zjql5lPUm7g", signal: { head: "video", num: "04" } },
      { label: "PREPARATION FOR BENDING with LEFT HAND:", id: "MC8nPmMldeE", signal: { head: "video", num: "05" } },
      { label: "PREPARATION FOR BENDING with LEFT HAND:", id: "aAK4N6s-N4M", signal: { head: "video", num: "06" } },
      { label: "FINGER SWITCH – FEELING THE POSITION BY SLOW LOOK AWAY FROM YOUR HANDS", id: "16t11NDujFA", signal: { head: "video", num: "07" } },
      { label: "FINGER SWITCH – FEELING THE POSITION BY SLOW LOOK AWAY FROM YOUR HANDS", id: "rtOUhGPgZYA", signal: { head: "video", num: "08" } },
      { label: "DEMONSTRATION: SINGING + ĐÀN TRANH + TABLATURE", id: "_xWm9-ZZwTY", signal: { head: "video", num: "09" } },
      { label: "DEMONSTRATION: OSTINATO 1 (2 STRINGS) OR OSTINATO 2 (3 STRINGS)", id: "07l02AAmLYU", signal: { head: "video", num: "10" } },
      { label: "DEMONSTRATION: OSTINATO 1 (2 STRINGS) OR OSTINATO 2 (3 STRINGS)", id: "NadeDsNtoco", signal: { head: "video", num: "11" } },
    ],
  },
  {
    slug: "long-me",
    vi: "Lòng Mẹ",
    en: "Heart of Mother",
    region: { en: "Y Vân · 1950s", vi: "Y Vân · thập niên 1950" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "Y Vân's Lòng Mẹ is one of the most beloved Vietnamese songs about a mother's love. Arranged for đàn tranh with four left-hand bending techniques highlighted alongside the melody.",
      vi: "Lòng Mẹ của Y Vân là một trong những bài hát Việt quen thuộc nhất về tình mẹ. Chuyển soạn cho đàn tranh, làm nổi bốn kiểu nhấn tay trái.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
    ],
    videos: [
      { label: "Video", id: "NlDSYKm9Xlc", signal: { head: "", num: "Video" } },
      { label: "Đàn Tranh Demonstration – Melody Only", id: "EM_RUJBzdw4", signal: { head: "video", num: "02" } },
    ],
  },
  {
    slug: "auld-lang-syne",
    vi: "Auld Lang Syne",
    en: "Old Long Since",
    region: { en: "Scotland · folk / New Year", vi: "Scotland · dân ca / đón năm mới" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Auld Lang Syne, the Scottish New Year standard, arranged in four levels — from a single-note melody up to a choir texture with glissandi. Each level adds exactly one new technique on top of the last.",
      vi: "Auld Lang Syne — bài ca đón năm mới gốc Scotland — chuyển soạn bốn cấp, từ giai điệu đơn lên tới kết cấu dàn đồng ca có nhấn và lướt. Mỗi cấp thêm đúng một kỹ thuật mới.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
      { image: "img-4.png" },
      { image: "img-5.png" },
      { image: "img-6.png" },
      { image: "img-7.png" },
      { image: "img-8.png" },
    ],
    videos: [
      { label: "Level 1: Lòng Bản – Single Note Melody", id: "Gc5GfrGG7bE", signal: { head: "level", num: "1" } },
      { label: "Level 2: Adding Á Glissandi to the Single Note Melody", id: "GaZxlagYwx8", signal: { head: "level", num: "2" } },
      { label: "Level 3: Like a Choir, each melodic note is accompanied by another one an octave", id: "Lboq_0fuMcc", signal: { head: "level", num: "3" } },
      { label: "Level 4: Adding the Á Glissandi to the Octaves", id: "Hrf9k2CIWDQ", signal: { head: "level", num: "4" } },
    ],
  },
  {
    slug: "yellow-submarine",
    vi: "Tàu Ngầm Vàng",
    en: "Yellow Submarine",
    region: { en: "The Beatles · 1966", vi: "The Beatles · 1966" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "The Beatles' Yellow Submarine on đàn tranh. A cheerful, easy-to-remember melody that doubles as a right-hand rhythm exercise — stepping through one, two, three, and four strings.",
      vi: "Yellow Submarine của The Beatles chuyển soạn cho đàn tranh — giai điệu vui tai dễ nhớ, đồng thời là bài tập nhịp cho tay phải.",
    },
    tablatures: [
      { image: "overview.png" },
    ],
    videos: [
      { label: "1. Tuning", id: "S4ZeoGwTGDM", signal: { head: "", num: "1. Tuning" } },
      { label: "2. One String “Yellow Submarine”", id: "U_vSsVV2BSY", signal: { head: "video", num: "02" } },
      { label: "3. Two Strings “In the Town”", id: "6O6vNE2LZO4", signal: { head: "video", num: "03" } },
      { label: "4. Three Strings “When I Was Born”", id: "Zu8MZOm0Hzg", signal: { head: "video", num: "04" } },
      { label: "5. Four Strings “Lived a Man”", id: "eZTzoEgPYRg", signal: { head: "video", num: "05" } },
      { label: "6. Four Strings “Who Sailed to Sea”", id: "Lh3Pm8J4MMI", signal: { head: "video", num: "06" } },
      { label: "7. Four Strings “We All Lived in a Yellow Submarine”", id: "to_C3iULNBs", signal: { head: "video", num: "07" } },
    ],
  },
  {
    slug: "beo-giat-may-troi",
    vi: "Bèo Giạt Mây Trôi",
    en: "Tumbling Fern & Wandering Cloud",
    region: { en: "North Vietnam · folk song", vi: "Dân ca Bắc Bộ" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Bèo Giạt Mây Trôi is a northern Vietnamese folk song whose imagery — floating duckweed and drifting clouds — carries the longing of two separated lovers. The arrangement leans on slow left-hand ornaments.",
      vi: "Bèo Giạt Mây Trôi là dân ca Bắc Bộ, hình ảnh bèo trôi mây giạt chở nỗi nhớ của đôi tình nhân xa cách. Bản đàn tranh khai thác hoa tay trái chậm rãi.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
    ],
    videos: [
      { label: "Kiểu Đàn Thong Dong – Leisurely Styel", id: "pXqVXovdtsk", signal: { head: "video", num: "01" } },
      { label: "Kiểu Đàn Hoạt Bát – Lively Style", id: "B392v8ZOUvM", signal: { head: "video", num: "02" } },
      { label: "In-Tempo Play-Along Track", id: "F7Rr2g8_s0U", signal: { head: "video", num: "03" } },
    ],
  },
  {
    slug: "thang-cuoi",
    vi: "Thằng Cuội",
    en: "Lad Cuội",
    region: { en: "Lê Thương · children's song", vi: "Lê Thương · nhạc thiếu nhi" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Lê Thương's children's song about the legendary boy Cuội, who sits under a banyan tree on the moon. Sung every mid-autumn festival. Short, singable, and a gentle introduction to đàn tranh vibrato.",
      vi: "Thằng Cuội của Lê Thương — bài ca thiếu nhi Tết Trung Thu về chàng Cuội ngồi dưới gốc đa trên cung trăng. Ngắn, dễ hát, dễ đàn.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
    ],
    videos: [
      { label: "No Vibratos – Không Láy", id: "NYWyFnu37Hk", signal: { head: "video", num: "01" } },
      { label: "With Vibratos – Có Láy", id: "Icwr9q5gnvI", signal: { head: "video", num: "02" } },
    ],
  },
  {
    slug: "ru-con-mien-nam",
    vi: "Ru Con Miền Nam",
    en: "A Lullaby of Southern Vietnam",
    region: { en: "South Vietnam · lullaby", vi: "Nam Bộ · hát ru" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "Ru Con is the southern Vietnamese lullaby form — slow, spacious, and entirely about the swinging cradle. This setting leans on sustained left-hand bending to carry the rocking feel.",
      vi: "Ru Con là điệu hát ru Nam Bộ — chậm, thưa, mở rộng, toàn bộ nhịp là nhịp võng đưa. Bản soạn dựa vào nhấn tay trái kéo dài để giữ được cái lắc lư của lời ru.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
    ],
    videos: [
      { label: "Tentative translation", id: "md_APUaUQF8", signal: { head: "video", num: "01" } },
      { label: "Strings 7(V)-6-4", id: "zb4WdiEP2jQ", signal: { head: "video", num: "02" } },
      { label: "Strings (optional 8)–7(V)-6-4", id: "C1oK8ZpxP5A", signal: { head: "video", num: "03" } },
      { label: "Strings 7(V)-6-5-4", id: "0GPvajprdRU", signal: { head: "video", num: "04" } },
      { label: "Strings 9-8(B)8-7(V)", id: "HhgrNLK_zAc", signal: { head: "video", num: "05" } },
      { label: "Strings 8(B)8-4", id: "4Ghrh5wwHds", signal: { head: "video", num: "06" } },
      { label: "Strings 8(B)8-4", id: "8FXgNXhiV3M", signal: { head: "video", num: "07" } },
      { label: "Strings 9-8(B)8", id: "YcOMhVMwq2o", signal: { head: "video", num: "08" } },
      { label: "Strings 9-8(B)8-7(V)", id: "Uivp9_zypZY", signal: { head: "video", num: "09" } },
      { label: "Strings 9-8(B)8-7(V)-6", id: "-f3vNkuftCQ", signal: { head: "video", num: "10" } },
      { label: "Strings 8(B)8-7(V)-6-4", id: "CrvsGCIHZQ0", signal: { head: "video", num: "11" } },
      { label: "Strings 8(B)8-7(V)-6-4", id: "o9Hy-7IYoWM", signal: { head: "video", num: "12" } },
      { label: "Strings 7-6-5-4(B)4", id: "Nsh3ECSKOJ0", signal: { head: "video", num: "13" } },
      { label: "Strings 7-5-4(B)4-3(B)3", id: "TSpR3LrWIYE", signal: { head: "video", num: "14" } },
    ],
  },
  {
    slug: "ly-muoi-thuong",
    vi: "Lý Mười Thương / Lý Tình Tang",
    en: "10 Reasons to Fall in Love with a Huế Girl",
    region: { en: "Central Vietnam · folk song", vi: "Dân ca miền Trung · Huế" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Lý Mười Thương lists ten things to love about a Huế girl — her hair, her conical hat, her voice, her walk. The melody uses the distinctive central Vietnamese ornament family.",
      vi: "Lý Mười Thương liệt kê mười điều thương của o gái Huế — mái tóc, nón lá, giọng nói, dáng đi. Giai điệu dùng hệ hoa tay đặc trưng miền Trung.",
    },
    tablatures: [
      { image: "overview.png" },
    ],
    videos: [
      { label: "Whole Song Play-Along with Đàn Tranh Tablature", id: "6E7pem77uks", signal: { head: "video", num: "01" } },
      { label: "Whole Song Play-Along with Đàn Tranh Tablature", id: "kD3VJHDPS6w", signal: { head: "video", num: "02" } },
      { label: "Vuốt Gliding Exercises", id: "msmot39EfGI", signal: { head: "video", num: "03" } },
      { label: "Vuốt Gliding Exercises", id: "jVaiRDcix4w", signal: { head: "video", num: "04" } },
      { label: "Vuốt Gliding Exercises", id: "NrKSsFyEZVw", signal: { head: "video", num: "05" } },
      { label: "Vuốt Gliding Exercises", id: "JrjLjG5M5HQ", signal: { head: "video", num: "06" } },
      { label: "Vuốt Gliding Exercises", id: "OZBOYO9iPdM", signal: { head: "video", num: "07" } },
      { label: "Performance Tempo Play-Along Track", id: "z-P4rVsfq8M", signal: { head: "video", num: "08" } },
    ],
  },
  {
    slug: "dont-worry-be-happy",
    vi: "Don't Worry, Be Happy",
    en: "Don't Worry, Be Happy",
    region: { en: "Bobby McFerrin · 1988", vi: "Bobby McFerrin · 1988" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "Bobby McFerrin's Don't Worry Be Happy arranged for đàn tranh. The whole piece is one repeating groove — perfect for drilling right-hand rhythm without fighting a changing melody.",
      vi: "Don't Worry Be Happy của Bobby McFerrin chuyển soạn cho đàn tranh. Cả bài là một groove lặp — lý tưởng để tập nhịp tay phải mà không phải theo giai điệu đổi liên tục.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
    ],
    videos: [
      { label: "Full Song Play-Along with Đàn Tranh Tablature", id: "vgITDcNibXM", signal: { head: "video", num: "01" } },
      { label: "Full Song Play-Along with Đàn Tranh Tablature", id: "uD-GZ1GLt1Y", signal: { head: "video", num: "02" } },
      { label: "Index Finger Training (Exercises 1-5)", id: "9LAqPWNszz0", signal: { head: "video", num: "03" } },
      { label: "Index Finger Training (Exercises 1-5)", id: "pjoCOHVJDnI", signal: { head: "video", num: "04" } },
      { label: "Index Finger Training (Exercises 1-5)", id: "wCBg6_GJ-0k", signal: { head: "video", num: "05" } },
      { label: "Index Finger Training (Exercises 1-5)", id: "vsz6ZgUS0Tw", signal: { head: "video", num: "06" } },
      { label: "Index Finger Training (Exercises 1-5)", id: "OF6kIbGDafA", signal: { head: "video", num: "07" } },
      { label: "Thumb Training (Exercises 6-10)", id: "Qa-FnKRBku0", signal: { head: "video", num: "08" } },
      { label: "Thumb Training (Exercises 6-10)", id: "Uurk1iZRWyY", signal: { head: "video", num: "09" } },
      { label: "Thumb Training (Exercises 6-10)", id: "JQW1dQ9GuqM", signal: { head: "video", num: "10" } },
      { label: "Thumb Training (Exercises 6-10)", id: "dyjQVgqAQC4", signal: { head: "video", num: "11" } },
      { label: "Thumb Training (Exercises 6-10)", id: "9TNDUvE1704", signal: { head: "video", num: "12" } },
      { label: "Middle Finger Training (Exercises 11-15) – Optional", id: "iYyRX4MBFCg", signal: { head: "video", num: "13" } },
      { label: "Middle Finger Training (Exercises 11-15) – Optional", id: "33otTL_niso", signal: { head: "video", num: "14" } },
      { label: "Middle Finger Training (Exercises 11-15) – Optional", id: "ZLeyDhVwV0E", signal: { head: "video", num: "15" } },
      { label: "Middle Finger Training (Exercises 11-15) – Optional", id: "N24VKQRi21Q", signal: { head: "video", num: "16" } },
      { label: "Middle Finger Training (Exercises 11-15) – Optional", id: "76FDzpNGTbA", signal: { head: "video", num: "17" } },
      { label: "Thumb – Index Finger Coordition (Exercises 11-15) – Leading to “Don’t Worry, Be ", id: "RiDHu4BWiME", signal: { head: "video", num: "18" } },
      { label: "Thumb – Index Finger Coordition (Exercises 11-15) – Leading to “Don’t Worry, Be ", id: "e3eTdOUgQfY", signal: { head: "video", num: "19" } },
      { label: "Thumb – Index Finger Coordition (Exercises 11-15) – Leading to “Don’t Worry, Be ", id: "b54IzbiPtmk", signal: { head: "video", num: "20" } },
    ],
  },
  {
    slug: "shotgun",
    vi: "Shotgun",
    en: "Shotgun",
    region: { en: "George Ezra · 2018", vi: "George Ezra · 2018" },
    thumbnail: "thumbnail.jpeg",
    blurb: {
      en: "George Ezra's Shotgun on đàn tranh. A modern pop hook that sits cleanly on Vietnamese pentatonic strings — the arrangement is a bridge between new pop vocabulary and the traditional instrument.",
      vi: "Shotgun của George Ezra chơi trên đàn tranh. Câu hook pop hiện đại vừa khít với ngũ cung Việt — bản soạn là cây cầu nối vốn nhạc pop mới với nhạc cụ truyền thống.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
    ],
    videos: [
      { label: "Video", id: "v_B3qkp4nO4", signal: { head: "", num: "Video" } },
      { label: "Đàn Tranh’s Demo – Full Song", id: "qGyNfX7b_gw", signal: { head: "video", num: "02" } },
    ],
  },
  {
    slug: "co-la",
    vi: "Cò Lả",
    en: "Soaring Stork",
    region: { en: "North Vietnam · folk song", vi: "Dân ca Bắc Bộ" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Cò Lả is a northern Vietnamese folk song about a stork flying across the rice fields. The phrase-by-phrase videos break the melody into practice-sized chunks for beginners.",
      vi: "Cò Lả là dân ca Bắc Bộ tả cánh cò bay trên đồng lúa. Chuỗi video tách bài thành từng phrase nhỏ để người mới tập từng đoạn một.",
    },
    tablatures: [
      { image: "overview.png" },
    ],
    videos: [
      { label: "Demo 1: Cò Lả in C Đàn Tranh Without Luyến Láy with Thu Huyền Sing & Tablature I", id: "_v2G3cjws2o", signal: { head: "video", num: "01" } },
      { label: "Demo 2: Cò Lả in C Đàn Tranh With Luyến Láy Thu and Huyền Singing with Tablature", id: "WEqI7Kc_BjE", signal: { head: "video", num: "02" } },
      { label: "Demo 3: Cò Lả in C – Đàn Tranh Luyến Láy Tự Do with Tablature In Tempo", id: "3OXwY9WWFlQ", signal: { head: "video", num: "03" } },
      { label: "– RH techniques with just black thick lines.– Adding gliding/bending with red li", id: "Ta0PNCTiUJ8", signal: { head: "video", num: "04" } },
      { label: "Looped P1 No Luyến Láy", id: "wTmwt3UXQVE", signal: { head: "video", num: "05" } },
      { label: "Looped P1 No Luyến Láy", id: "2fnrVobgzhQ", signal: { head: "video", num: "06" } },
      { label: "Looped P1 Backing Track", id: "Yn5p3d3dNDs", signal: { head: "video", num: "07" } },
      { label: "Looped P2 No Luyến Láy", id: "KSmJaaIHsgg", signal: { head: "video", num: "08" } },
      { label: "Looped P2 No Luyến Láy", id: "f4SNl9v2pFw", signal: { head: "video", num: "09" } },
      { label: "Looped P2 Backing Track", id: "GXnyoppa3RM", signal: { head: "video", num: "10" } },
      { label: "Looped P3 No Luyến Láy", id: "GMLy67HI0ss", signal: { head: "video", num: "11" } },
      { label: "Looped P3 No Luyến Láy", id: "ZdjMi4MEB-U", signal: { head: "video", num: "12" } },
      { label: "Looped P3 Backing Track", id: "6xGhER4hT4E", signal: { head: "video", num: "13" } },
      { label: "Looped P4 No Luyến Láy", id: "L1CbZFZJwwQ", signal: { head: "video", num: "14" } },
      { label: "Looped P4 No Luyến Láy", id: "6Ff3TT3mVMg", signal: { head: "video", num: "15" } },
      { label: "Looped P4 Backing Track", id: "QXtB7iviW04", signal: { head: "video", num: "16" } },
      { label: "Looped P5 No Luyến Láy", id: "HiHKpSJ6hfw", signal: { head: "video", num: "17" } },
      { label: "Looped P5 No Luyến Láy", id: "n199vpbpV78", signal: { head: "video", num: "18" } },
      { label: "Looped P5 Backing Track", id: "XUn2yrnLk90", signal: { head: "video", num: "19" } },
      { label: "Looped P6 No Luyến Láy", id: "GLeEh9MerNU", signal: { head: "video", num: "20" } },
      { label: "Looped P6 No Luyến Láy", id: "FA28l4PX0yY", signal: { head: "video", num: "21" } },
      { label: "Looped P6 Backing Track", id: "SR-ba8W6mMs", signal: { head: "video", num: "22" } },
      { label: "Looped P7 No Luyến Láy", id: "oCvxOgFprok", signal: { head: "video", num: "23" } },
      { label: "Looped P7 No Luyến Láy", id: "ouFYXUU9ox4", signal: { head: "video", num: "24" } },
      { label: "Looped P7 Backing Track", id: "XNNz0TmkRLY", signal: { head: "video", num: "25" } },
      { label: "Looped P8 No Luyến Láy", id: "7knO2O-xTtQ", signal: { head: "video", num: "26" } },
      { label: "Looped P8 No Luyến Láy", id: "ZyrIBuVFeFo", signal: { head: "video", num: "27" } },
      { label: "Looped P8 Backing Track", id: "v3kSKesMqw4", signal: { head: "video", num: "28" } },
    ],
  },
  {
    slug: "ly-qua-keu",
    vi: "Lý Quạ Kêu",
    en: "The Raven's Caw",
    region: { en: "South Vietnam · folk song", vi: "Dân ca Nam Bộ" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Lý Quạ Kêu imitates the raven's call through staccato phrasing and sharp left-hand attacks. Presented here in four tablature sections, plus four octave-extended sections for advanced players.",
      vi: "Lý Quạ Kêu mô phỏng tiếng quạ kêu bằng cách đánh rời rạc và nhấn tay trái sắc. Chia thành bốn đoạn tablature cơ bản và bốn đoạn mở rộng quãng tám cho người chơi nâng cao.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
      { image: "img-4.png" },
      { image: "img-5.png" },
      { image: "img-6.png" },
      { image: "img-7.png" },
      { image: "img-8.png" },
    ],
    videos: [
      { label: "Đàn Tranh Demonstration", id: "3UmbOBbM1D4", signal: { head: "video", num: "01" } },
    ],
  },
  {
    slug: "ly-cay-bong",
    vi: "Lý Cây Bông",
    en: "Song of Flowers",
    region: { en: "South Vietnam · folk song", vi: "Dân ca Nam Bộ" },
    thumbnail: "thumbnail.png",
    blurb: {
      en: "A playful southern folk song naming the flowers in a girl's garden — bông xanh, bông trắng, bông vàng. Light, fast, and easy on the right hand — a good first southern piece.",
      vi: "Lý Cây Bông là bài lý Nam Bộ vui tươi kể tên các loài hoa trong vườn cô gái. Nhẹ, nhanh, nhẹ tay phải — bài vào cửa Nam Bộ tốt.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
    ],
    videos: [
      { label: "Whole Song Demonstration", id: "CzXynhU4q40", signal: { head: "video", num: "01" } },
      { label: "Practice each phrase as it’s looped.", id: "Ty9oekS4-Qs", signal: { head: "video", num: "02" } },
      { label: "Practice each phrase as it’s looped.", id: "Id6su6Z3rI4", signal: { head: "video", num: "03" } },
      { label: "Practice each phrase as it’s looped.", id: "nAuaQrR2zY4", signal: { head: "video", num: "04" } },
      { label: "Practice each phrase as it’s looped.", id: "aAGd6jx0EGU", signal: { head: "video", num: "05" } },
      { label: "Practice each phrase as it’s looped.", id: "0FV39jP9Rks", signal: { head: "video", num: "06" } },
    ],
  },
  {
    slug: "roar",
    vi: "Roar",
    en: "Roar",
    region: { en: "Katy Perry · 2013", vi: "Katy Perry · 2013" },
    thumbnail: "thumbnail.jpg",
    blurb: {
      en: "Roar by Katy Perry arranged for đàn tranh. Presented as six tablature sections — the pop anthem broken into digestible phrases that a new player can sight-read.",
      vi: "Roar của Katy Perry chuyển soạn cho đàn tranh, chia thành sáu đoạn tablature — bài anthem pop được tách thành từng phrase ngắn cho người mới đọc bản.",
    },
    tablatures: [
      { image: "overview.png" },
      { image: "img-2.png" },
      { image: "img-3.png" },
      { image: "img-4.png" },
    ],
  },
];
