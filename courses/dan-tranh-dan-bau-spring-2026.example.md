<!--
  Schema example for a course md file. The real files are committed
  and deployed publicly — the public page (courses.html), the student
  page (courses-students.html) and the teacher page
  (courses-teacher.html) all fetch the md of the course they show,
  so editing it updates every view at once.

  Which md belongs to which course, and everything that is NOT in
  the md — flyer, class days, class times, address, prices, codes —
  lives in courses-data.js (one registry entry per course).

  Fill in:

  1. The blurb — everything above the table. Free-form markdown:
     any language, any number of paragraphs, with or without
     headings. The loader splits on the first table row, so no
     structural heading is required.

  2. The table rows. The day columns are the course's `days` from
     courses-data.js — `sun`/`thu` below; a Saturday + Monday course
     uses `sat`/`mon` and `video_sat`/`video_mon`.
       topic       — short summary, lowercase, no trailing period
                     (inline markdown such as *title* is fine)
       video_<day> — youtube id of that day's recording (not full url)
     A row whose session cell is `break` is a no-class week: give its
     dates, leave instrument empty, and put the label in topic.

  Class times come from courses-data.js, derived from
  (instrument, day), so there is no time column to fill.

  The course codes are NOT in this file — their sha256 hashes live
  in courses-data.js (studentHash / teacherHash). Students type the
  code into the modal that opens from the "I have a code" button on
  the public page. To rotate a code, recompute the hash with:
      printf "%s" "newpassword" | shasum -a 256
  and replace it in the course's registry entry.
-->

Blurb paragraph one — describe what the course covers, who
teaches it, where it meets.

Blurb paragraph two — logistics, who can attend, instrument
loans, financial assistance.

| session | sun | thu | instrument | topic | video_sun | video_thu |
|---------|-----|-----|------------|-------|-----------|-----------|
| 1 | 2026-04-26 | 2026-04-30 | dan-tranh | session 1 topic |  |  |
| 1 | 2026-04-26 | 2026-04-30 | dan-bau   | session 1 topic |  |  |
| break | 2026-05-03 | 2026-05-07 |  | holiday — no class |  |  |
