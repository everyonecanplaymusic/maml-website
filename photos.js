// photos.js — single source of truth for the Photos collage.
//
// The only data here is the filename list (PHOTO_FILES). Captions
// are derived from the filename at runtime by labelFromFilename(),
// so adding a new photo is one line in the array. Any file that
// has a descriptive name gets a real label; files with only camera
// codes (img_1607.jpg, dsc4727.jpg) fall back to a minimal label.
//
// photos.html builds one .pa-item per entry and the cycle engine
// (inline in photos.html) handles spotlight + stage zoom.

window.PHOTO_FILES = [
  "0227161310.jpg",
  "0815151150.jpg",
  "11.24_features_vietnamprof_quangdo_03-1.jpg",
  "2015-dan-tranhs-workshops-hosted-by-mekong-at-mekong-office-bronx-new-york-city.jpg",
  "2018-dan-tranhs-accessory-gift.jpg",
  "2018-meeting-vietnamese-ambassador-nguyen-phuong-nga-and-artist-mai-tuyet-hoa.jpg",
  "2018-presentation-at-the-5th-nafosted-conference-on-information-and-computer-science-ho-chi-minh-city-viet-nam.jpg",
  "2018-traditional-vietnamese-instrument-performance-at-soulful-vietname-hosted-by-vietnamese-traveling-ministry-washington-d.c..jpg",
  "2018-traditional-vietnamese-instrument-performance-through-folk-songs-and-folks-story-at-lunar-new-year-celebration-hosted-by-charles-b.-wang-center-long-island.jpg",
  "2018-vietnamese-language-table-at-lunar-new-year-celebration-hosted-by-new-york-historical-society-new-york-city.jpg",
  "2018-visit-artist-ha-thi-caus-home-ninh-binh-viet-nam.jpg",
  "20180517_164539_d800.jpg",
  "2019-commuting-to-dan-tranh-performance-under-the-snow-union-square-new-york-city.jpg",
  "2019-comparative-international-education-society-63rd-annual-conference-2-san-francisco.jpg",
  "2019-comparative-international-education-society-63rd-annual-conference-san-francisco.jpg",
  "2019-dan-tranh-performance-2-at-folk-arts-charter-school-philadelphia.jpg",
  "2019-dan-tranh-performance-at-folk-arts-charter-school-philadelphia.jpg",
  "2019-dan-tranh-performance-at-temple-university-with-folk-arts-charter-schools-students-philadelphia-edited.jpg",
  "2019-dan-tranh-performance-at-temple-university-with-folk-arts-charter-schools-students-philadelphia.jpg",
  "2019-dan-tranh-performance-by-folk-arts-charter-schools-students-philadelphia.jpg",
  "2019-dan-tranh-shipped-from-vietname-ready-for-students.jpg",
  "2019-dan-tranh-shipped-from-vietname.jpg",
  "2019-dan-tranhs-workshops-2-hosted-by-mekong-at-visiting-center-of-poe-park-new-york-city.jpg",
  "2019-dan-tranhs-workshops-3-hosted-by-mekong-at-visiting-center-of-poe-park-new-york-city.jpg",
  "2019-dan-tranhs-workshops-4-hosted-by-mekong-at-visiting-center-of-poe-park-new-york-city.jpg",
  "2019-dan-tranhs-workshops-5-hosted-by-mekong-at-visiting-center-of-poe-park-new-york-city.jpg",
  "2019-dan-tranhs-workshops-hosted-by-mekong-at-visiting-center-of-poe-park-new-york-city.jpg",
  "2019-ice-breaker-1-at-summer-chamber-workshop-at-teachers-college-columbia-university.jpg",
  "2019-ice-breaker-2-at-summer-chamber-workshop-at-teachers-college-columbia-university.jpg",
  "2019-poster-of-summer-chamber-workshop-at-teachers-college-columbia-university.jpg",
  "2019-presentation-2-at-vietnam-global-leader-forum-paris-france.jpg",
  "2019-presentation-at-vietnam-global-leader-forum-paris-france.jpg",
  "2019-recording-at-computer-music-center-columbia-university.jpg",
  "2019-rehearsal-schedule-summer-chamber-workshop-at-teachers-college-columbia-university-1.jpg",
  "2019-students-visit-dan-tranhs-workshop-at-visiting-center-poes-park-new-york-city-1.jpg",
  "2019-traditional-instrument-performance-2-at-lunar-new-year-celebration-hosted-by-council-member-daniel-dromm-1.jpg",
  "2019-traditional-instrument-performance-at-lunar-new-year-celebration-hosted-by-council-member-daniel-dromm-1.jpg",
  "2019-traditional-vietnamese-instrument-performance-at-lunar-new-year-celebration-hosted-by-mekong-new-york-city-1.jpg",
  "2019-traditional-vietnamese-instrument-zoo-petting-at-lunar-new-year-celebration-hosted-by-mekong-new-york-city.jpg",
  "2019-vietnamese-calligraphy-table-at-lunar-new-year-celebration-hosted-by-mekong-new-york-city-2.jpg",
  "2019-vietnamese-language-station-at-lunar-new-year-celebration-hosted-by-mekong-new-york-city.jpg",
  "2020-dan-tranhs-workshops-hosted-by-mekong-at-visiting-center-of-poe-park-new-york-city-2.jpg",
  "2020-vietnamese-calligraphy-table-at-lunar-new-year-celebration-hosted-by-mekong-new-york-city-1.jpg",
  "2022-dan-tranh-class-hosted-by-mekong-outdoor-practice-central-parkpark-new-york-city.jpg",
  "2022-mekong-10th-anniversary-performance-ly-ngua-o.jpeg",
  "2022-testing-out-multi-cam-recording-setup-a-very-light-set-new-york-city-2.jpg",
  "att.xq6nc4gwmqj_b9hwegcy24rzsy9rwb3nya0_989sgb0.jpg",
  "dan-tranh-hands-1.jpg",
  "dan-tranh-line-up-ywcm.jpg",
  "dsc4728.jpg",
  "dsc_3842-1.jpg",
  "dscn4570.jpg",
  "dscn4593.jpg",
  "image1.png",
  "img_1607.jpg",
  "img_1608.jpg",
  "img_1613.jpg",
  "img_1614.jpg",
  "img_1617.jpg",
  "img_1622.jpg",
  "img_1623.jpg",
  "img_1626.jpg",
  "img_1627.jpg",
  "img_1628.jpg",
  "img_20221224_102500.jpg",
  "img_20251006_130118.jpg",
  "img_20251006_133351.jpg",
  "img_2708.jpg",
  "img_4419.jpg",
  "img_4534.png",
  "img_4558.jpg",
  "img_4585.jpg",
  "img_4619.jpg",
  "img_4698.jpg",
  "img_4774.jpg",
  "img_5940.jpg",
  "img_5945.jpg",
  "img_8242.jpeg",
  "img_9267.jpg",
  "mekong-dan-tranh-fall-2023-12-17-session-8-annotated-2.png",
  "panal-poe-park-performance.jpeg",
  "pxl_20250126_001155909.jpg",
  "pxl_20250126_001158136.jpg",
  "pxl_20250126_001756974.jpg",
  "pxl_20250126_001809150.jpg",
  "pxl_20250126_001811320.jpg",
  "received_1303611410946808.jpeg",
  "received_6507509002603008.jpeg",
  "research_dsc00012.jpg",
  "team-anh-thu_phan_piano-edited.jpeg",
  "team-nhan_ngo_library-edited-2.jpeg",
];

// Light-touch diacritic restoration so labels read naturally in
// Vietnamese. Applied to the already-titlecased English text.
const VI_FIXES = [
  [/\bdan tranh\b/gi, "đàn tranh"],
  [/\bdan tranhs\b/gi, "đàn tranhs"],
  [/\bly ngua o\b/gi, "lý ngựa ô"],
  [/\bha thi cau\b/gi, "hà thị cầu"],
  [/\bninh binh\b/gi, "ninh bình"],
  [/\bviet nam(?!ese)\b/gi, "việt nam"],
  [/\bvietname\b/gi, "việt nam"],
  [/\bmai tuyet hoa\b/gi, "mai tuyết hoa"],
  [/\bnguyen phuong nga\b/gi, "nguyễn phương nga"],
  [/\bho chi minh\b/gi, "hồ chí minh"],
  [/\bnhan ngo\b/gi, "nhàn ngô"],
  [/\banh thu phan\b/gi, "anh-thư phan"],
];

function applyViFixes(s) {
  for (const [re, rep] of VI_FIXES) s = s.replace(re, rep);
  return s;
}

// Infer which thematic groups a photo belongs to by pattern-
// matching its filename. A single photo can appear in multiple
// groups (e.g. a 2019 dan-tranh performance at Temple University
// Philadelphia → "performance" + "philadelphia" + "temple"). The
// first matched group is treated as the primary for collage
// clustering. Groups used with <2 photos get filtered out at
// render time so the cycle never lands on a singleton.
window.inferPhotoGroups = function inferPhotoGroups(file) {
  const f = file.toLowerCase();
  const g = [];
  if (/ice-breaker|chamber-workshop|class-hosted|classroom/.test(f)) g.push("classroom");
  if (/pxl_20250126/.test(f)) g.push("classroom");
  if (/performance|mekong-10th|10th-anniversary|ly-ngua-o|panal-poe|dsc_3842/.test(f)) g.push("performance");
  if (/dan-tranhs-workshops|students-visit-dan-tranhs/.test(f)) g.push("workshop");
  if (/presentation|conference|nafosted|global-leader/.test(f)) g.push("conference");
  if (/lunar-new-year|calligraphy|zoo-petting/.test(f)) g.push("tet");
  if (/img_1607|img_1608|img_1613|img_1614|img_1617|img_1622|img_1623|img_1626|img_1627|img_1628/.test(f)) g.push("tet");
  if (/philadelphia|folk-arts-charter/.test(f)) g.push("philadelphia");
  if (/columbia-university|teachers-college/.test(f)) g.push("columbia");
  if (/temple-university/.test(f)) g.push("temple");
  if (/ha-thi-cau|visit-artist|ninh-binh|soulful-vietname/.test(f)) g.push("fieldwork");
  if (/^team-|features_vietnamprof|research_dsc/.test(f)) g.push("portrait");
  if (/dan-tranh-shipped|accessory|dan-tranh-hands|dan-tranh-line-up/.test(f)) g.push("instrument");
  if (/mekong/.test(f)) g.push("mekong");
  if (/recording-at-computer|multi-cam-recording|dscn457|dscn459|dsc4728|img_8242|poster-of-summer|rehearsal-schedule/.test(f)) g.push("studio");
  if (/poe-park|poes-park/.test(f)) g.push("poe-park");
  if (/^img_4(419|534|558|585|619|698|774)$|^img_20251006/.test(f)) g.push("recent");
  if (/received_|img_2708|att\./.test(f)) g.push("candid");
  if (g.length === 0) g.push("misc");
  return g;
};

// Turn a filename into a caption. The function is intentionally
// forgiving: descriptive names get a rich caption, generic camera
// names fall back to the file stem. Result is {year, text}.
window.labelFromFilename = function labelFromFilename(fname) {
  const base = fname.replace(/\.(jpg|jpeg|png)$/i, "");

  // 1. Descriptive kebab-case starting with a 4-digit year.
  const parts = base.split("-");
  if (parts.length >= 3 && /^20\d\d$/.test(parts[0])) {
    const year = parts[0];
    let text = parts.slice(1).join(" ").replace(/\s+/g, " ").trim();
    // Drop the "-edited", "-1", "-2" trailing tags that add noise.
    text = text.replace(/\s+(edited|\d+)$/g, "");
    text = applyViFixes(text);
    return { year, text };
  }

  // 2. pxl_YYYYMMDD_...
  let m = base.match(/^pxl_(\d{4})(\d{2})(\d{2})/);
  if (m) return { year: m[1], text: `pixel · ${m[3]}/${m[2]}` };

  // 3. img_YYYYMMDD_...
  m = base.match(/^img_(\d{4})(\d{2})(\d{2})/);
  if (m) return { year: m[1], text: `frame · ${m[3]}/${m[2]}` };

  // 4. YYYYMMDD_... (bare date prefix)
  m = base.match(/^(\d{4})(\d{2})(\d{2})_/);
  if (m) return { year: m[1], text: `frame · ${m[3]}/${m[2]}` };

  // 5. Short date like 0227161310 (MMDDYYHHMMSS or similar)
  m = base.match(/^0(\d)(\d{2})(\d{2})\d+$/);
  if (m) return { year: "20" + m[3], text: `frame · ${m[1]}/${m[2]}` };

  // 6. Known prefixes — light labels so they're not empty.
  if (/^mekong-dan-tranh-fall-2023/i.test(base)) {
    return { year: "2023", text: applyViFixes("mekong đàn tranh · fall, session 8") };
  }
  if (/^dan-tranh-hands/i.test(base)) {
    return { year: "—", text: applyViFixes("dan tranh hands") };
  }
  if (/^dan-tranh-line-up/i.test(base)) {
    return { year: "—", text: applyViFixes("dan tranh line-up") };
  }
  if (/^panal-poe-park/i.test(base)) {
    return { year: "—", text: "panel · poe park performance" };
  }
  if (/^team-/i.test(base)) {
    const who = base.replace(/^team-/, "").replace(/_/g, " ").replace(/-edited.*$/, "");
    return { year: "—", text: `team · ${applyViFixes(who)}` };
  }
  if (/^research_/i.test(base)) {
    return { year: "—", text: "research" };
  }

  // 7. Fallback: just show the stem, cleaned up.
  return { year: "—", text: base.replace(/[_\-.]+/g, " ").trim() };
};
