# Tooltip Component — Full Design System Reference

> **Source of truth:** Figma file `DAerIm4it2Gc5NWQKG8NDD` · Page: `Tooltip`
> **Implementation:** `/Users/suyang/Desktop/tooltip-component/src/`
> **Stack:** React 18 · TypeScript · Tailwind CSS v4 · Inter font
> **Last extracted:** March 2026

---

## Table of Contents

1. [Component Overview](#1-component-overview)
2. [Variants](#2-variants)
3. [Design Tokens — Color](#3-design-tokens--color)
4. [Design Tokens — Spacing & Shape](#4-design-tokens--spacing--shape)
5. [Design Tokens — Typography](#5-design-tokens--typography)
6. [Design Tokens — Effects](#6-design-tokens--effects)
7. [Color Primitives (Full Scale)](#7-color-primitives-full-scale)
8. [CSS Custom Properties (Tailwind v4 mapping)](#8-css-custom-properties-tailwind-v4-mapping)
9. [Component Structure (Figma layer tree)](#9-component-structure-figma-layer-tree)
10. [Props / API](#10-props--api)
11. [Beak Geometry](#11-beak-geometry)
12. [Interaction Model](#12-interaction-model)
13. [Dark Mode](#13-dark-mode)
14. [File Structure](#14-file-structure)

---

## 1. Component Overview

The Tooltip component surfaces supplementary information when users hover over (desktop) or tap (mobile) a trigger element. It is transient — it appears on interaction and disappears when the cursor or focus leaves. It is **not** used for critical information users must see to complete a task.

**Figma component set name:** `Tooltip-Desktop`
**Figma component set ID:** found in page `Tooltip`, node `Tooltip-light mode`
**Mobile component name:** `MobileTooltip` (bottom sheet, separate component)

---

## 2. Variants

### 2.1 Plain

- **Purpose:** Short label for icon-only buttons and nav items
- **Content:** Single line of text, no title, no action
- **Max width:** 280px (`whitespace-nowrap` enforced)
- **Placements:** Left · Right · Up · Down
- **Interactive:** No — pointer-events: none effectively (no actionable content)

### 2.2 Rich

- **Purpose:** Feature explanation on ⓘ info icons, contextual help
- **Content:** Optional title + body paragraph + optional "Learn more" action button
- **Max width:** 300px container, body text max-width 280px
- **Placements:** Left · Right · Up · Down
- **Interactive:** Yes — cursor can enter the tooltip to click "Learn more"
- **Toggle props:** `hasTitle` (show/hide title) · `hasAction` (show/hide action)

### 2.3 Data

- **Purpose:** Chart hover tooltip showing exact metric values
- **Content:** Optional title + optional time range label + 1–N data rows (legend dot + label + trend arrow + value)

- **Placements:** Left · Right · Up · Down
- **Interactive:** Yes — cursor can enter the tooltip to click "Learn more"
- **Toggle props:** `hasTitle` · `hasSubtitle` · `hasAction`

### 2.4 Mobile (MobileTooltip)

- **Purpose:** Bottom sheet on touch devices, triggered by tap on ⓘ
- **Content:** Drag handle + optional title + body paragraph + optional "Learn more" action
- **Width:** Full-width of container (`w-full`)
- **Border radius:** 16px top corners only (`rounded-t-[16px]`)
- **Dismissed by:** Tap outside the sheet or tap the action button

---

## 3. Design Tokens — Color

**Figma collection name:** `Color`
**Modes:** `Light` · `Dark`

All semantic tokens alias into the Color Primitives collection.

| Token Name | Light Value | Light Hex | Dark Value | Dark Hex |
|---|---|---|---|---|
| `Fill/Background/Tooltip` | Grey/800 | `#262626` | Grey/700 | `#404040` |
| `Fill/Background/Default` | Grey/50 | `#f9f9f9` | Grey/900 | `#171717` |
| `Fill/Background/Strong` | Grey/100 | `#f3f3f3` | Grey/800 | `#262626` |
| `Fill/Background/Overlay` | — | `#ffffff` | Grey/950 | `#0a0a0a` |
| `Fill/Background/Blanket` | — | `#00000099` | — | `#000000bf` |
| `Fill/Primary` | Brand/500 | `#006fff` | Brand/400 | `#4093ff` |
| `Fill/Primary-hover` | Brand/600 | `#005ed9` | Brand/300 | `#80b7ff` |
| `Fill/Primary-active` | Brand/700 | `#004eb2` | Brand/500 | `#006fff` |
| `Fill/Disabled` | Grey/200 | `#e5e5e5` | Grey/700 | `#404040` |
| `Text/Default` | Grey/900 | `#171717` | Grey/50 | `#f9f9f9` |
| `Text/Subtle` | Grey/500 | `#737373` | Grey/400 | `#a3a3a3` |
| `Text/Inverse` | Grey/50 | `#f9f9f9` | Grey/50 | `#f9f9f9` |
| `Text/Inverse-subtle` | Grey/300 | `#d4d4d4` | Grey/300 | `#d4d4d4` |
| `Text/Disabled` | Grey/400 | `#b0b0b0` | Grey/600 | `#525252` |
| `Text/Primary` | Brand/500 | `#006fff` | Brand/400 | `#4093ff` |
| `Text/Primary-on-dark` | Brand/400 | `#4093ff` | Brand/300 | `#80b7ff` |
| `Text/Primary-hover` | Brand/600 | `#005ed9` | Brand/300 | `#80b7ff` |
| `Text/Primary-active` | Brand/700 | `#004eb2` | Brand/400 | `#4093ff` |
| `Fill/Error/Default` | Red/500 | `#ef2b2b` | Red/500 | `#ef2b2b` |
| `Fill/Error/Subtle` | Red/100 | `#ffeded` | Red/900 | `#6b0808` |
| `Fill/Error/Strong` | Red/700 | `#b71212` | Red/300 | `#fc9191` |
| `Text/Error` | Red/700 | `#b71212` | Red/300 | `#fc9191` |
| `Fill/Success/Default` | Green/600 | `#15803d` | Green/500 | `#22c55e` |
| `Fill/Success/Subtle` | Green/100 | `#e0f9e7` | Green/900 | `#054d20` |
| `Fill/Success/Strong` | Green/700 | `#0e8c3d` | Green/300 | `#86e4a3` |
| `Text/Success` | Green/700 | `#0e8c3d` | Green/300 | `#86e4a3` |
| `Chart/Download` | — | `#4acfdc` | — | `#4acfdc` |
| `Chart/Upload` | — | `#d9adff` | — | `#d9adff` |
| `Chart/Latency` | — | `#dbc65d` | — | `#dbc65d` |
| `Chart/Loss` | — | `#e03030` | — | `#ff6b6b` |

> **Note:** `Chart/Loss` is the only chart token with a different dark value — it lightens from `#e03030` to `#ff6b6b` for better contrast on dark backgrounds.

### Token usage within Tooltip

| Slot | Token | Notes |
|---|---|---|
| Container background | `Fill/Background/Tooltip` | `#262626` light · `#404040` dark |
| Primary text (label, title) | `Text/Inverse` | `#f9f9f9` in both modes |
| Secondary text (time label, row labels) | `Text/Inverse-subtle` | `#d4d4d4` light · `#d4d4d4` dark |
| Action link (Learn more) | `Text/Primary-on-dark` | `#4093ff` light · `#80b7ff` dark |
| Action link hover | `Text/Primary-hover` | `#005ed9` light · `#80b7ff` dark |
| Download legend + value | `Chart/Download` | `#4acfdc` both modes |
| Upload legend + value | `Chart/Upload` | `#d9adff` both modes |
| Latency legend + value | `Chart/Latency` | `#dbc65d` both modes |
| Packet Loss legend + value | `Chart/Loss` | `#e03030` light · `#ff6b6b` dark |

---

## 4. Design Tokens — Spacing & Shape

**Figma collection name:** `Size`
**Mode:** `Default` (single mode — not theme-dependent)

### Spacing scale

| Token | Value (px) | Tooltip usage |
|---|---|---|
| `Space/0` | 0 | — |
| `Space/050` | 2 | — |
| `Space/100` | 4 | Outer gap (Rich & Data: between content block and action) |
| `Space/150` | 6 | — |
| `Space/200` | 8 | Content gap (Rich & Data: between stacked items) |
| `Space/300` | 12 | Container padding (all sides, all desktop variants) |
| `Space/400` | 16 | — |
| `Space/600` | 24 | Mobile: horizontal padding |
| `Space/800` | 32 | — |
| `Space/1200` | 48 | — |
| `Space/1600` | 64 | — |
| `Space/2400` | 96 | — |
| `Space/4000` | 160 | — |

### Border radius scale

| Token | Value (px) | Tooltip usage |
|---|---|---|
| `Radius/100` | 4 | — |
| `Radius/200` | 8 | Desktop tooltip container (`rounded-tooltip`) |
| `Radius/400` | 16 | MobileTooltip top corners (`rounded-t-sheet`) |
| `Radius/Full` | 9999 | Mobile drag handle pill (`rounded-full`) |

### Icon sizes

| Token | Value (px) |
|---|---|
| `Icon/Small` | 16 |
| `Icon/Medium` | 32 |


---

## 5. Design Tokens — Typography

### Text styles (Figma local styles)

| Style name | Font | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| `Display L` | Inter | 48px | Bold (700) | 56px | 0% |
| `Display M` | Inter | 40px | Bold (700) | 48px | 0% |
| `Display S` | Inter | 32px | Bold (700) | 40px | 0% |
| `Heading XL` | Inter | 24px | Semi Bold (600) | 32px | 0% |
| `Heading L` | Inter | 20px | Semi Bold (600) | 28px | 0% |
| `Heading M` | Inter | 16px | Semi Bold (600) | 24px | 0% |
| `Heading S` | Inter | 14px | Semi Bold (600) | 20px | 0% |
| `Body M` | Inter | 16px | Regular (400) | 24px | 0% |
| `Body S` | Inter | 14px | Regular (400) | 20px | 0% |
| `Body XS` | Inter | 12px | Regular (400) | 16px | 0% |
| `Action M` | Inter | 16px | Regular (400) | 24px | 0% |
| `Action S` | Inter | 14px | Regular (400) | 20px | 0% |

### Typography usage within Tooltip

| Slot | Text style | Size / Weight / LH |
|---|---|---|
| Plain label | `Body XS` | 12px / 400 / 16px |
| Rich title | `Heading S` | 14px / 600 / 20px |
| Rich body text | `Body XS` | 12px / 400 / 16px |
| Rich action link | `Action S` | 14px / 400 / 20px |
| Data title | `Heading S` | 14px / 600 / 20px |
| Data time range | `Body XS` | 12px / 400 / 16px |
| Data row labels | `Body XS` | 12px / 400 / 16px |
| Data row values | `Body XS` | 12px / 400 / 16px |
| Mobile title | `Heading M` | 16px / 600 / 24px |
| Mobile body | `Body S` | 14px / 400 / 20px |
| Mobile action link | `Action M` | 16px / 400 / 24px |

### Typography variable collection

**Figma collection name:** `Typography`
**Mode:** `Mode 1`

| Token | Resolved value |
|---|---|
| `Body/Size Extra Small` | 12px (`Scale 01`) |
| `Body/Size Small` | 14px (`Scale 02`) |
| `Body/Size Medium` | 16px (`Scale 03`) |
| `Heading/Size Small` | 14px (`Scale 02`) |
| `Heading/Size Medium` | 16px (`Scale 03`) |
| `Heading/Size Large` | 20px (`Scale 04`) |
| `Heading/Size Extra Large` | 24px (`Scale 05`) |
| `Action/Size Small` | 14px (`Scale 02`) |
| `Action/Size Medium` | 16px (`Scale 03`) |
| `Body/Font Weight Regular` | 400 (`Weight Regular`) |
| `Heading/Font Weight` | 600 (`Weight Semibold`) |
| `Display/Font Weight` | 700 (`Weight Bold`) |
| `Body/Font Family` | Inter (`Family Sans`) |
| `Heading/Font Family` | Inter (`Family Sans`) |
| `Action/Font Family` | Inter (`Family Sans`) |

---

## 6. Design Tokens — Effects

**Figma effect styles:**

| Style name | Type | Color | Offset | Blur | Spread |
|---|---|---|---|---|---|
| `Shadow light` | Drop shadow | `rgba(0,0,0,0.12)` | x:0 y:4 | 16px | 0 |
| `Shadow dark` | Drop shadow | `rgba(0,0,0,0.60)` | x:0 y:4 | 24px | 0 |

**Tooltip shadow (CSS):**
```css
/* Light mode — matches "Shadow light" */
box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);

/* Dark mode — matches "Shadow dark" */
box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.60);
```

---

## 7. Color Primitives (Full Scale)

**Figma collection name:** `Color Primitives`
**Mode:** `Value` (single mode — raw values only)

### Brand (Blue)

| Token | Hex |
|---|---|
| `Brand/50` | `#ebf3ff` |
| `Brand/100` | `#d9e9ff` |
| `Brand/200` | `#b2d4ff` |
| `Brand/300` | `#80b7ff` |
| `Brand/400` | `#4093ff` |
| `Brand/500` | `#006fff` ← primary brand |
| `Brand/600` | `#005ed9` ← hover |
| `Brand/700` | `#004eb2` ← active / pressed |
| `Brand/800` | `#003d8c` |
| `Brand/900` | `#002759` |
| `Brand/950` | `#001633` |

### Grey (Neutral)

| Token | Hex |
|---|---|
| `Grey/50` | `#f9f9f9` |
| `Grey/100` | `#f3f3f3` |
| `Grey/200` | `#e5e5e5` |
| `Grey/300` | `#d4d4d4` |
| `Grey/400` | `#b0b0b0` |
| `Grey/500` | `#737373` |
| `Grey/600` | `#525252` |
| `Grey/700` | `#404040` ← tooltip bg dark mode |
| `Grey/800` | `#262626` ← tooltip bg light mode |
| `Grey/900` | `#171717` |
| `Grey/950` | `#0a0a0a` |

### Slate (Blue-grey)

| Token | Hex |
|---|---|
| `Slate/50` | `#f8fafc` |
| `Slate/100` | `#f1f5f9` |
| `Slate/200` | `#e2e8f0` |
| `Slate/300` | `#cbd5e1` |
| `Slate/400` | `#94a3b8` |
| `Slate/500` | `#64748b` |
| `Slate/600` | `#475569` |
| `Slate/700` | `#334155` |
| `Slate/800` | `#1e293b` |
| `Slate/900` | `#0f172a` |
| `Slate/950` | `#020617` |

### Red (Error)

| Token | Hex |
|---|---|
| `Red/100` | `#ffeded` |
| `Red/300` | `#fc9191` |
| `Red/500` | `#ef2b2b` |
| `Red/700` | `#b71212` |
| `Red/900` | `#6b0808` |

### Green (Success)

| Token | Hex |
|---|---|
| `Green/100` | `#e0f9e7` |
| `Green/300` | `#86e4a3` |
| `Green/500` | `#22c55e` |
| `Green/600` | `#15803d` |
| `Green/700` | `#0e8c3d` |
| `Green/900` | `#054d20` |

### Chart colors (not on the Grey/Brand scale)

| Token | Hex (both modes) | Notes |
|---|---|---|
| `Chart/Download` | `#4acfdc` | Cyan |
| `Chart/Upload` | `#d9adff` | Lavender |
| `Chart/Latency` | `#dbc65d` | Amber |
| `Chart/Loss` Light | `#e03030` | Red |
| `Chart/Loss` Dark | `#ff6b6b` | Lightened red for contrast |

---

## 8. CSS Custom Properties (Tailwind v4 mapping)

The implementation maps Figma tokens to Tailwind CSS v4 `@theme` variables in `src/index.css`.

```css
@theme {
  /* Tooltip surface */
  --color-tooltip: #262626;           /* Fill/Background/Tooltip Light */

  /* Text on dark bg */
  --color-text-inverse: #f9f9f9;      /* Text/Inverse (both modes) */
  --color-text-inverse-subtle: #d4d4d4; /* Text/Inverse-subtle Light (Grey/300) */

  /* Action link */
  --color-action-primary: #4093ff;   /* Text/Primary-on-dark Light */
  --color-text-primary-hover: #005ed9; /* Text/Primary-hover Light */

  /* Chart tokens */
  --color-chart-download: #4acfdc;   /* Chart/Download */
  --color-chart-upload: #d9adff;     /* Chart/Upload */
  --color-chart-latency: #dbc65d;    /* Chart/Latency */
  --color-chart-loss: #e03030;       /* Chart/Loss Light */

  /* Shape */
  --radius-tooltip: 8px;             /* Radius/200 */
  --radius-sheet: 16px;              /* Radius/400 */
  --radius-full: 9999px;             /* Radius/Full */

  /* Shadow */
  --shadow-tooltip: 0px 4px 16px rgba(0, 0, 0, 0.12); /* Shadow light */

  /* Typography sizes */
  --text-body-xs:   12px;  /* Body XS */
  --text-body-s:    14px;  /* Body S */
  --text-heading-s: 14px;  /* Heading S */
  --text-heading-m: 16px;  /* Heading M */
  --text-action-s:  14px;  /* Action S */
  --text-action-m:  16px;  /* Action M */

  --font-family-sans: 'Inter', sans-serif;
}

/* Dark mode overrides — applied when .dark is on an ancestor */
.dark {
  --color-tooltip: #404040;              /* Fill/Background/Tooltip Dark */
  --color-text-inverse-subtle: #d4d4d4; /* Text/Inverse-subtle Dark (Grey/300, unchanged) */
  --color-action-primary: #80b7ff;      /* Text/Primary-on-dark Dark */
  --color-text-primary-hover: #4093ff;  /* Text/Primary-hover Dark */
  --color-chart-loss: #ff6b6b;          /* Chart/Loss Dark */
}
```

### Explicit utility class overrides (critical — Tailwind v4 @theme can mis-process these)

```css
.text-body-xs   { font-size: 12px; line-height: 16px; }
.text-body-s    { font-size: 14px; line-height: 20px; }
.text-heading-s { font-size: 14px; line-height: 20px; }
.text-heading-m { font-size: 16px; line-height: 24px; }
.text-action-s  { font-size: 14px; line-height: 20px; }
.text-action-m  { font-size: 16px; line-height: 24px; }
```

---

## 9. Component Structure (Figma layer tree)

### Tooltip-Desktop (Component Set)

**Figma component properties:**

| Figma property | Type | Default | React prop |
|---|---|---|---|
| `Type` | Variant | `Plain` | `type` |
| `Placement` | Variant | `Left` | `placement` |
| `Has Title` | Boolean | `true` | `hasTitle` |
| `Has Action` | Boolean | `true` | `hasAction` |
| `Has Subtitle` | Boolean | `true` | `hasSubtitle` |
| `Text Short` | Text | `"A few words to display the label"` | `textShort` |
| `Text Long` | Text | `"This is long text paragraph..."` | `textLong` |
| `Data List` | Slot | — | `dataRows` |

**Variants matrix:** `Type` × `Placement`
- Types: `Rich` · `Data` · `Plain`
- Placements: `Left` · `Right` · `Up` · `Down`
- Total variants: 12 (3 types × 4 placements)

#### Rich variant structure (representative)

```
COMPONENT "Type=Rich, Placement=Left"
  size: 304 × 120
  layout: VERTICAL
  padding: 12px all sides
  gap: 4px (Space/100 — outer gap between Content and Action)
  border-radius: 8px (Radius/200)
  fill: Fill/Background/Tooltip
  shadow: Shadow light
  ├── VECTOR "Beak"
  │     size: 8 × 8px (rotated 45° in design)
  │     fill: Fill/Background/Tooltip (matches container)
  │     position: varies per placement (see Beak Geometry)
  └── FRAME "Content"
        size: 280 × 60
        layout: VERTICAL
        gap: 8px (Space/200)
        ├── TEXT "Title"  → Heading S · Text/Inverse
        └── TEXT "Body text" → Body XS · Text/Inverse
  └── FRAME "Action"
        size: 75 × 32
        layout: VERTICAL
        └── INSTANCE "Button"
              TEXT "Learn more" → Action S · Text/Primary-on-dark
              hover: Text/Primary-hover
```

#### Data variant structure

```
COMPONENT "Type=Data, Placement=Left"
  size: 240 × 188 (with action) / 240 × 184 (without)
  layout: VERTICAL  |  padding: 12px all sides  |  gap: 4px  |  border-radius: 8px
  ├── VECTOR "Beak"  8×8
  └── FRAME "Content"  216×128  (VERTICAL, gap: 8px, hSizing: FILL)
        ├── TEXT "Title"    119×20  → Heading S · Text/Inverse           [hasTitle]
        ├── TEXT "Subtitle" 197×16  → Body XS · Text/Inverse-subtle      [hasSubtitle]
        └── SLOT "Data List"  216×76  (VERTICAL, gap: 4px, hSizing: FILL)
              each "Tooltip/Data Row"  216×16  (HORIZONTAL, justify: SPACE_BETWEEN, hSizing: FILL)
                ├── FRAME "Label"  (HORIZONTAL, gap: 4px)
                │     ├── RECTANGLE "Legend"  8×8  · fill: Chart/{color}  [hasLegend]
                │     └── TEXT (label)  → Body XS · Text/Inverse-subtle
                └── FRAME "Value"  (HORIZONTAL, gap: 4px)
                      ├── ICON arrow-up/arrow-down  16×16 · color: Chart/{color}  [hasIcon]
                      └── TEXT (value)  → Body XS · color: Chart/{color}
  └── FRAME "Action"  75×32  (shown when hasAction=true)
        └── INSTANCE "Button"  → Action S · Text/Primary-on-dark
```

#### Plain variant structure

```
COMPONENT "Type=Plain, Placement=Left"
  size: 205×40 (default label — expands with longer text, HUG both axes)
  layout: VERTICAL  |  padding: 12px  |  gap: 0  |  border-radius: 8px
  ├── VECTOR "Beak"  8×8
  └── FRAME "Content"  181×16  (VERTICAL, gap: 8px, HUG)
        └── TEXT "Body text"  181×16  → Body XS · Text/Inverse · whitespace-nowrap
```

### MobileTooltip (Separate component)

```
COMPONENT "Tooltip-Mobile-Rich"
  size: 390×188 (Figma canvas: phone width; React: w-full fills container)
  layout: VERTICAL  |  padding: top 24 / right 16 / bottom 24 / left 16  |  gap: 12px
  border-radius: 16px top corners only  |  fill: Fill/Background/Tooltip
  ├── FRAME "Handle"  358×12  (HORIZONTAL, justify: CENTER, padding-bottom: 8px, hSizing: FILL)
  │     └── RECTANGLE "Bar"  32×4  · border-radius: 9999  · fill: Text/Inverse-subtle
  ├── FRAME "Content"  358×72  (VERTICAL, gap: 8px, hSizing: FILL)
  │     ├── TEXT "Title"  358×24  hSizing:FILL  → Heading M · Text/Inverse   [hasTitle]
  │     └── TEXT "Body"   358×40  hSizing:FILL  → Body S · Text/Inverse
  └── FRAME "Action"  358×32  (VERTICAL, counter: CENTER, hSizing: FILL)     [hasAction]
        └── INSTANCE "Button"  358×32  (Button component, hSizing: FILL)
              layout: HORIZONTAL  |  gap: 8  |  pad: 6/0/6/0  |  primary: CENTER
              └── TEXT "Button"  75×20  → Action M · Text/Primary-on-dark
```

---

## 10. Props / API

### `<Tooltip />` — TypeScript interface

```typescript
export type TooltipType      = 'Plain' | 'Rich' | 'Data';
export type TooltipPlacement = 'Left'  | 'Right' | 'Up' | 'Down';
export type ChartColor       = 'download' | 'upload' | 'latency' | 'loss';

export interface DataRow {
  label:      string;
  value:      string;
  color:      ChartColor;
  trend?:     'up' | 'down' | null;
  hasLegend?: boolean;  // default: true  — Figma: "Has Legend" on Tooltip/Data Row
  hasIcon?:   boolean;  // default: true  — Figma: "Has Icon" on Tooltip/Data Row (trend arrow)
}

export interface TooltipProps {
  type?:         TooltipType;      // default: 'Plain'
  placement?:    TooltipPlacement; // default: 'Left'
  hasTitle?:     boolean;          // default: true  — Rich & Data only
  hasAction?:    boolean;          // default: true  — Rich & Data
  hasSubtitle?:  boolean;          // default: true  — Data only (Figma: "Has Subtitle")
  textShort?:    string;           // Plain only
  textLong?:     string;           // Rich only
  title?:        string;           // Rich & Data
  subtitle?:     string;           // Data only — text shown in subtitle slot when hasSubtitle=true
  dataRows?:     DataRow[];        // Data only
  onAction?:     () => void;       // Rich & Data — called on "Learn more"
  className?:    string;           // replaces default classes entirely
}
```

### Prop reference table

| Prop | Type | Default | Variants | Description |
|---|---|---|---|---|
| `type` | `'Plain'\|'Rich'\|'Data'` | `'Plain'` | All | Visual style; controls which slots render |
| `placement` | `'Left'\|'Right'\|'Up'\|'Down'` | `'Left'` | All desktop | Beak direction — which side the trigger is on |
| `hasTitle` | `boolean` | `true` | Rich, Data | Show/hide the title slot |
| `hasAction` | `boolean` | `true` | Rich, Data | Show/hide the "Learn more" button |
| `hasSubtitle` | `boolean` | `true` | Data | Show/hide the subtitle |
| `textShort` | `string` | `'A few words to display the label'` | Plain | Label text (whitespace-nowrap) |
| `textLong` | `string` | `'This is long text paragraph...'` | Rich | Body paragraph text |
| `title` | `string` | Rich: `'Approaching camera limit'` / Data: `'Apple messenger'` | Rich, Data | Title text |
| `subtitle` | `string` | `'Mar 18 10:00 AM - Mar 19 9:50 AM'` | Data | Subtitle text (e.g. time range) shown when `hasSubtitle=true` |
| `dataRows` | `DataRow[]` | Default 4-row network set | Data | Metric rows (Download, Upload, Latency, Loss) |
| `onAction` | `() => void` | `undefined` | Rich, Data | Callback when "Learn more" is clicked |
| `className` | `string` | `undefined` | All | Replaces all container classes when set |

### Default `dataRows` value

```typescript
const DEFAULT_DATA_ROWS: DataRow[] = [
  { label: 'Download',    value: '7.05 KB', color: 'download', trend: 'down' },
  { label: 'Upload',      value: '7.05 KB', color: 'upload',   trend: 'up'   },
  { label: 'Latency',     value: '1 ms',    color: 'latency',  trend: null   },
  { label: 'Packet Loss', value: '0 %',     color: 'loss',     trend: null   },
];
```

### `<MobileTooltip />` — TypeScript interface

**Figma component:** `Tooltip-Mobile-Rich`
**Figma properties:** `Has Title` (Boolean, default: true) · `Has Action` (Boolean, default: true)

```typescript
export interface MobileTooltipProps {
  hasTitle?:  boolean;       // default: true  — Figma: "Has Title"
  hasAction?: boolean;       // default: true  — Figma: "Has Action"
  title?:     string;        // default: 'Approaching camera limit'
  textLong?:  string;        // default: 'This is long text paragraph...'
  onAction?:  () => void;
  className?: string;
}
```

### `Anchor` (internal positioning wrapper)

Not exported. Used internally to position `<Tooltip />` instances.

```typescript
// Internal usage pattern
<Anchor placement="Left" tip={<Tooltip type="Plain" placement="Left" textShort="Label" />}>
  <button>Trigger</button>
</Anchor>
```

**Anchor behavior:**
- On `onMouseEnter`: calls `globalForceHide()` to close any open tooltip, then shows this one
- On `onMouseLeave`: starts 120ms debounce timer
- Portal div `onMouseEnter`: cancels the hide timer
- Portal div `onMouseLeave`: restarts the hide timer
- Portal renders into `document.body` via `React.createPortal`
- Portal div gets `className="dark"` when `DarkCtx` context value is `true`

---

## 11. Beak Geometry

The beak (directional arrow) is an 8×8px square rotated 45°.

**Geometry:**
- Inner square: 8 × 8px
- Diagonal of 8×8 square: 8 × √2 = **11.3137px** (used as `size-[11.314px]`)
- Fill: same as tooltip container background (`bg-tooltip`)
- The outer wrapper is centered at the edge — the inner square peeks out by half its diagonal

**CSS class per placement:**

| Placement | Meaning | Tailwind class |
|---|---|---|
| `Left` | Tooltip is left of trigger; beak points right | `absolute -right-[5.31px] top-1/2 -translate-y-1/2` |
| `Right` | Tooltip is right of trigger; beak points left | `absolute -left-[5px] top-1/2 -translate-y-1/2` |
| `Up` | Tooltip is above trigger; beak points down | `absolute -bottom-[5.31px] left-1/2 -translate-x-1/2` |
| `Down` | Tooltip is below trigger; beak points up | `absolute -top-[6px] left-1/2 -translate-x-1/2` |

**Why exact values matter:** Rounding to 11px creates a 0.3px gap where the page background bleeds through. Rounding to 12px causes a 0.7px dark corner artifact outside the tooltip.

---

## 12. Interaction Model

### Desktop hover flow

```
1. TRIGGER
   onMouseEnter → anchor element
   • Calls globalForceHide() to immediately close any currently open tooltip
   • Sets globalForceHide = this tooltip's forceHide function
   • Captures trigger's DOMRect via getBoundingClientRect()
   • Computes fixed-position style: DOMRect + GAP (10px) + placement

2. POSITION
   • React createPortal renders the Tooltip into document.body
   • Portal div: position:fixed, z-index:9999
   • Portal div gets className="dark" if DarkCtx === true

3. PERSIST (Rich & Data tooltips)
   • Portal div onMouseEnter → cancels the 120ms hide timer
   • Allows user to move cursor from anchor into tooltip to click "Learn more"
   • GAP = 10px bridge between anchor edge and tooltip edge
   • Plain has no interactive content — the hide timer fires normally

4. DISMISS
   • onMouseLeave on anchor OR tooltip → starts 120ms setTimeout
   • Timer fires → setRect(null) → portal unmounts
   • globalForceHide reference cleared

   OR:
   • New tooltip opening → globalForceHide() called immediately (no wait)
```

### Chart (Data) tooltip hover flow

The chart tooltip is not triggered by `Anchor` — it uses its own debounce pattern driven by SVG mouse events.

```
1. onMouseEnter on SVG data-point cell → handleChartEnter(i)
   • Cancels any pending hide timer
   • Computes fixed-position style from chart DOMRect + data-point coords
   • Sets hoveredIdx + tipStyle → portal mounts

2. onMouseLeave on SVG → handleChartLeave()
   • Starts 120ms timer — does NOT immediately hide
   • Allows cursor to travel across the GAP (10px) into the tooltip

3. Portal div onMouseEnter → cancelChartHide()
   • Cancels the timer — tooltip stays visible
   • User can now click "Learn more"

4. Portal div onMouseLeave → handleChartLeave()
   • Restarts the 120ms timer → tooltip unmounts
```

```typescript
const chartHideTimer = useRef<number | null>(null);

function cancelChartHide() {
  if (chartHideTimer.current) clearTimeout(chartHideTimer.current);
}
function handleChartLeave() {
  chartHideTimer.current = window.setTimeout(() => {
    setHoveredIdx(null);
    setTipStyle(null);
  }, 120);
}
```

### Single-at-a-time enforcement

```typescript
// Module-level (outside component) — NOT React state
let globalForceHide: (() => void) | null = null;

// In show():
if (globalForceHide && globalForceHide !== forceHide) globalForceHide();
globalForceHide = forceHide;

// In hide() timer:
if (globalForceHide === forceHide) globalForceHide = null;
```

### Mobile tap flow

```
1. User taps ⓘ button → onClick → setOpen(true)
2. MobileTooltip renders inside an absolute-positioned overlay (rgba(0,0,0,0.45) blanket)
3. Tap on blanket → onClick → setOpen(false)
4. Tap on "Learn more" → onAction() (caller-defined; typically setOpen(false))
```

### Positioning formula

```typescript
const GAP = 10; // px between anchor edge and tooltip edge

function getFixedStyle(rect: DOMRect, placement: TooltipPlacement): CSSProperties {
  switch (placement) {
    case 'Up':
      return { position:'fixed', bottom: window.innerHeight - rect.top + GAP,
               left: rect.left + rect.width/2, transform:'translateX(-50%)' };
    case 'Down':
      return { position:'fixed', top: rect.bottom + GAP,
               left: rect.left + rect.width/2, transform:'translateX(-50%)' };
    case 'Left':
      return { position:'fixed', right: window.innerWidth - rect.left + GAP,
               top: rect.top + rect.height/2, transform:'translateY(-50%)' };
    case 'Right':
      return { position:'fixed', left: rect.right + GAP,
               top: rect.top + rect.height/2, transform:'translateY(-50%)' };
  }
}
```

---

## 13. Dark Mode

### Mechanism

Dark mode is applied by adding the `dark` class to a parent element. Since tooltip portals render into `document.body` (outside the component tree), they will NOT inherit a `dark` class from a page ancestor.

**Solution:** Apply `dark` directly to each portal wrapper div, driven by React context.

```typescript
// Context definition (module-level, above Anchor)
const DarkCtx = React.createContext(false);

// In Anchor component:
const isDark = React.useContext(DarkCtx);
// ...
createPortal(
  <div className={isDark ? 'dark' : ''} style={...}>
    {tip}
  </div>,
  document.body
)

// In TooltipDemo (root):
<DarkCtx.Provider value={isDark}>
  {/* entire app */}
</DarkCtx.Provider>
```

### Token values by mode

| CSS custom property | Light | Dark |
|---|---|---|
| `--color-tooltip` | `#262626` | `#404040` |
| `--color-text-inverse` | `#f9f9f9` | `#f9f9f9` (unchanged) |
| `--color-text-inverse-subtle` | `#d4d4d4` | `#d4d4d4` (unchanged) |
| `--color-action-primary` | `#4093ff` | `#80b7ff` |
| `--color-text-primary-hover` | `#005ed9` | `#4093ff` |
| `--color-chart-loss` | `#e03030` | `#ff6b6b` |

> `MobileTooltip` always renders in dark mode. Its container has `className="dark"` hardcoded regardless of page theme.

---

## 14. File Structure

```
tooltip-component/
├── src/
│   ├── Tooltip.tsx          # Main tooltip component (Plain/Rich/Data)
│   │                        # Exports: Tooltip (default), TooltipType, TooltipPlacement,
│   │                        #          ChartColor, DataRow, TooltipProps
│   ├── MobileTooltip.tsx    # Mobile bottom-sheet variant
│   │                        # Exports: MobileTooltip (default), MobileTooltipProps
│   ├── TooltipDemo.tsx      # Full interactive demo (UniFi interface simulation)
│   │                        # Contains: Anchor, DarkCtx, chart data, FEATURES array
│   ├── index.css            # Tailwind v4 @theme tokens + dark mode overrides
│   └── main.tsx             # React entry point
├── package.json
├── vite.config.ts
└── TOOLTIP_DESIGN_SYSTEM.md  # ← this file
```

### Key implementation constants in `TooltipDemo.tsx`

```typescript
const GAP = 10;                    // px gap between anchor and tooltip
// Chart SVG viewport
const VW = 1000, VH = 260;        // SVG viewBox width/height
const PL = 42, PR = 16;           // left/right padding inside chart
const PT = 90, PB = 30;           // top/bottom padding inside chart
const N  = 28;                    // data points (7 days × 4 per day)
```

### Tailwind class reference (key classes used on Tooltip)

| Purpose | Class |
|---|---|
| Container bg | `bg-tooltip` → `var(--color-tooltip)` |
| Container radius | `rounded-tooltip` → `var(--radius-tooltip)` = 8px |
| Container shadow | `shadow-tooltip` → `var(--shadow-tooltip)` |
| Primary text | `text-text-inverse` |
| Secondary text | `text-text-inverse-subtle` |
| Action link | `text-action-primary` |
| Action hover | `hover:text-text-primary-hover` |
| Chart download | `bg-chart-download` / `text-chart-download` |
| Chart upload | `bg-chart-upload` / `text-chart-upload` |
| Chart latency | `bg-chart-latency` / `text-chart-latency` |
| Chart loss | `bg-chart-loss` / `text-chart-loss` |
| Body XS text | `text-body-xs` → 12px / 16px |
| Body S text | `text-body-s` → 14px / 20px |
| Heading S text | `text-heading-s` → 14px / 20px |
| Heading M text | `text-heading-m` → 16px / 24px |
| Action S text | `text-action-s` → 14px / 20px |
| Action M text | `text-action-m` → 16px / 24px |
| Container padding | `p-3` → 12px |
| Content gap (Rich/Data) | `gap-2` → 8px |
| Outer gap (Rich) | `gap-1` → 4px |
| Beak outer size | `size-[11.314px]` |
| Beak inner | `size-2 rotate-45` → 8×8px rotated 45° |

---

*End of document. All values sourced directly from Figma file `DAerIm4it2Gc5NWQKG8NDD` and the React implementation at `/Users/suyang/Desktop/tooltip-component/src/`.*
