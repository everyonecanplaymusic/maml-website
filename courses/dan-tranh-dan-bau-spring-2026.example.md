<!-- password: your-password-here -->
<!--
  This file is the committed schema example for courses.js.

  Copy it to `dan-tranh-dan-bau-spring-2026.md` (same folder,
  without `.example`) and fill in:

  1. The password comment at the very top — any word or phrase,
     no spaces. Students type it into the Unlock form on the
     Courses page to reveal the YouTube links.

  2. The blurb — everything between the password comment and
     the first table row. Free-form markdown: any language, any
     number of paragraphs. The loader splits on the first table
     row, so no structural heading is required.

  3. The table rows — `topic`, `video_sun`, `video_thu`:
       topic      — short summary, lowercase, no trailing period
       video_sun  — youtube id for the sunday recording (not full url)
       video_thu  — youtube id for the thursday recording

  Class times are hardcoded in courses.js and derived from
  (instrument, day), so there is no time column to fill.

  The real md file is listed in .gitignore so it never lands in
  the commit history. The site fetches it at runtime from the
  same path.
-->

Blurb paragraph one — describe what the course covers, who
teaches it, where it meets.

Blurb paragraph two — logistics, who can attend, instrument
loans, financial assistance.

| session | sun | thu | instrument | topic | video_sun | video_thu |
|---------|-----|-----|------------|-------|-----------|-----------|
| 1 | 2026-04-26 | 2026-04-30 | dan-tranh | session 1 topic |  |  |
| 1 | 2026-04-26 | 2026-04-30 | dan-bau   | session 1 topic |  |  |
