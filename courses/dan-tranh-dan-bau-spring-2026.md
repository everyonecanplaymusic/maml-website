<!--
  This file drives the public courses page and the student page.

  Structure:

    1. Blurb (everything above the first table row).
       Free-form markdown — any language, any number of paragraphs.

    2. Schedule table. Fill in:
         topic      — short summary, lowercase, no trailing period.
                      One short line each — the long write-up goes
                      in the per-session detail section below.
         video_sun  — youtube id for the sunday recording (not full url)
         video_thu  — youtube id for the thursday recording

    3. Per-session detail sections, keyed by an H2:

         ## session N · shared       — music in general +
                                       song knowledge.
                                       Rendered ONCE per session
                                       (applies to both classes).
         ## session N · dan-tranh    — đàn tranh-specific
                                       technique + homework.
         ## session N · dan-bau      — đàn bầu-specific
                                       technique + homework.

       The renderer surfaces "shared" between the session header
       and the two instrument rows, and surfaces each instrument
       block as a "technique & homework" toggle under that row.

  Class times are hardcoded in courses.js, so there is no time
  column. Anyone who curls this file can read the video IDs —
  that is expected, since the YouTube videos themselves are
  unlisted (URL-as-token semantics). The course password is NOT
  stored here; its sha256 lives in courses.js.
-->

Mekong NYC hosts two parallel classes — **đàn tranh** and **đàn
bầu** — in one room, on the same evening. Each session weaves
together folk story, regional history, group listening, and
group musicianship that lets each instrument speak in its own
voice. *Mekong NYC tổ chức hai lớp song song dạy đàn tranh và
đàn bầu. Mỗi buổi đan xen kể chuyện dân gian, lịch sử vùng
miền, chơi và nghe cùng nhau, và phần nhạc lý nhóm bám theo
cách từng cây đàn lên tiếng.*

Every session is taught twice — once Sunday, once Thursday —
with identical content. Pick a fixed day or alternate. No
prerequisite; everyone is welcome. Instruments can be loaned
from Mekong NYC; tuition assistance available on request.
*Mỗi session được dạy hai lần — một buổi chủ nhật, một buổi
thứ năm — với nội dung y nhau. Học viên có thể chọn một ngày
cố định hoặc xen kẽ. Không cần nền tảng, mọi người đều được
chào đón. Đàn có thể mượn từ Mekong NYC. Có hỗ trợ học phí
khi cần.*

### the eight-week arc · *cấu trúc tám tuần*

Each session is **three layers** woven together: *Mỗi buổi
gồm ba lớp đan vào nhau:*

- **music in general** *(nhạc lý chung)* — scale, listening,
  rhythm, ornament. **Shared** between đàn tranh and đàn bầu.
- **song knowledge** *(kiến thức bài bản)* — what the piece
  is, where it comes from, how it's structured. **Shared.**
- **instrument-specific** *(kỹ thuật riêng)* — hand technique,
  drills, ornaments. **Different** for each class — đàn bầu
  needs more groundwork up front, so its progression is its
  own.

The page mirrors that structure. Each session shows a
**shared block** *(music + song knowledge)* once, then an
**đàn tranh** row and an **đàn bầu** row, each with their
own technique notes and homework. *Trang web phản ánh cấu
trúc này — phần chung mỗi buổi hiện một lần, sau đó là phần
riêng cho mỗi đàn.*

- **Part 1 — foundations** *(weeks 1–2)* · *Phần 1 — nền tảng.*
  Tuning, posture, first sound, and our first piece together:
  *Để Gió Cuốn Đi*. *Lên dây, tư thế, tiếng đầu, và bài đầu
  tiên: Để Gió Cuốn Đi.*
- **Part 2 — Vọng Cổ** *(weeks 3–7)* · *Phần 2 — Vọng Cổ.*
  The heartbeat of southern Vietnamese music — six **câu**,
  one or two per week, plus your personal **rao**. *Để Gió
  Cuốn Đi* returns lightly as a warm-up. *Bài tổ của đàn ca
  tài tử miền Nam — sáu câu, mỗi tuần một hoặc hai câu, cộng
  thêm rao riêng của bạn.*
- **Part 3 — review & sharing** *(week 8)* · *Phần 3 — ôn tập
  & chia sẻ.* No new material. Each student plays one piece;
  short reflection; group photo; what's next. *Không học bài
  mới. Mỗi học viên chơi một bài; cùng nhìn lại; chụp hình
  chung; tiếp theo là gì.*

Improvisation is woven in from week one, denser each week,
until each student has their own rao by week 7. *Khuyến khích
ngẫu hứng từ tuần một, dày dần qua từng tuần.*

| session | sun | thu | instrument | topic | video_sun | video_thu |
|---------|-----|-----|------------|-------|-----------|-----------|
| 1 | 2026-04-26 | 2026-04-30 | dan-tranh | tuning, three hand shapes, first four notes of *để gió cuốn đi* |  | MbGsCi6xCHA |
| 1 | 2026-04-26 | 2026-04-30 | dan-bau   | tuning to c3, finding the 1/2 · 1/3 · 1/4 nodes, right hand alone |  | 1zfl6VaKnGQ |
| 2 | 2026-05-03 | 2026-05-07 | dan-tranh | full *để gió cuốn đi*, left-hand pressure, your first short song |  |  |
| 2 | 2026-05-03 | 2026-05-07 | dan-bau   | both hands together, simple melody, mimicking the human voice |  |  |
| 3 | 2026-05-10 | 2026-05-14 | dan-tranh | entering vọng cổ — pentatonic feel + câu 1 |  |  |
| 3 | 2026-05-10 | 2026-05-14 | dan-bau   | entering vọng cổ — sliding between nodes + câu 1 |  |  |
| 4 | 2026-05-17 | 2026-05-21 | dan-tranh | vọng cổ câu 2 + câu 3 — building the line |  |  |
| 4 | 2026-05-17 | 2026-05-21 | dan-bau   | vọng cổ câu 2 + câu 3 — phrasing through slides |  |  |
| 5 | 2026-05-24 | 2026-05-28 | dan-tranh | vọng cổ câu 4 + your first **rao** |  |  |
| 5 | 2026-05-24 | 2026-05-28 | dan-bau   | vọng cổ câu 4 + your first **rao** — leaning into the singing voice |  |  |
| 6 | 2026-05-31 | 2026-06-04 | dan-tranh | vọng cổ câu 5 + câu 6 — closing the cycle |  |  |
| 6 | 2026-05-31 | 2026-06-04 | dan-bau   | vọng cổ câu 5 + câu 6 — vibrato through the bending stick |  |  |
| 7 | 2026-06-07 | 2026-06-11 | dan-tranh | full vọng cổ at slow tempo, polish your personal rao |  |  |
| 7 | 2026-06-07 | 2026-06-11 | dan-bau   | full vọng cổ at slow tempo, polish your personal rao |  |  |
| 8 | 2026-06-14 | 2026-06-18 | dan-tranh | review & sharing — each student plays one piece |  |  |
| 8 | 2026-06-14 | 2026-06-18 | dan-bau   | review & sharing — each student plays one piece |  |  |

## session 1 · theme

**Part 1 · first contact with the instrument**

*Phần 1 · gặp đàn lần đầu*

## session 1 · shared

### music in general · *nhạc lý chung*

- **String physics — what makes a note higher or lower.**
  Two rules apply to both đàn tranh and đàn bầu: *Hai luật
  chung cho cả hai đàn:*
    1. **Longer string = lower pitch.** *Dây dài hơn → trầm
       hơn. Dây ngắn hơn → cao hơn.* That's why the longest
       string of đàn tranh sits at the **top** of the tuner
       screen — it's the lowest. *Đó là lý do dây dài nhất
       của đàn tranh hiển thị ở đỉnh tuner.*
    2. **Tighter string = higher pitch.** *Dây căng hơn → cao
       hơn. Dây chùng → trầm hơn.* Tuning is just adjusting
       tension. *Lên dây là điều chỉnh độ căng.*
- **Arm alignment.** Arms **relaxed** — not tucked tight
  against your ribs, not stretched too far away. Elbows hang
  naturally. If you have to hunch or lean to reach the
  strings, **adjust the đàn**, not yourself. *Tay thả lỏng —
  không sát vào người, không vươn quá xa. Khuỷu tay buông tự
  nhiên. Nếu phải gò người để với tới dây, chỉnh lại đàn, đừng
  chỉnh người.*
- **Avoiding tạp âm — unwanted clicks from the pick or stick.**
  When the **móng** *(đàn tranh picks)* or **que** *(đàn bầu
  stick)* brushes wood, the bridge, or another string by
  accident, it makes a click. *Tạp âm xảy ra khi móng hoặc
  que chạm phải gỗ, ngựa đàn, hoặc dây khác.* Two fixes:
    1. **Lift cleanly.** After striking, the pick or stick
       lifts **away** from the string, not back across it.
       *Gảy xong nhấc thẳng lên, không quét ngược.*
    2. **Watch the angle.** A pick angled **flat to the
       string** glides clean; angled **hard**, it digs and
       clicks. *Móng nghiêng nhẹ thì trượt sạch, nghiêng quá
       gắt thì cắm vào dây.*
- **Harmonics — preview.** Touching a string lightly at
  exactly **1/2**, **1/3**, or **1/4** of its length produces
  a bell-like tone called a **harmonic** *(bồi âm)*. Both
  đàn tranh and đàn bầu can produce harmonics, **but the đàn
  bầu is built to amplify them** — its entire melodic system
  is played **on harmonics**, while on đàn tranh harmonics
  are just one ornament among many. *Cả hai đàn đều có bồi
  âm, nhưng đàn bầu được thiết kế để khuếch đại bồi âm — toàn
  bộ giai điệu chơi trên bồi âm. Trên đàn tranh, bồi âm chỉ
  là một loại tô điểm.*

### song knowledge · *kiến thức bài bản*

This week introduces our first piece — ***Để Gió Cuốn Đi***
*("Let the Wind Carry It Away")* by **Trịnh Công Sơn**
*(1939–2001)*, one of Vietnam's most influential songwriters.
*Bài đầu tiên — Để Gió Cuốn Đi của Trịnh Công Sơn (1939–2001).*

- **What the song is about.** The opening lyric:
  *"Sống trong đời sống / cần có một tấm lòng / để làm gì em
  biết không? / để gió cuốn đi…"* — *living in this life, one
  needs a heart / to do what, do you know? / to let the wind
  carry it away.* The song is about **kindness given freely,
  without expecting anything in return** — the heart is
  released to the wind. *Bài hát nói về lòng nhân ái cho đi
  mà không mong nhận lại — tấm lòng ấy để gió cuốn đi.*
- **Why we start here.** The melody fits both đàn tranh and
  đàn bầu naturally; Trịnh Công Sơn writes short repeatable
  phrases, so beginners can play **one phrase** and feel the
  whole song. *Câu ngắn, lặp lại — người mới có thể chơi một
  câu mà nghe ra cả bài.*
- **This week**, just the **first four notes**. Next week,
  the full opening. *Tuần này bốn nốt đầu. Tuần sau, trọn câu
  mở.*

### why we improvise — from day one · *vì sao tập ngẫu hứng từ buổi đầu*

We start improvising in week 1 — not to perform, but to
practice **attentively**. *Tập ngẫu hứng từ tuần đầu — không
phải để biểu diễn, mà để tập chú ý.*

- **No wrong notes.** A "wrong" note is just a note you
  didn't intend. The lesson is in **noticing**, not in
  avoiding. *Không có nốt sai — chỉ có nốt bạn không có ý
  định gảy. Bài học là nhận ra, không phải tránh né.*
- **The more we try, the more we train.** Each attempt trains
  the ear and the hand together. You don't need to practice
  "harder" — you need **more attempts**. *Cứ thử nhiều lần —
  mỗi lần thử là một lần luyện tai và tay đồng thời. Không
  cần "tập nặng" hơn — chỉ cần thử thêm.*
- **Sounds we don't like are also learning.** Hear them
  clearly, then **don't repeat them**. The ear and the hand
  remember what you didn't want. *Âm thanh bạn không thích
  cũng là bài học. Nghe rõ — rồi đừng lặp lại.*
- **This week's improv prompt.** Three notes, thirty
  seconds, name the feeling afterwards. Beginner or advanced
  — same prompt. *Ba nốt, ba mươi giây, đặt tên cảm xúc sau
  đó.*

### homework shared by both classes · *bài tập chung*

- **Listen to *Để Gió Cuốn Đi*** sung by **Khánh Ly** — the
  singer most associated with Trịnh Công Sơn. One full
  listen, no instrument in your hands. *Nghe một lần, không
  cầm đàn.*
- **Tune before every practice.** *Lên dây trước mỗi buổi
  tập.*
- **Make a tiny first song** *(2-minute target)* — apply the
  improv rationale. The song can be: *Sáng tác bài đầu tiên
  — áp dụng tinh thần ngẫu hứng:*
    - **about an emotion** *(buồn, vui, nhớ, …)*
    - shaped **beginning · middle · ending**
    - or just a **melody you like**
  Beginner or advanced, the prompt is the same. Bring a
  phone recording next week. *Mới hay cũ, đề bài như nhau.*

## session 1 · dan-tranh

### apps you'll use · *ứng dụng dùng cho buổi này*

Open both before class. Same tuner inside both. *Mở sẵn cả
hai trước buổi học. Cùng một bộ tuner.*

- [Air Đàn Tranh](https://anhthuphan.com/AirDanTranh) — the
  hand-shape trainer
- [Đàn Tranh Tablature](https://anhthuphan.com/DanTranhTab) —
  the score app for exercises and pieces

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Fitting picks** *(5 min)* — four picks, worn **opposite**
   your real nails. See [the basics page](https://www.maml.us/basics/your-dan-tranh/)
   for fitting and pictures. *Móng đeo ngược chiều móng thật
   — bốn cái.*
2. **Tuning together** *(10 min)* — open the tuner at
   [AirDanTranh/#tuner](https://anhthuphan.com/AirDanTranh/#tuner)
   or [DanTranhTab/#tuner](https://anhthuphan.com/DanTranhTab/#tuner)
   *(same tuner inside both apps)*. The lowest string sits
   at the **top** of the screen because your longest string
   is furthest from your body. *Dây trầm nhất hiển thị ở đỉnh
   màn hình — đó là dây dài nhất, xa người chơi nhất.* This
   is **one** of many tunings — the one we'll use throughout
   the course. The app supports **endless custom tunings**;
   feel free to explore once the basic one is comfortable.
   *Đây là một trong vô số kiểu lên dây — kiểu chúng ta dùng
   suốt khóa. Khi đã quen, tha hồ thử các kiểu khác.*
3. **The three hand shapes** *(20 min)* — drill order below.
4. **Reading tablature** *(5 min)* — quick walkthrough of
   [the MAML notation](https://www.maml.us/basics/tablature-reading/).
5. **First piece** *(10 min)* — first **four notes** of
   *Để Gió Cuốn Đi* in
   [the tab app](https://anhthuphan.com/DanTranhTab/?score=de-gio-cuon-di-trinh-cong-son).

### the three hand shapes · *ba dạng tay* (drill)

Run inside [Air Đàn Tranh](https://anhthuphan.com/AirDanTranh).

1. **Gliding** *(vuốt)* — all fingers held **straight**,
   sweep sideways across multiple strings.
     - check ✓ a smooth wash of sound, no thumb digging in
     - count: 10 sweeps left-to-right, 10 right-to-left
2. **Plucking** *(gảy)* — one finger curls **in** to pluck a
   single string.
     - check ✓ only one note rings; neighbors stay quiet
     - count: 10 plucks per finger (thumb / index / middle)
3. **Bending** *(nhấn)* — index, middle, ring curl together
   to press the string **down behind the bridge**. This is
   the left hand's voice.
     - check ✓ pitch slides up cleanly, then string returns
       to rest with no buzz
     - count: 10 presses per string on three different strings

### tab app — two play modes · *hai chế độ chơi*

- **play-along** *(auto)* — the app plays, you follow
- **live** — the app **listens** to your sound and waits for
  the correct note before advancing

### homework — đàn tranh · *bài tập đàn tranh*

1. **Exercise 1 — 10 min/day.** Open
   [Exercise 1](https://anhthuphan.com/DanTranhTab/?score=Exercise-1_dan-tranh).
   Try both **play-along** and **live** mode.
2. **Three hand shapes — 5 min each, daily.** Same drill as
   in class.
3. **First four notes of *Để Gió Cuốn Đi*** — 5 min/day in
   live mode.
4. **Browse the library** at
   [DanTranhTab](https://anhthuphan.com/DanTranhTab/) — pick
   anything that catches your ear, try the first phrase. *Bài
   nào lọt tai, thử câu đầu tiên.*

> *Tiny first song* — see the **shared homework** above. The
> prompt is the same for both classes. *Bài đầu tiên — xem
> phần bài tập chung phía trên.*

### check yourself · *tự kiểm tra*

- [ ] 10 clean glides in a row, both directions
- [ ] 10 single-string plucks without buzzing the neighbors
- [ ] My bend slides the pitch up clearly — not a small wobble
- [ ] I have a tiny song, even just 4 notes

## session 1 · dan-bau

### app you'll use · *ứng dụng dùng cho buổi này*

One app, **all three tools in it** — touching-point trainer,
tuner, and tablature. *Một ứng dụng — đủ ba công cụ: luyện
điểm chạm, lên dây, và ký âm.*

- [Air Đàn Bầu](https://anhthuphan.com/AirDanBau/)

### the touching point on your right hand · *điểm chạm trên tay phải*

The right hand has two jobs: **strike** the string with the
**que** *(stick)*, and **damp** the string at the harmonic
node with a part of your hand. *Tay phải có hai việc — gảy
bằng que, và chạm dây tại nốt bồi âm bằng một phần của bàn
tay.*

- The classical touching point is the **side of the base of
  the pinky** — the fleshy edge below the little finger.
  *Điểm chạm cổ điển: cạnh dưới gốc ngón út.*
- **Other spots are valid** — the side of the palm, the edge
  of the thumb. Pick what feels stable for you. *Có thể chạm
  bằng cạnh bàn tay hoặc cạnh ngón cái — chọn điểm nào ổn
  định nhất với bạn.*
- The point is **stability**, not tradition — the same spot,
  the same pressure, every strike. *Trọng tâm là ổn định —
  cùng một điểm, cùng một áp lực, mỗi lần gảy.*

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Posture** *(5 min)* — đàn bầu flat, **right hand** rests
   near the bridge with your chosen touching point on the
   string, **left hand** holds the bending stick loosely.
2. **Tuning to C3** *(5 min)* — open the **tuner tab** inside
   [Air Đàn Bầu](https://anhthuphan.com/AirDanBau/#tuner),
   pluck the open string, match the line. *Mở tab tuner trong
   app, gảy dây buông, khớp với đường trên màn hình.*
3. **Finding the harmonic nodes** *(15 min)* — locate **1/2**,
   **1/3**, **1/4** along the string.
4. **Right-hand-only drill** *(15 min)* — clean strikes at
   each node in **Air mode**.
5. **Add the left hand** *(10 min)* — small bends up, small
   bends down, while the right hand keeps striking.

### finding the nodes · *tìm các nốt bồi âm*

We mark each node with a **toothpick** taped or wedged so it
**points straight up at the string**. The toothpick is a
visual marker — your hand still strikes from above. *Đánh
dấu mỗi nốt bằng một cây tăm cắm thẳng đứng dưới dây — chỉ
là dấu nhìn, tay vẫn gảy từ trên xuống.*

> **The toothpick should NOT poke your hand.** You don't
> press the node deep — a light brush at the surface of the
> string is all the harmonic needs. If the toothpick is
> jabbing your palm, you're pressing too hard. *Cây tăm
> không được chọc vào tay. Nốt bồi âm chỉ cần chạm nhẹ
> trên mặt dây — không cần ấn sâu. Nếu tăm chạm đau tay,
> nghĩa là bạn đang ấn quá mạnh.*

1. **1/2 of the string** — the easiest. Halfway between the
   bridge and the post. Mark with a toothpick, strike, listen
   for a clear bell tone.
2. **1/3** — one-third from the bridge end. Higher pitch.
3. **1/4** — one-quarter from the bridge end. Higher still.
     - check ✓ the harmonic rings, not a dull thud
     - check ✓ the toothpick stays clear of your palm — light
       contact at the string only
     - check ✓ the green tracing line is steady, not shaky

### right-hand-only drill · *tay phải một mình*

Inside [Air Đàn Bầu](https://anhthuphan.com/AirDanBau/), in
**Air mode**.

- 5 clean strikes at **1/2** — listen for the bell
- 5 clean strikes at **1/3**
- 5 clean strikes at **1/4**
- repeat the cycle 3 times

Three observations to keep in mind:

- the touch is **just enough** — not pressed in, not too low
- the motion is **down and up**, never sideways
- the green line is **steady**, not wobbly

### add the left hand · *thêm tay trái*

- gentle bends **up** *(push the stick away)* — small motions
  only, listen for clean pitch slide
- gentle bends **down** *(pull the stick toward you)*
- right hand keeps striking at 1/2 throughout

### homework — đàn bầu · *bài tập đàn bầu*

1. **Right-hand drill — 10 min/day** at all three nodes.
2. **Left-hand small bends — 5 min/day** on a single node
   (1/2 is fine).
3. **Tune your đàn bầu daily** — on this instrument, tuning
   is itself an ear-training exercise.
4. **Say your name into the đàn bầu** — match the tone
   contour with the bending stick.

### check yourself · *tự kiểm tra*

- [ ] I can find 1/2 by ear, not just by eye
- [ ] My green line stays steady at 1/2 for 5 strikes in a row
- [ ] I can hit 1/3 and 1/4 cleanly at least once each
- [ ] My left-hand small bend slides the pitch, not jumps it
- [ ] My đàn bầu is tuned to C3 right now

## session 2 · theme

**Part 1 · the first phrase emerges**

*Phần 1 · câu đầu tiên hiện ra*

## session 2 · shared

### music in general · *nhạc lý chung*

- **Phrasing — where the line stops.** A musical phrase ends
  on a **resting note** — usually a longer or lower note that
  feels like an arrival. *Câu nhạc kết ở nốt nghỉ — nốt dài
  hoặc trầm hơn, cảm giác "đã tới."* Listening drill: count
  the resting notes in *Để Gió Cuốn Đi*'s opening — there are
  three. *Đếm nốt nghỉ — có ba.*
- **Tạp âm review — left-hand noise.** When you press behind
  the bridge *(đàn tranh)* or move the bending stick *(đàn
  bầu)*, the motion can produce a small click if the string
  isn't already vibrating cleanly. Rule: **strike first, press
  second**. Don't press at the same instant as you strike.
  *Gảy trước, nhấn sau — đừng nhấn cùng lúc gảy.*
- **Pick angle — small adjustments.** Last week's drill was
  about lifting cleanly; this week, watch the **entry angle**.
  *Pick should land roughly 60° off the string*, not flat
  (slips, no sound) or perpendicular (digs, clicks). On đàn
  bầu, the **stick rests on the string lightly** — leaning the
  stick changes pitch, pressing it down kills the harmonic.
  *Đối với đàn bầu, que đặt nhẹ trên dây — nghiêng que để đổi
  cao độ, ép xuống thì mất bồi âm.*
- **Improvisation begins now.** A 30-second feeling sketch on
  any 3 notes. The group listens and names what they heard.
  *Phác cảm xúc 30 giây trên 3 nốt.*

### song knowledge · *kiến thức bài bản*

We extend from the **first four notes** of *Để Gió Cuốn Đi*
into the **full opening line** — the *"sống trong đời sống
cần có một tấm lòng"* phrase. *Mở rộng từ bốn nốt đầu sang
trọn câu mở.*

- **Two-verse structure.** *Để Gió Cuốn Đi* has two short
  verses, and **both end on the same words**: *"để gió cuốn
  đi."* The melody for both verses is identical — once you
  can play one, you can play the other. *Hai đoạn ngắn, cùng
  kết bằng "để gió cuốn đi."*
- **Khánh Ly's tempo is slow.** Each syllable gets a full
  beat. Don't rush the line. *Khánh Ly hát rất chậm — mỗi chữ
  một nhịp.*
- **Find the resting notes on your instrument.** Before you
  play, locate the three resting notes physically — which
  string *(đàn tranh)*, which node + bend *(đàn bầu)*. Then
  the rest of the phrase fills in around them. *Tìm ba nốt
  nghỉ trên đàn trước, rồi điền phần còn lại quanh đó.*

### homework shared by both classes · *bài tập chung*

- **Listen again** and identify the **three resting notes by
  ear**. *Tìm ba nốt nghỉ bằng tai.*
- **3-note feeling sketch — record 30 seconds, listen back.**

## session 2 · dan-tranh

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Recap & tune-check** *(5 min)* — every student plays
   the first 4 notes of *Để Gió Cuốn Đi* once, group listens.
2. **Voice-with vs. voice-without listening** *(5 min)* —
   shared portion.
3. **Exercise 1 at faster tempo** *(10 min)* — live mode.
4. **Full opening of *Để Gió Cuốn Đi*** *(15 min)*.
5. **Left-hand pressure drill** *(10 min)* — see below.
6. **Improv prompt: 3-string feeling sketch** *(5 min)* —
   shared portion.

### left-hand pressure drill · *luyện tay trái*

Striking with the right hand only sets the pitch. Pressing
**after** the strike is what makes the đàn tranh sing.

1. Strike one string with the right hand.
2. **Press behind the bridge** with the left — pitch rises.
3. Release slowly — pitch falls back.
4. Repeat 10× on three different strings.
     - check ✓ the slide is **continuous**, not a step
     - check ✓ you can hold a half-step rise stable

### homework — đàn tranh · *bài tập đàn tranh*

1. **Full *Để Gió Cuốn Đi* opening — 10 min/day** in
   play-along mode.
2. **Left-hand pressure — 5 min/day** on three different
   strings.
3. **Record a 30-second clip of last week's tiny song.**
   Bring it.

### check yourself · *tự kiểm tra*

- [ ] I can play the opening of *Để Gió Cuốn Đi* without
      stopping
- [ ] My left-hand press makes a continuous slide, not a step
- [ ] I have a phone recording of last week's tiny song

## session 2 · dan-bau

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Recap & tune-check** *(5 min)* — group strikes 1/2, 1/3,
   1/4 in turn.
2. **Voice-with vs. voice-without listening** *(5 min)* —
   shared portion.
3. **Right-hand-only review** *(10 min)* — clean strikes at
   each node, faster than last week.
4. **Both hands together** *(15 min)* — drill below.
5. **Mimicking a Vietnamese tone** *(10 min)* — see below.
6. **Tiny first melody** *(5 min)* — 3 notes, your choice.

### both hands drill · *luyện hai tay cùng lúc*

This is the big jump on đàn bầu. Take it slow.

1. Right hand strikes at **1/2**.
2. **Same time**, left hand bends gently up.
3. Release. Strike again. Bend gently down.
4. Repeat 5×, then move to 1/3, then to 1/4.
     - check ✓ the strike is clean — no extra noise from the
       left-hand motion
     - check ✓ the bend is small *(half-step)*, not a jump

### mimicking a Vietnamese tone · *bắt chước thanh điệu*

The đàn bầu's signature is its imitation of the human voice.
*Đặc trưng của đàn bầu là mô phỏng giọng người.*

1. Pick a Vietnamese word with a clear tone — *má*, *mà*,
   *mả*, *mã*, *mạ* — or any name.
2. Say it out loud once.
3. Strike the đàn bầu and **shape the bend** to follow the
   tone contour. The instrument is "saying" the word.
4. Try 3 different tones in a row.

### homework — đàn bầu · *bài tập đàn bầu*

1. **Right-hand-only drill — 5 min/day** at all three nodes.
2. **Slow left-hand bends — 5 min/day** on a single node.
3. **Both-hands drill — 5 min/day** at 1/2 first, then 1/3.

### check yourself · *tự kiểm tra*

- [ ] I can do a clean both-hands strike at 1/2, 5 in a row
- [ ] My left hand makes a half-step bend, not a jump
- [ ] My đàn bầu is tuned to C3

## session 3 · theme

**Part 2 · stepping into Vọng Cổ**

*Phần 2 · bước vào Vọng Cổ*

## session 3 · shared

### music in general · *nhạc lý chung*

- **The pentatonic scale.** Vietnamese traditional music
  centers on a five-note scale: **Hò · Xự · Xang · Xê ·
  Cống**. These are the five anchor pitches; everything else
  is ornament around them. *Năm nốt: Hò, Xự, Xang, Xê, Cống.*
- **Hò is home.** The piece begins, returns, and ends on Hò.
  Listening practice: count how many times Hò appears in a
  master recording. *Hò là nhà — bài bắt đầu, về, kết ở Hò.*
- **Listening this week.** A master recording of Vọng Cổ.
  Two questions: **what did the singer leave out?** and
  **what did the đàn fill in?** *Ca sĩ bỏ gì? Đàn lấp gì?*

### song knowledge · *kiến thức bài bản*

***Vọng Cổ*** *("longing for the past")* is the heartbeat of
southern Vietnamese music — the central piece of *đờn ca tài
tử* and the ancestor of *cải lương* theater. *Vọng Cổ là bài
tổ của đàn ca tài tử miền Nam.*

- **Origin.** Composed by **Cao Văn Lầu** in **Bạc Liêu** in
  **1919**, originally as *Dạ Cổ Hoài Lang* (a wife mourning
  her absent husband). *Tác giả Cao Văn Lầu, Bạc Liêu, 1919.*
- **Structure.** Six **câu** *(phrases)* of varying length —
  câu 1 and câu 6 are short framing phrases, câu 2–5 are
  longer. Each câu lands on a structural cadence note called
  the **xuống xề**. *Sáu câu dài ngắn khác nhau — mỗi câu hạ
  ở nốt xuống xề.*
- **Why it matters.** Vọng Cổ is the standard piece of
  southern Vietnamese music — every traditional musician
  knows it, and most Vietnamese listeners recognize it from
  the first câu. *Vọng Cổ là bài chuẩn của nhạc miền Nam — ai
  chơi nhạc cổ truyền cũng biết.*
- **This week** we cover the scale and **câu 1**.

### homework shared by both classes · *bài tập chung*

- **Listen to one full Vọng Cổ recording.** A link will be
  shared in the class group. Notice **where the singer
  pauses**. *Nghe trọn một bản — chú ý chỗ ca sĩ ngừng.*
- **Try the scale in your head.** Sing Hò · Xự · Xang · Xê ·
  Cống before you pick up your instrument. *Hát thang âm
  trong đầu trước khi cầm đàn.*

> Light review: keep *Để Gió Cuốn Đi* warm — 5 min a day, no
> more. It's a warm-up now, not the focus. *Ôn nhẹ Để Gió
> Cuốn Đi — khởi động, không phải trọng tâm.*

## session 3 · dan-tranh

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Recap warm-up** *(5 min)* — first phrase of *Để Gió
   Cuốn Đi* — light touch.
2. **Map the Vọng Cổ scale onto your strings** *(15 min)* —
   see below.
3. **Câu 1 — opening phrase** *(20 min)* — listen, sing, play.
4. **First ornament — left-hand vibrato** *(10 min)* — see
   below.

### the Vọng Cổ scale on đàn tranh · *thang âm Vọng Cổ trên đàn tranh*

1. Locate **Hò** *(home)* on a low string.
2. Step up: **Xự**, then **Xang**, then **Xê**, then **Cống**,
   then back to **Hò** an octave up.
3. Play up and down at slow tempo, 5×.
     - check ✓ each note rings clearly before the next
     - check ✓ no buzz when crossing strings

### câu 1 drill · *luyện câu 1*

1. Listen once, eyes closed.
2. Sing the contour back, no instrument.
3. Play it slowly with the tab.
4. Play it twice at tempo.
     - end note: a short cadence into the next câu

### left-hand vibrato · *vibrato tay trái*

After striking a string, **press behind the bridge** with a
small rhythmic wobble. The pitch oscillates a quarter-step.

- check ✓ the wobble is **rhythmic**, not random
- check ✓ small motion — the note still feels like one note

### homework — đàn tranh · *bài tập đàn tranh*

1. **Vọng Cổ scale — 5 min/day**, slowly, up and down.
2. **Câu 1 — 10 min/day**, alternating play-along and live.
3. **Left-hand vibrato — 5 min/day** on one held note.
4. **Light review of *Để Gió Cuốn Đi*** — 5 min/day, no more.

### check yourself · *tự kiểm tra*

- [ ] I can play the Vọng Cổ scale up and down without
      looking at my hands
- [ ] I can sing câu 1 before I play it
- [ ] My vibrato is rhythmic, not random

## session 3 · dan-bau

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Recap warm-up** *(5 min)* — first phrase of *Để Gió
   Cuốn Đi* on đàn bầu — single voice, slow.
2. **The scale as slides** *(15 min)* — see below.
3. **Câu 1 — opening phrase, slow** *(20 min)*.
4. **Single-voice listening** *(10 min)* — your phrase as the
   only voice in the room.

### the Vọng Cổ scale as slides · *thang âm Vọng Cổ qua trượt*

On đàn tranh the scale is different strings. On đàn bầu it's
**slides** between your harmonic nodes — the bending stick
fills in pitches in between. *Trên đàn tranh là dây khác. Trên
đàn bầu là trượt giữa các nốt bồi âm.*

1. Strike at 1/2 — that's **Hò**.
2. Strike again, **bend up half a step** — Xự.
3. Strike, bend up further — Xang.
4. And so on, until you reach the next node.
     - check ✓ each pitch holds **at least 2 seconds** before
       moving to the next
     - check ✓ the slide is even, not wobbly

### câu 1 — slow phrasing · *câu 1 — phân câu chậm*

On đàn bầu, câu 1 is one note at a time. Don't rush.

1. Listen once, eyes closed.
2. Sing the contour back.
3. Play one note. Hold. Slide to the next.
4. Repeat — full câu 1 — once at tempo.

### homework — đàn bầu · *bài tập đàn bầu*

1. **Slow scale practice — 5 min/day.** Hold each note 2
   seconds before sliding to the next.
2. **Câu 1 phrasing — 10 min/day.** Sing it before you play it.
3. **Light review of *Để Gió Cuốn Đi*** — 5 min/day, single
   voice.

### check yourself · *tự kiểm tra*

- [ ] I can sing câu 1 from memory
- [ ] I can play câu 1 slowly, one note at a time
- [ ] My slide between Hò and Xự is even, not wobbly

## session 4 · theme

**Part 2 · the line lengthens**

*Phần 2 · câu nhạc dài ra*

## session 4 · shared

### music in general · *nhạc lý chung*

- **The xuống xề.** The structural cadence note that lands
  each câu. The listener feels it as "we have arrived."
  *Nốt cadence đánh dấu kết câu. Người nghe cảm thấy "đã tới
  nơi."*
- **Listening this week.** Three different singers landing
  the **same** xuống xề. Notice how each does it
  differently — same destination, different approach. *Ba
  ca sĩ, cùng một xuống xề — mỗi người tới một kiểu khác nhau.*
- **Building the line.** Câu 2 extends câu 1. Câu 3 turns
  the corner before resolving. The line is starting to feel
  long. *Câu 2 nối tiếp câu 1, câu 3 xoay góc trước khi giải.*

### song knowledge · *kiến thức bài bản*

- **Six câu, paced.** Vọng Cổ's six câu are not equal length.
  Câu 1 is a setting; câu 2–3 are the building tension; câu
  4–5 are the climax; câu 6 is the resolution. *Sáu câu không
  đều nhau — mỗi câu một vai.*
- **The xuống xề as anchor.** Every câu, no matter the words
  or the singer, lands on the same xuống xề. That's why the
  audience can sing along — the destination is shared.
- **This week** we learn câu 2 and câu 3 — the building
  tension.

### homework shared by both classes · *bài tập chung*

- **Listen to three different recordings** of Vọng Cổ. Same
  song, different singers. *Nghe ba bản khác nhau — cùng bài,
  ca sĩ khác.*
- **Record yourself** at the end of the week. You'll listen
  back to this in week 6.

## session 4 · dan-tranh

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Recap warm-up** *(5 min)* — câu 1, group plays together.
2. **Three-singer xuống xề listening** *(10 min)* — shared.
3. **Câu 2** *(15 min)* — listen, sing, play.
4. **Câu 3** *(15 min)* — same flow.
5. **Connect câu 1 → 2 → 3** *(5 min)* — one pass each.

### câu 2 + câu 3 drill · *luyện câu 2 + câu 3*

For each câu separately:

1. Listen once, eyes closed.
2. Sing the contour back.
3. Play slow, with the tab.
4. Play at tempo, twice.
5. Land the xuống xề with a small ornament *(vibrato is fine)*.

### homework — đàn tranh · *bài tập đàn tranh*

1. **Câu 1 → 2 → 3 in sequence** — 10 min/day, slow.
2. **Xuống xề ornament — 5 min/day.** Vibrato or neighbor
   tone — your choice.
3. **Record yourself once at week's end** and listen back.

### check yourself · *tự kiểm tra*

- [ ] I can play câu 1 → 2 → 3 without stopping
- [ ] My xuống xề lands with a clear ornament, not a flat note
- [ ] I have a recording of myself at the end of this week

## session 4 · dan-bau

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Recap warm-up** *(5 min)* — câu 1 on đàn bầu, slow.
2. **Three-singer xuống xề listening** *(10 min)* — shared.
3. **Dynamic control** *(10 min)* — see below.
4. **Câu 2** *(10 min)* — phrasing through slides.
5. **Câu 3** *(10 min)* — same flow.
6. **Slow slide into xuống xề** *(5 min)*.

### dynamic control · *điều khiển âm lượng*

The đàn bầu has almost no natural sustain, so dynamics live
in your **bending arm**, not your striking hand. *Đàn bầu
hầu như không có ngân tự nhiên — nên âm lượng nằm ở tay nhấn
cần đàn.*

1. Strike at 1/2 — let the note ring as long as it will.
2. While it rings, **lift the bend slightly** — the note
   "blooms" louder.
3. Then **soften the bend** — the note fades.
4. Repeat 5× on each node.
     - check ✓ the bloom is smooth, not a spike
     - check ✓ the fade is smooth, not a drop

### homework — đàn bầu · *bài tập đàn bầu*

1. **Câu 2 → câu 3 connection — 5 min/day.**
2. **Bending-stick only — 1 min/day.** No right hand. Pure
   slides.
3. **Dynamic-bloom drill — 3 min/day.** Strike at 1/2, bloom,
   fade. Then 1/3.

### check yourself · *tự kiểm tra*

- [ ] I can play câu 2 → câu 3 without stopping
- [ ] My bloom-and-fade is smooth, not a spike
- [ ] My slide into the xuống xề is slow and even

## session 5 · theme

**Part 2 · your own voice begins**

*Phần 2 · giọng của bạn bắt đầu lên tiếng*

## session 5 · shared

### music in general · *nhạc lý chung*

- **Improvisation within a framework.** A **rao** is the
  improvised opening that introduces the piece, sets the mood,
  and warms the player's hands. The framework is fixed — same
  scale, same destination. The choices are personal. *Rao là
  phần ngẫu hứng mở đầu — khung cố định, lựa chọn cá nhân.*
- **Listening this week.** Two different singers' rao on the
  same Vọng Cổ. Same vocabulary, different choices. *Hai ca
  sĩ — cùng vốn từ, lựa chọn khác.*
- **Three things a rao usually does:**
    1. visits the **home note** *(Hò)* early
    2. **reaches up** to a higher note before settling back
    3. **leaves at least one rest** — a real silence inside
       the line, not a continuous flow

### song knowledge · *kiến thức bài bản*

- **Câu 4** is the climb — the line reaches its highest
  point of tension. Câu 5 will start the descent.
- **Rao traditionally** mimics what a singer does as they
  warm up before the song. On đàn bầu it imitates the voice
  directly; on đàn tranh it traces the contour. *Rao truyền
  thống bắt chước ca sĩ khởi giọng.*

### homework shared by both classes · *bài tập chung*

- **Write two rao versions for yourself.** Same framework,
  different choices. 4 bars each. *Viết hai phiên bản rao —
  khung giống nhau, lựa chọn khác nhau.*
- **Listen to one Vọng Cổ rao recording** and notice when
  the player pauses.

## session 5 · dan-tranh

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Recap** *(5 min)* — câu 1 → 3, group plays.
2. **Two-singer rao listening** *(10 min)* — shared.
3. **Câu 4** *(15 min)* — listen, sing, play.
4. **Group rao loop** *(15 min)* — see below.
5. **Small ornament vocabulary** *(5 min)*.

### group rao loop · *vòng rao theo nhóm*

In class, around the room:

1. Each student plays a **4-bar rao** — your choice of notes.
2. The next student **answers** — same scale, different shape.
3. Around the room, no breaks.
     - rule: stay in the **Vọng Cổ scale** *(Hò · Xự · Xang ·
       Xê · Cống)*
     - rule: **pause at least once** in your 4 bars

### a small ornament vocabulary · *vốn tô điểm nhỏ*

Three to draw from:

- **vibrato** — small left-hand wobble after the strike
- **neighbor tone** — touch the next-higher note briefly
- **slide-in** — start from a half-step below, land on the
  target

### homework — đàn tranh · *bài tập đàn tranh*

1. **Two written rao versions** *(shared)*.
2. **Câu 1 → 2 → 3 → 4 — 10 min/day.** Slow tempo.
3. **Pick one ornament** and use it 5× per practice.

### check yourself · *tự kiểm tra*

- [ ] I have **two** rao versions written or memorized
- [ ] I can play câu 1 → 4 without stopping
- [ ] I am using at least one ornament on purpose

## session 5 · dan-bau

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Recap** *(5 min)* — câu 1 → 3 on đàn bầu, slow.
2. **Two-singer rao listening** *(10 min)* — shared.
3. **Câu 4** *(15 min)* — phrasing through slides.
4. **Sing-then-play rao practice** *(15 min)* — see below.
5. **Free, no fixed rhythm** *(5 min)* — one short phrase
   each, around the room.

### sing-then-play rao practice · *luyện rao bằng cách hát trước*

The đàn bầu's rao is the most voice-like part of your
practice. Sing first, then play.

1. **Sing** a 4-bar rao — any words, any tone, your phone
   recording it.
2. Listen back.
3. **Play it** on the đàn bầu, matching the contour with the
   bending stick.
4. Compare your sung version to your played version. Where
   did the bend match? Where didn't it?

### homework — đàn bầu · *bài tập đàn bầu*

1. **Two written rao versions** *(shared)*.
2. **Sing-then-play — 10 min/day.** Record a sung phrase,
   play it back on the đàn bầu.
3. **Câu 1 → 2 → 3 → 4 — 10 min/day.** Slow tempo.
4. **Try a rao based on your own name** — the tones of your
   name are the contour. *Rao theo tên bạn.*

### check yourself · *tự kiểm tra*

- [ ] I have a sung rao recording of my own
- [ ] My played rao follows the contour of the sung version
- [ ] I can play câu 1 → 4 without stopping

## session 6 · theme

**Part 2 · the cycle closes**

*Phần 2 · vòng khép lại*

## session 6 · shared

### music in general · *nhạc lý chung*

- **The role of silence.** Count the rests in the master
  recording you've been listening to. Rests in Vọng Cổ are
  **part of the piece**, not pauses between phrases — the
  player still holds posture and intention through them.
  *Đếm các nốt nghỉ — nốt nghỉ là một phần của bài, không
  phải khoảng dừng giữa các câu.*
- **Fewer notes, more weight.** As the piece resolves, the
  line slows. Each note carries more. Vibrato gets longer;
  ornaments get more deliberate. *Ít nốt hơn, mỗi nốt nặng hơn.*
- **Listening this week.** The same recording you used in
  week 4. Notice what's different in your ear now.

### song knowledge · *kiến thức bài bản*

- **Câu 5** brings the tension home — the line reaches and
  pulls back. *Câu 5 — căng thẳng quay về.*
- **Câu 6** lands and resolves. The cycle closes. *Câu 6 —
  hạ cánh, giải, khép vòng.*
- **The full six câu.** This is the first week you can play
  the whole piece, end to end, slow tempo. *Tuần đầu tiên
  chơi trọn bài, từ đầu đến cuối, nhịp chậm.*

### homework shared by both classes · *bài tập chung*

- **All six câu in sequence — 10 min/day.** Slow tempo. The
  point is **continuity**, not polish. *Trọn 6 câu liền mạch
  — trọng tâm là liền mạch, không phải hoàn hảo.*
- **Listen back** to your week-4 recording. Name **two
  things** that have improved.

## session 6 · dan-tranh

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Recap warm-up** *(5 min)* — câu 1 → 4, group plays.
2. **Counting-the-rests listening** *(10 min)* — shared.
3. **Câu 5** *(10 min)* — heavier vibrato, longer slides.
4. **Câu 6** *(10 min)* — landing and resolving.
5. **All six câu in sequence** *(10 min)* — first full pass.
6. **Light review of *Để Gió Cuốn Đi*** *(5 min)*.

### câu 5 + câu 6 drill · *luyện câu 5 + câu 6*

For each câu:

1. Listen, eyes closed.
2. Sing.
3. Play slow.
4. Play at tempo with **heavier vibrato** on the held notes.
5. Land the xuống xề with **weight**, not speed.
     - check ✓ fewer notes, more weight per note
     - check ✓ rests are part of the music, not gaps

### the first full pass · *lần đầu chơi trọn bài*

Slow tempo. The point is **continuity**, not polish.

1. Câu 1 → 2 → 3 → 4 → 5 → 6, no stops.
2. If you forget a note, hold the previous note longer and
   keep going.
3. Land câu 6 with a slow vibrato.

### homework — đàn tranh · *bài tập đàn tranh*

1. **All six câu in sequence — 10 min/day** *(shared)*.
2. **Câu 5 + 6 vibrato — 5 min/day.** Heavier than your
   earlier câu.
3. **Light review of *Để Gió Cuốn Đi*** — 5 min/day, full
   piece.

### check yourself · *tự kiểm tra*

- [ ] I can play all six câu without stopping, slow tempo
- [ ] My câu 6 lands with weight, not just ends
- [ ] My vibrato on held notes is on purpose, not accidental

## session 6 · dan-bau

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Recap warm-up** *(5 min)* — câu 1 → 4 on đàn bầu, slow.
2. **Counting-the-rests listening** *(10 min)* — shared.
3. **Bending-stick vibrato** *(15 min)* — see below.
4. **Câu 5 + câu 6** *(15 min)* — phrasing through slides.
5. **All six câu in sequence** *(5 min)* — first full pass.

### bending-stick vibrato · *vibrato qua cần đàn*

A small, rhythmic shake of the stick gives the held note a
**singing quality**. *Rung nhẹ nhịp nhàng cần đàn cho nốt
ngân có tiếng hát.*

1. Strike at 1/2.
2. While the note rings, **shake the stick** rhythmically —
   small motion, even rhythm.
3. Try slow first *(2 wobbles per second)*, then faster
   *(4 wobbles per second)*.
4. Repeat at 1/3 and 1/4.
     - check ✓ even rhythm — not random
     - check ✓ small motion — not a full bend
     - check ✓ the note still rings throughout

### homework — đàn bầu · *bài tập đàn bầu*

1. **All six câu in sequence — 10 min/day** *(shared)*.
2. **Bending-stick vibrato — 5 min/day.** Right hand silent;
   left hand shakes on a held note.
3. **Câu 5 + 6 with vibrato on the cadences** — 5 min/day.

### check yourself · *tự kiểm tra*

- [ ] I can play all six câu without stopping, slow tempo
- [ ] My vibrato has even rhythm, not random
- [ ] My vibrato is small enough that the note still rings

## session 7 · theme

**Part 2 · making it your own**

*Phần 2 · làm thành của riêng*

## session 7 · shared

### music in general · *nhạc lý chung*

- **Listen first, then play.** This week opens with one full
  Vọng Cổ recording at the top of class, before anyone picks
  up the đàn. *Nghe trọn bài trước khi cầm đàn.*
- **Tạp âm under pressure — the solo turn.** When you're
  about to perform, hands tense up and accidentally **press
  too hard**. Two things to watch: *Khi sắp solo, tay căng
  lên, dễ sinh tạp âm. Hai điều cần để ý:*
    1. **Pick angle stays the same** as in practice — don't
       grip harder.
    2. **Strike-then-press** stays in order — the rule
       doesn't change just because the room is listening.
- **The personal rao.** A rao that is **yours** — not
  borrowed, not copied. The framework is shared *(scale,
  destination)*, the choices are entirely your own. *Rao
  của riêng bạn — khung chung, lựa chọn của bạn.*
- **Solo turn.** Each student plays a brief solo turn — not
  a test, a rehearsal for next week. *Lượt solo — tập luyện
  cho tuần sau, không phải kiểm tra.*

### song knowledge · *kiến thức bài bản*

- **The full piece, slow tempo.** Câu 1 → 6, played as one
  long line, not six pieces. *Một dòng dài, không phải sáu
  mảnh.*
- **The rao goes first.** Tradition: rao introduces the piece,
  then câu 1 begins. The transition is itself a phrase.

### pick your sharing piece for week 8 · *chọn bài cho buổi chia sẻ*

For next week, pick **one** of:

- full Vọng Cổ at slow tempo *(any câu range)*
- your **personal rao** alone
- your **own song** from week 1
- a section of *Để Gió Cuốn Đi*

3 minutes max. *Tối đa 3 phút.* Decide by mid-week.

### homework shared by both classes · *bài tập chung*

- **Polish your rao** — 10 min/day. Refine, don't redo. *Mài
  giũa rao — 10 phút mỗi ngày.*
- **Full Vọng Cổ — 10 min/day**, slow tempo.
- **Decide your sharing piece** by mid-week. Write down which
  one.

## session 7 · dan-tranh

### lesson plan — đàn tranh · *kế hoạch buổi học* (50 min)

1. **Listen** *(5 min)* — full Vọng Cổ at the top of class —
   shared.
2. **Group full pass** *(15 min)* — slow tempo, all six câu.
3. **Solo turn** *(15 min)* — each student plays one câu of
   their choice.
4. **Personal rao coaching** *(10 min)* — see below.
5. **Pick your sharing piece** *(5 min)* — shared.

### personal rao coaching · *huấn luyện rao cá nhân*

Bring your two rao versions from week 5.

1. Play one for the group.
2. The instructor and the group give **one observation** each.
3. Rewrite or polish in real time.
4. Play it again. **What changed?**

### homework — đàn tranh · *bài tập đàn tranh*

1. **Polish your rao** *(shared)*.
2. **Full Vọng Cổ — 10 min/day** *(shared)*.
3. **Last-minute ornament cleanup** — pick one câu, play it
   3 times, fix the same spot each time.

### check yourself · *tự kiểm tra*

- [ ] I have a polished personal rao, ~30 seconds long
- [ ] I can play full Vọng Cổ at slow tempo without stopping
- [ ] I have decided my sharing piece for week 8

## session 7 · dan-bau

### lesson plan — đàn bầu · *kế hoạch buổi học* (50 min)

1. **Listen** *(5 min)* — full Vọng Cổ, eyes closed —
   shared.
2. **Full melody at slow tempo** *(15 min)* — group plays.
3. **Solo turn** *(15 min)* — your rao + câu 1.
4. **Coaching** *(10 min)* — listen, refine.
5. **Pick your sharing piece** *(5 min)* — shared.

### solo turn — your rao + câu 1 · *lượt solo — rao + câu 1*

Each student, in turn:

1. Play your **rao**, free tempo.
2. Land on Hò, then begin **câu 1**.
3. Stop after câu 1. Group listens.
     - the rao is yours; câu 1 is shared
     - on đàn bầu, the personal rao is the **most personal
       thing** you'll play in this course — let it sound like
       you. *Rao là phần cá nhân nhất — để nó vang lên như
       chính bạn.*

### homework — đàn bầu · *bài tập đàn bầu*

1. **Record a clean take of your rao.** Phone is fine.
2. **Full melody — 10 min/day** *(shared)*.
3. **Sing-then-play your rao** at least once — make sure the
   played version still follows the sung contour.

### check yourself · *tự kiểm tra*

- [ ] I have a clean phone recording of my rao
- [ ] I can play the full melody at slow tempo without stopping
- [ ] My rao still follows the sung contour, not just notes

## session 8 · theme

**Part 3 · passing it on**

*Phần 3 · trao đi*

## session 8 · shared

> No new material. Tonight you **give** the music back —
> what's been growing in your hands all eight weeks, played
> for the others. Each student plays one piece; the others
> listen. *Không học bài mới. Tối nay bạn trao lại bài nhạc
> đã lớn trong tay mình suốt tám tuần — chơi cho mọi người
> nghe. Mỗi người một bài; những người còn lại lắng nghe.*

### music in general · *nhạc lý chung*

- **Pre-performance breathing — the only time we ask.** Right
  before you play your sharing piece, take **three slow
  breaths** in and out. This settles the hands and
  re-anchors the picks/stick at their normal pressure. *Trước
  khi solo: hít thở chậm ba lần — cho tay ổn định, móng/que
  trở về áp lực bình thường. Đây là lần duy nhất khóa học yêu
  cầu chú ý đến hơi thở.*
- **Forgetting a note is fine — keep going.** The piece
  continues even if you skip something. **Don't restart**;
  hold the previous note longer and pick up at the next one
  you remember. *Quên nốt cứ đi tiếp — đừng bắt đầu lại; giữ
  nốt cũ lâu hơn rồi vào lại ở nốt nhớ được.*
- **Reflection prompts** *(pick one or two to answer aloud)*:
    - what surprised you in these 8 weeks?
    - what do you want to keep practicing?
    - what one thing do you wish you'd known on day 1?
    - what do you hope to learn next?

### the sharing format · *cách chia sẻ*

Each student, in turn:

1. Say **what you're playing** in one sentence — your own
   words. *Nói bạn sẽ chơi gì, một câu.*
2. Play it. **3 minutes max.** Forgetting a note is fine —
   keep going.
3. Group **listens in silence**. *Cả nhóm nghe trong im
   lặng.*
4. The next student goes.

### the evening · *tối nay*

1. **Group warm-up** *(5 min)* — *Để Gió Cuốn Đi* + Vọng Cổ
   scale.
2. **Each student plays their piece** *(30 min)* — 3 min max.
3. **Reflection** *(10 min)*.
4. **Group photo** *(2 min)*.
5. **What's next** *(3 min)* — see below.

### what's next · *tiếp theo là gì*

Options to think about:

- **continued ensemble** — keep playing with this group
- **a new piece** — pick something from the
  [DanTranhTab](https://anhthuphan.com/DanTranhTab/) /
  [AirDanBau](https://anhthuphan.com/AirDanBau/) library
- **a new tuning** — explore beyond the Vọng Cổ scale
- **your own composition** — extend your week-1 song
- **pair with a singer** — instrument accompanying voice is
  the oldest role
- **teach someone** — the best way to deepen what you know

## session 8 · dan-tranh

### bring with you · *mang theo*

- your đàn tranh
- your tuned strings *(tune at home before you come)*
- your sharing piece, practiced
- your phone, if you want a recording of yourself

### the night before · *đêm trước*

- **play your sharing piece three times.** That's enough.
- **listen to one full Vọng Cổ recording** — you'll play
  better the next day for it. *Nghe trọn một bản — hôm sau
  sẽ chơi hay hơn.*
- **sleep.** *Ngủ.*

## session 8 · dan-bau

### bring with you · *mang theo*

- your đàn bầu
- tuned to C3 *(tune at home)*
- your sharing piece, practiced
- your phone, if you want a recording

### the night before · *đêm trước*

- **play your rao three times.** Each time, change one thing.
  *Chơi rao ba lần — mỗi lần đổi một chi tiết.*
- **say someone's name into the đàn bầu** before you stop —
  the instrument is most yours when it speaks like a person.
  *Nói tên ai đó qua đàn bầu trước khi dừng.*
- **sleep.** *Ngủ.*
