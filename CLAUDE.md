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
│   ├── kinship.js     ← BANK_KINSHIP — speaker / kinship terms (slot tôi)
│   ├── an.js          ← BANK_AN     — verbs of consumption (slot ăn)
│   └── com.js         ← BANK_DOI_TAC — food partners (slot cơm)
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
| `--accent` | `module.color` | highlight color (active word, border) |
| `--shelf-x/y/z` | `computeShelf(n)[i]` | shelf position |
| `--shelf-roty/rotz` | `computeShelf(n)[i]` | shelf rotation |
| `--breathe-delay` | `i * 0.6s` | idle pulse stagger |

Adding more cards extends the shelf automatically — `computeShelf(n)`
distributes any number of cards along a curved row.

## Module types and how to add a new one

Currently only `type: "swap"` is implemented. To add a new type
(e.g. `addrem` or `overlapping`):

1. Add a new entry to `RENDERERS` in `script.js` that clones a template
   and fills its slots from the module object
2. Add a matching entry to `BEHAVIORS` with `pickNext`, `flip`, `reset`
3. (If the markup differs) add a new `<template>` in `index.html`
4. Add module objects to `modules.js` with the new `type`

Engagement, mode handling, and idle auto-pull stay in the generic
engine — they work for any type that follows the BEHAVIOR contract.

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
- **The swapped word is always centered in its card.** The sentence
  uses a `1fr | auto | 1fr` grid so the active word stays at the
  visual center while the surrounding words flex to either side.
- **The card resizes** to fit longer swap variants (e.g.
  *ông bà Ngoại Hai*).
- **Active card overlaps the shelf** — pulled forward via
  `translateZ` + `scale`, on top of the inactive row.
- **Restraint: Japanese / Swiss editorial.** Cards are sharp white
  slabs (border-radius 2px) with a subtle NEUTRAL grey elevation
  shadow. No colored glows, no halos. The accent color appears
  only on:
    1. the swapped word inside the card (which is colored even on
       the shelf, so card identity is visible without ornament), and
    2. a single 2px hairline along the very top edge of the
       **active** card (Swiss accent stripe).
  Don't reintroduce colored box-shadows, neon halos, or rounded
  classic-card corners. The page is mostly white space and
  typography; color is a punctuation mark, not a wash.
- **Inactive cards stay solid, never transparent.** When a card is
  active, the others sink down + recede in Z (still 100% opaque).
  Transparency makes underlying text bleed through and become
  unreadable. When no card is active, the inactive cards return to
  their full natural shelf height.
- **Logo + brand name are not repeated as an H1** in the hero. The
  topbar already shows them.
- **Full-width breakout** for the trailer area. The `<main>` element
  has no max-width; `.pillars` and `.footer` set their own.

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
