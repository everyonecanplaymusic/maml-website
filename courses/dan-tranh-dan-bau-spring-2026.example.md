<!--
  Schema example for courses.js. The real file is committed and
  deployed publicly — both the public page (courses.html) and
  the student page (courses-students.html) fetch from it, so
  editing it updates both views at once.

  Fill in:

  1. The blurb — everything above the table. Free-form markdown:
     any language, any number of paragraphs, with or without
     headings. The loader splits on the first table row, so no
     structural heading is required.

  2. The table rows — `topic`, `video_sun`, `video_thu`:
       topic      — short summary, lowercase, no trailing period
       video_sun  — youtube id for the sunday recording (not full url)
       video_thu  — youtube id for the thursday recording

  Class times are hardcoded in courses.js and derived from
  (instrument, day), so there is no time column to fill.

  The course password is NOT in this file — its sha256 hash lives
  in courses.js (see PASSWORD_HASH). Students type it into the
  modal that opens from the "I have a code" button on the public
  page. To rotate the password, recompute the hash with:
      printf "%s" "newpassword" | shasum -a 256
  and replace the constant in courses.js.
-->

Blurb paragraph one — describe what the course covers, who
teaches it, where it meets.

Blurb paragraph two — logistics, who can attend, instrument
loans, financial assistance.

| session | sun | thu | instrument | topic | video_sun | video_thu |
|---------|-----|-----|------------|-------|-----------|-----------|
| 1 | 2026-04-26 | 2026-04-30 | dan-tranh | session 1 topic |  |  |
| 1 | 2026-04-26 | 2026-04-30 | dan-bau   | session 1 topic |  |  |
