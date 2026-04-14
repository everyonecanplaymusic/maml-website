# MAML Website

Landing page for **Manhattan Academy of Music and Language** — a non-profit
music + language education organization. Vanilla HTML/CSS/JS, no build step.

## Files

```
MAML Website/
├── index.html         ← page structure + <template> for cards
├── styles.css         ← all styling (single font: Be Vietnam Pro)
├── modules.js         ← SSOT for trailer cards (module config)
├── script.js          ← engine: render, animate, mode logic
├── data/
│   ├── kinship.js            ← BANK_KINSHIP — speaker / kinship terms (SWAP tôi)
│   ├── an.js                 ← BANK_AN — verbs of consumption (SWAP ăn)
│   ├── com.js                ← BANK_DOI_TAC — food partners (SWAP cơm)
│   ├── addrem-head.js        ← BANK_HEAD — openers (ADD mở lời)
│   ├── addrem-aspect.js      ← BANK_THOI_GIAN — time/aspect particles (ADD thời gian)
│   ├── addrem-final.js       ← BANK_FINAL_PARTICLES — sentence-final particles (ADD)
│   ├── addrem-question.js    ← BANK_QUESTION — question markers + clamp templates (ADD)
│   ├── addrem-negation.js    ← BANK_NEGATION — shades of 'no' (ADD)
│   ├── addrem-modal.js       ← BANK_MODAL — will / duty / dare (ADD)
│   ├── addrem-com-state.js   ← BANK_COM_TRANG_THAI — rice qualifiers (ADD cơm nào)
│   └── addrem-an-mo.js       ← BANK_AN_MO — ăn+verb compounds (ADD nhân cách)

Filenames still carry the old `addrem-` prefix for historical
reasons (the type used to be called "addrem"). The runtime type
is now just `"add"` — see the Module types section below.
├── maml-logo.png      ← brand logo
└── CLAUDE.md          ← this file
```

Script load order in `index.html` matters: corpora in `data/` must
load **before** `modules.js`, which must load before `script.js`.

## Single Source of Truth

`modules.js` is the **only** place where module data lives. The engine,
the HTML template, and the CSS are all data-agnostic. To add a new SWAP
card, append an object to `window.MODULES`. Don't touch HTML, CSS, or
script.js.

```js
{
  id:        "swap-toi",
  type:      "swap",
  slot:      "toi",
  color:     "#d24a3d",
  target:    "tôi",
  sentence:  ["", "tôi", "ăn cơm"],
  role:      { en: "the one speaking", vi: "người đang nói" },
  bank: [
    { word: "tôi", en: "...", vi: "..." },
    ...
  ],
}
```

`bank[0]` is treated as the canonical word. The engine excludes the
current word when picking the next swap.

### Corpora

For large structured corpora (kinship, verb taxonomies, etc.) put a
verbatim copy in `data/<name>.js` and expose the structured object on
`window`. In the same file, derive a flat `[{word, en, vi}, ...]`
list and expose that too. `modules.js` then references the derived
list:

```js
// data/kinship.js
window.BANK_KINSHIP = { /* full corpus, untouched */ };
window.KINSHIP_BANK_DERIVED = deriveKinshipBank();

// modules.js
{ id: "swap-toi", ..., bank: window.KINSHIP_BANK_DERIVED }
```

**Never extract words from a corpus and inline them.** The corpus is
the source of truth; the runtime list is mechanical output. Future
edits to the corpus must propagate automatically.

## Architecture

```
modules.js  →  script.js  →  <template>  →  rendered cards
   data         engine        markup          DOM
                                ↓
                            styles.css
                       (CSS vars set by JS)
```

- **modules.js**: pure data, `window.MODULES = [...]`
- **index.html**: empty `.tac-library` + `<template id="tacModuleTemplate">`
- **script.js**: an IIFE that reads `MODULES`, clones the template per
  entry, sets per-card CSS custom properties, wires events
- **styles.css**: never references slot names. Cards style themselves
  via CSS variables that JS sets per card

### CSS variables JS sets per card

| Variable | Source | Purpose |
|---|---|---|
| `--accent` | **derived** `hsl(i/n·360 + 15, 62%, 42%)` | highlight color (active word, active card's top hairline) |
| `--shelf-x/y/z` | `computeShelf(n)[i]` | shelf position |
| `--shelf-roty/rotz` | `computeShelf(n)[i]` | shelf rotation |
| `--shelf-z-index` | `i + 1` | base z-index (active rule overrides) |
| `--breathe-delay` | `i * 0.6s` | idle pulse stagger |

Adding more cards extends the shelf automatically — `computeShelf(n)`
distributes any number of cards along a curved row, and hue auto-
spaces around the wheel so every card stays visually distinct.

### Colors are derived, not declared

**RULE.** A card's accent color is computed from its position in
the shelf using HSL, not hardcoded in `modules.js`. The formula
lives once in `script.js`:

```js
const hue = (i / cards.length) * 360 + 15;  // spaced around the wheel
card.el.style.setProperty("--accent", `hsl(${hue} 62% 42%)`);
```

- **Why derived**: adding a card is guaranteed to produce a hue
  distinct from every existing card — no manual color picking, no
  accidental clashes with prior choices. Saturation/lightness are
  tuned once for the Japanese/Swiss restraint palette (rich but
  not neon) and apply uniformly.
- **Do not** add a `color` field to module objects in
  `modules.js`. If you see one, it's a leftover — delete it.
- **Do not** hardcode accent colors in CSS. `--accent` is the
  only channel, and only JS writes it.
- **If you ever need to override** a specific card's hue
  (e.g. brand requirement), change the derivation formula in
  one place, not the data.

## Module types

Two types currently implemented, both using the same
`#tacModuleTemplate`:

- **`swap`** — one fixed slot in a fixed sentence rotates
  through a bank of words. `module.sentence` is `[left, active,
  right]` set at the module level; only the middle
  `.mod-word-active` rotates per flip. Bank entries are
  `{word, en, vi}`. Layout uses a `1fr | auto | 1fr` grid so
  the active word pins to the card's visual center.

- **`add`** — one or more words are added to the base sentence,
  possibly as a two-word template pair that clamps the verb
  from both sides (`có … đâu`, `đã … chưa`, `làm sao mà …
  được`). Each bank entry brings its own segment list:

  ```js
  {
    word: "có ... đâu",
    segments: [
      { text: "tôi",    hit: false },
      { text: "có",     hit: true  },
      { text: "ăn cơm", hit: false },
      { text: "đâu",    hit: true  },
    ],
    en: "...",
    vi: "...",
  }
  ```

  On render, the segments become child spans of
  `.mod-word-active` with classes `.seg-hit` (accent) or
  `.seg-mute` (muted context). On flip, the whole
  `.mod-word-active` rotates and `renderSegments()` rebuilds
  the children at the midpoint of the flip (when the container
  is edge-on and invisible). Multiple `hit: true` segments are
  supported natively — that's what makes template pairs work.
  The canonical `bank[0]` typically has `word: ""` and
  `segments: [{ text: "tôi ăn cơm", hit: true }]` so the card
  at rest shows its full accent-colored sentence.

### Authoring segments with the `+` shorthand

Data files use a compact `render: […]` array in each item and
convert it in `derive…Bank()`:

```js
{ vi: "có ... đâu",
  render: ["tôi", "+có", "ăn cơm", "+đâu"], … }
```

A string prefixed with `+` becomes `{ text: "có", hit: true }`;
any other string becomes a muted segment. Punctuation (commas
for openers, "?" for questions, "!" for exclamations) is baked
into the segment text, not a separate slot.

### Adding a new type

1. Add a new entry to `RENDERERS` in `script.js` that clones the
   template and fills its slots from the module object
2. Add a matching entry to `BEHAVIORS` with `pickNext`, `flip`,
   `reset` — both existing types share `buildQueueGeneric` /
   `pickNextGeneric` via the `word` uniqueness key
3. (If the markup differs) add a new `<template>` in `index.html`
4. Add a new `.tac-module[data-type="…"]` block in `styles.css`
   for any layout differences
5. Add module objects to `modules.js` with the new `type`

Engagement, mode handling, and idle auto-pull stay in the
generic engine — they work for any type that follows the
BEHAVIOR contract.

## Interaction model

The trailer has two modes:

- **AUTO** — entered only when the page is idle for 20s. The script
  auto-pulls a random card and swaps every 4s for 5 swaps, then closes.
- **USER** — entered when a person clicks/taps a card. No timer; each
  click on the active card advances one swap.

Tapping an active card that is in AUTO mode flips it to USER mode and
advances one swap immediately.

Closing the active card: the round `×` button, the **Esc** key, or
mousing out of the library (USER mode only).

## Visual & content rules

- **One font**: Be Vietnam Pro (300/400/600/800, italic). No other
  family. The "different font per cluster" approach has been retired.
- **English primary, Vietnamese secondary**. English in bold/main
  weight; Vietnamese underneath in smaller italic. This applies to
  every label: brand, eyebrow, role meta, hint, footer.
- **No Western part-of-speech labels.** Don't write *pronoun*, *verb*,
  *noun*, *đại từ*, *động từ*, *danh từ*. Words are described by their
  role in the utterance: *the one speaking*, *how it is taken in*,
  *what is on the plate*. Vietnamese tagging happens by position, not
  by Latinate category.
- **Centering is type-aware.**
  - **SWAP**: the slot word is always centered in the card. The
    sentence uses a `1fr | auto | 1fr` grid so the active word
    stays at the visual center while the surrounding words flex
    to either side. This works because SWAP's left and right
    contexts are symmetric-ish (both real words).
  - **ADDREM**: the whole sentence is centered as a unit via
    flex (`justify-content: center`). The particle sits wherever
    it naturally falls inside the sentence — sometimes right,
    sometimes left, sometimes in the middle. Forcing the
    particle to the card center with a grid would push long left
    contexts (e.g. "tôi ăn cơm" + final particle "chưa") into
    overlap with the middle column. Flex avoids this.
  - The split is implemented in styles.css via
    `.tac-module[data-type="swap"] .mod-sentence` vs
    `.tac-module[data-type="addrem"] .mod-sentence`.
- **The active card is fluid-width**, growing to fit longer swap
  variants (e.g. *ông bà Ngoại Hai*, or ADDREM's full inflected
  sentence). `width: auto; min-width: 660px; max-width: min(92vw, 960px)`.
- **Active card overlaps the shelf** — pulled forward via
  `translateZ` + `scale`, on top of the inactive row.
- **Restraint: Japanese / Swiss editorial — site-wide.** The rule
  applies to every surface, not only the trailer cards. A single
  `--radius: 2px` token governs every corner on the page; no
  rounded classic cards, no pill buttons, no background washes
  on hover, no translateY bounce. Topnav items are plain text
  with a 1px underline that scales in on hover. Pillars are
  sharp white slabs separated by a 1px vertical rule — no fill,
  no border-radius, no lift. Trailer cards are sharp white slabs
  with a subtle NEUTRAL grey elevation shadow. No colored glows,
  no halos. The accent color appears only on:
    1. the swapped word inside a trailer card (which is colored
       even on the shelf, so card identity is visible without
       ornament), and
    2. a single 2px hairline along the very top edge of the
       **active** card (Swiss accent stripe).
  Don't reintroduce colored box-shadows, neon halos, rounded
  classic-card corners, pill-shaped nav items, or grey hover
  backgrounds. The page is mostly white space and typography;
  color is a punctuation mark, not a wash.
- **Inactive cards stay solid, never transparent.** When a card is
  active, the others sink down + recede in Z (still 100% opaque).
  Transparency makes underlying text bleed through and become
  unreadable. When no card is active, the inactive cards return to
  their full natural shelf height.
- **Logo + brand name are not repeated as an H1** in the hero. The
  topbar already shows them.
- **Full-width breakout** for the trailer area. The `<main>` element
  has no max-width; `.pillars` and `.footer` set their own.

## Content rules (hardcoded)

Rules about what appears inside a card's `render` array. These are
**not** style preferences — they're locked in because every time
we've drifted, the shelf has ended up inconsistent and we've had
to sweep all ten banks to fix it. Don't undo any of this.

- **Lowercase by default. No capital at the start of a rendered
  sentence.** Write `tôi ăn cơm`, never `Tôi ăn cơm`. The cards
  are fragments, not complete sentences — treating them like
  sentences is a lie and forces an arbitrary reading tone.
- **No ending `.` or `!`.** Ever. Emotion and tone live in the
  bank's `nuance_vi/nuance_en` fields, not in visible
  punctuation on the word itself. Forcing `!` onto `trời ơi`
  locks in one emotional reading; leaving it off lets the card
  carry all of them. If you find yourself adding `!` to feel
  the intensity, that intensity belongs in the nuance, not the
  render.
- **`?` is the ONLY allowed ending punctuation.** Questions
  must carry `?` because rising intonation isn't visible on the
  page — without it a learner can't tell a question from a
  statement. Every item in the question bank bakes `?` into
  its final hit segment. This is the single exception to the
  "no ending punctuation" rule.
- **Commas INSIDE a rendered sentence are allowed.** They're
  structural — a pause after an opener like `dạ,` or `ê,` or
  `ủa,`. Bake them into the hit segment (`"+dạ,"`), not as a
  separate segment. Commas are not decorative, they mark a
  real pause in speech.
- **Proper nouns stay capitalized.** `Tết`, `Bắc Bộ`, `Nam Bộ`,
  `Chí Phèo`, etc. — everywhere they appear. Everything else
  stays lowercase, including proper English words like
  `vietnamese`, `southern`, `northern` when they're just
  dialect regions, not formal proper nouns.
- **The rule applies to EVERY rendered field on the card, not
  just the `render` array.** That includes `nuance_vi` and
  `nuance_en` (shown in the card footer), the module's
  `role.en` / `role.vi` (shown as meta), and the bank's
  `note`/`note_en` if they ever surface. Lowercase first
  letter, no ending `.`/`!`, no ALL-CAPS emphasis (`DUAL:`,
  `OVERLAP:`, `WITHIN` — rewrite without caps).
  - The `name`, `vi`, `en` short-label fields that DON'T render
    on the card (internal reference only) may stay however the
    corpus author wrote them — no need to sweep.
- **When adding a new bank**, audit every `render` before
  committing: run through the list and confirm lowercase,
  no `.`/`!`, `?` only on questions, proper nouns capitalized.
  It's faster to check once than to sweep ten files later.

## Performance rules (hardcoded)

These rules aren't optional polish — breaking them makes the shelf
visibly jank on every interaction (14 cards moving in parallel hits
the main thread instantly). The previous regression: cards were
transitioning `width` and `height`, no `will-change`, and visibly
stuttered every time `.has-active` toggled. Don't undo any of this.

- **`.tac-module` MUST have `will-change: transform` +
  `backface-visibility: hidden`.** This forces each card onto its
  own GPU compositor layer so all N cards can transform in
  parallel off the main thread. Without it, engaging/releasing a
  card makes the whole shelf stutter because the browser runs the
  transforms on CPU.
- **NEVER transition `width`, `height`, `top`, `left`, `margin`,
  or `padding` on `.tac-module`.** These properties trigger layout
  (reflow) and cannot be composited. Only `transform`, `opacity`,
  and `box-shadow` are allowed in the card's `transition` list.
  If the active card needs a size change, let it snap instantly —
  the `transform` movement is what the eye tracks anyway, and the
  size change disappears inside the 720ms bezier.
- **Size changes go through `transform: scale()`, not `width`/
  `height`.** The active card uses `scale(1.1)` to grow, which is
  composited. Don't animate real width/height "to make it smoother."
  That's exactly backwards.
- **Bezier is already tuned**: `cubic-bezier(.2, .7, .2, 1)` at
  720ms for shelf movement, 350ms at `(.6, .02, .4, 1)` for the
  flip. Don't swap these for linear/ease/ease-in-out — the "swift
  out" shape is what makes the shelf feel deliberate instead of
  floaty. If motion feels wrong, the cause is almost always
  layer promotion or a layout-triggering property, not the curve.
- **`.mod-word-active` has its own `will-change: transform, opacity`**
  for the flip. Don't remove it; the flip animation depends on it
  being a separate composited layer from the card.
- **When adding a new animated property**, check whether it's
  composited before adding it to any `transition` list. Rule of
  thumb: `transform` and `opacity` are free; everything else has
  a cost and most things trigger layout. If in doubt, don't
  transition it.

## Local preview

```
cd "Downloads/MAML Website" && python3 -m http.server 8912
open http://localhost:8912
```

(Port 8000 and 8765 are commonly busy; 8912 is the default we use.)

## Things to remember when extending

- **Don't reintroduce hardcoded `data-slot` rules in CSS.** Use CSS
  variables. The whole point of the refactor is that adding cards
  requires zero CSS edits.
- **Don't duplicate bank data anywhere outside `modules.js`.** Don't
  copy words into HTML. The `<template>` should have empty text nodes
  that the engine fills.
- **Don't mention POS categories** in any new card description.
- **Test the flip animation** when adding new card types — the swap
  behavior mutates the same DOM node in place to avoid race conditions
  with overlapping calls. Replacing nodes will reintroduce the
  "meta updates but word doesn't" bug we already fixed.
