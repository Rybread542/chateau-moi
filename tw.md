# Tailwind CSS v4 — Cheat Sheet

Quick reference for building components on the personal site / blog project.
Stack assumptions: **Tailwind v4**, Next.js App Router, shadcn/ui, dark mode via
`next-themes`, `@tailwindcss/typography` for blog content.

> Open this in a side VSCode pane. Ctrl/Cmd-F is your friend.

---

## 0. v4 GOTCHAS — read once, save yourself an hour

These are the classes most likely to bite you, because old tutorials, Stack
Overflow answers, and even editor autocomplete will hand you the **v3** name.
The class still "exists" in some cases but renders differently.

| You might type (v3) | Use this instead (v4) | Note |
|---|---|---|
| `shadow`            | `shadow-sm`        | the whole shadow scale slid down one step |
| `shadow-sm`         | `shadow-xs`        | |
| `rounded`           | `rounded-sm`       | radius scale also slid one step |
| `rounded-sm`        | `rounded-xs`       | |
| `blur` / `blur-sm`  | `blur-sm` / `blur-xs` | same one-step slide |
| `outline-none`      | `outline-hidden`   | `outline-none` now means literal `outline: none` |
| `ring`              | `ring` is now **1px** (was 3px) | use `ring-3` for the old look |
| `bg-opacity-50`     | `bg-black/50`       | opacity is now a `/number` modifier on the color |
| `text-opacity-70`   | `text-white/70`     | same slash syntax everywhere |
| `bg-gradient-to-r`  | `bg-linear-to-r`    | gradients renamed to match CSS |
| `flex-shrink-0`     | `shrink-0`          | |
| `flex-grow`         | `grow`              | |
| `!bg-red-500`       | `bg-red-500!`       | the `!important` marker moved to the **end** |

Two default-value changes (no class involved, just different looks):

- **Border color** defaults to `currentColor` in v4. Always set a border color
  explicitly — e.g. `border border-border` (shadcn token) or `border-zinc-200`.
  A bare `border` may look like the text color, not a neutral gray.
- **Ring color** defaults to `currentColor` (was blue). Set it: `ring-2 ring-ring`.

Also good to know: **no `tailwind.config.js`** in v4. Theme customization lives in
`globals.css` under `@theme { }`, and shadcn sets that up for you.

---

## 1. The spacing scale (the thing you'll look up most)

Almost every spacing/size class takes a number. The number is a **multiple of
0.25rem**:

```
number × 0.25rem = size      (or: number × 4 = pixels)
```

| Class number | rem      | px   |
|---|---|---|
| `0`   | 0       | 0px   |
| `px`  | —       | 1px   |
| `0.5` | 0.125rem| 2px   |
| `1`   | 0.25rem | 4px   |
| `2`   | 0.5rem  | 8px   |
| `3`   | 0.75rem | 12px  |
| `4`   | 1rem    | 16px  |
| `6`   | 1.5rem  | 24px  |
| `8`   | 2rem    | 32px  |
| `10`  | 2.5rem  | 40px  |
| `12`  | 3rem    | 48px  |
| `16`  | 4rem    | 64px  |
| `24`  | 6rem    | 96px  |

This scale is used by `p-`, `m-`, `gap-`, `w-`, `h-`, `top-`, `space-`, etc.

---

## 2. Layout

### Display
```
block  inline-block  inline  flex  inline-flex  grid  inline-grid
hidden            /* display: none */
contents
```

### Flexbox
```
flex                          /* turn on flex */
flex-row  flex-col            /* main axis direction */
flex-row-reverse  flex-col-reverse
flex-wrap  flex-nowrap

justify-start  justify-center  justify-end
justify-between  justify-around  justify-evenly   /* main-axis alignment */

items-start  items-center  items-end  items-stretch  items-baseline
                              /* cross-axis alignment */
self-center  self-start  self-end   /* override alignment for one child */

gap-4   gap-x-2   gap-y-6     /* spacing between flex/grid children (preferred) */

grow  grow-0                  /* flex-grow */
shrink  shrink-0              /* flex-shrink */
basis-0  basis-1/2  basis-full
order-1  order-first  order-last
```

### Grid
```
grid
grid-cols-1 ... grid-cols-12  /* fixed column count */
grid-cols-[200px_1fr]         /* arbitrary track sizes */
col-span-2  col-start-1  col-end-3
grid-rows-3  row-span-2
gap-6  gap-x-4  gap-y-8
auto-cols-fr  auto-rows-min
place-items-center            /* center items in both axes */
place-content-between
```

### Common full-page patterns
```
min-h-screen                  /* fill viewport height */
mx-auto                       /* center a fixed-width block horizontally */
container                     /* NOTE: v4 container has no built-in padding/centering */
```

---

## 3. Spacing (padding / margin)

```
p-4    px-6   py-2   pt-4 pr-2 pb-4 pl-2     /* padding: all / x / y / sides */
m-4    mx-auto  my-8  mt-0  -mt-4            /* margin (negative allowed) */
space-x-4  space-y-2     /* gap BETWEEN children of a flex/stack (older idiom) */
```
Prefer `gap-*` over `space-*` when the parent is `flex`/`grid` — cleaner.

---

## 4. Sizing

```
w-4  w-1/2  w-full  w-screen  w-fit  w-min  w-max  w-auto
h-4  h-full  h-screen  h-dvh                  /* dvh = dynamic viewport height */
size-10                  /* sets width AND height together (v4) */

min-w-0  min-h-screen
max-w-md  max-w-2xl  max-w-prose  max-w-none  /* see content-width sizes below */
max-h-96
aspect-square  aspect-video  aspect-[4/3]     /* aspect ratio */
```

Content max-width sizes (handy for page wrappers):
```
max-w-sm(384px)  max-w-md(448px)  max-w-lg(512px)  max-w-xl(576px)
max-w-2xl(672px)  max-w-3xl(768px)  max-w-4xl(896px)  max-w-prose(~65ch)
```

---

## 5. Typography (big for a blog)

### Family / size / weight
```
font-sans  font-serif  font-mono

text-xs(12) text-sm(14) text-base(16) text-lg(18) text-xl(20)
text-2xl(24) text-3xl(30) text-4xl(36) text-5xl(48) text-6xl(60)

font-light(300) font-normal(400) font-medium(500)
font-semibold(600) font-bold(700) font-extrabold(800)
```

### Spacing / alignment / decoration
```
leading-none  leading-tight  leading-snug  leading-normal  leading-relaxed
                              /* line-height */
tracking-tight  tracking-normal  tracking-wide       /* letter-spacing */
text-left  text-center  text-right  text-justify

underline  no-underline  line-through
decoration-2  decoration-wavy  underline-offset-4
uppercase  lowercase  capitalize  normal-case
italic  not-italic
```

### Text behavior (useful for cards, titles, previews)
```
truncate                      /* 1 line + ellipsis */
line-clamp-3                  /* clamp to N lines + ellipsis */
text-balance                  /* nicer multi-line heading wrapping */
text-pretty                   /* avoids orphan words in paragraphs */
break-words  whitespace-nowrap
```

### Color & opacity
```
text-zinc-900  text-white  text-red-500
text-foreground  text-muted-foreground       /* shadcn tokens — prefer these */
text-white/70                                 /* color at 70% opacity */
```

---

## 6. Backgrounds, colors, gradients

```
bg-white  bg-zinc-100  bg-zinc-900
bg-background  bg-card  bg-muted  bg-primary  /* shadcn tokens — prefer these */
bg-black/50                                   /* 50% opacity */
bg-transparent  bg-current  bg-inherit

/* Gradients (v4 names) */
bg-linear-to-r  bg-linear-to-br  bg-linear-45 /* direction or angle */
bg-radial  bg-conic
from-blue-500  via-purple-500  to-pink-500    /* gradient color stops */
```

Color scales run `50 100 200 ... 900 950` (e.g. `zinc-50` lightest → `zinc-950`
darkest). Common neutral families: `zinc  slate  gray  neutral  stone`.

---

## 7. Borders, radius, rings, outline

```
border  border-2  border-t  border-x         /* width / sides */
border-border  border-zinc-200               /* ALWAYS set a color in v4 */
border-dashed  border-dotted

rounded-xs  rounded-sm  rounded-md  rounded-lg  rounded-xl  rounded-2xl
rounded-full                                  /* pill / circle */
rounded-t-lg  rounded-l-md                    /* per-side */

divide-y  divide-x  divide-zinc-200           /* borders between children */

ring-2  ring-ring  ring-offset-2              /* focus ring; set the color */
outline-hidden                                /* hide outline accessibly */
outline-2  outline-blue-500
```

Focus state for inputs/buttons (accessible default):
```
focus-visible:ring-2  focus-visible:ring-ring  focus-visible:outline-hidden
```

---

## 8. Effects (shadow / opacity / blur)

```
shadow-xs  shadow-sm  shadow-md  shadow-lg  shadow-xl  shadow-2xl  shadow-none
opacity-0  opacity-50  opacity-100
blur-xs  blur-sm  blur-md  blur-lg
backdrop-blur-sm  backdrop-blur-md           /* frosted-glass over content */
mix-blend-multiply
```

---

## 9. Position / layering

```
static  relative  absolute  fixed  sticky
inset-0                       /* top/right/bottom/left all 0 */
top-0  right-4  bottom-0  left-1/2
z-0  z-10  z-50  z-auto
sticky top-0                  /* classic sticky header combo */
```

---

## 10. Responsive design (mobile-first)

Unprefixed = applies at all sizes. A prefix means "**at this width and up**."
So you style mobile first, then add overrides for larger screens.

```
sm: 640px    md: 768px    lg: 1024px    xl: 1280px    2xl: 1536px
```

```html
<!-- 1 column on mobile, 2 cols ≥768px, 3 cols ≥1024px -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- hidden on mobile, shown as flex from md up -->
<nav class="hidden md:flex">
```

Container queries (built into v4 — size by parent, not viewport):
```
@container            /* on the parent */
@md:flex  @lg:grid-cols-2   /* on children, react to container width */
```

---

## 11. State variants (hover, focus, dark, group, etc.)

Prefix any utility with a state. Stack them left to right.
```
hover:bg-zinc-100   focus:ring-2   active:scale-95   disabled:opacity-50
focus-visible:ring-2                 /* keyboard focus only — preferred */
dark:bg-zinc-900                     /* dark mode (class-based here) */

first:pt-0   last:border-0   odd:bg-zinc-50   even:bg-white
hover:dark:bg-zinc-800               /* combine variants */
```

### group / peer (style based on a parent or sibling's state)
```html
<!-- child reacts to PARENT hover -->
<a class="group">
  <span class="text-zinc-500 group-hover:text-zinc-900">→</span>
</a>

<!-- element reacts to a SIBLING's state (e.g. input → label) -->
<input class="peer" />
<p class="hidden peer-invalid:block text-red-500">Required</p>
```

---

## 12. Transitions, animation, transforms

```
transition  transition-colors  transition-transform  transition-all
duration-150  duration-300   ease-in-out  ease-out   delay-100

animate-spin  animate-pulse  animate-bounce  animate-none

scale-95  scale-105   rotate-3  -rotate-6   translate-x-2  translate-y-1
origin-center  origin-top-left
```
Typical interactive button motion: `transition-colors hover:bg-primary/90`.

---

## 13. Interactivity / misc

```
cursor-pointer  cursor-not-allowed  cursor-default
select-none  select-text
pointer-events-none  pointer-events-auto
overflow-hidden  overflow-auto  overflow-x-scroll
overscroll-contain
scroll-smooth   scroll-mt-20        /* offset for sticky-header anchor jumps */
list-disc  list-decimal  list-none
object-cover  object-contain        /* for <img> fitting */
```

---

## 14. Dark mode (this project's setup)

Dark mode here is **class-based** via `next-themes` (a `.dark` class on `<html>`),
not OS preference. The winning habit: **use semantic tokens** so you rarely write
a `dark:` variant at all.

```html
<!-- Brittle: must hand-write every dark variant -->
<div class="bg-white text-black dark:bg-zinc-900 dark:text-white">

<!-- Preferred: tokens flip automatically when .dark is set -->
<div class="bg-background text-foreground">
```
Reach for explicit `dark:` only for one-off cases the tokens don't cover.

---

## 15. shadcn semantic color tokens (use these constantly)

These are CSS variables shadcn defines for light + dark in `globals.css`. Each
has a paired `-foreground` for text that sits on top of it.

```
bg-background      text-foreground          /* page base */
bg-card            text-card-foreground     /* raised surfaces */
bg-popover         text-popover-foreground  /* menus, dropdowns */
bg-primary         text-primary-foreground  /* main action color */
bg-secondary       text-secondary-foreground
bg-muted           text-muted-foreground    /* subtle bg / dimmed text */
bg-accent          text-accent-foreground   /* hover highlights */
bg-destructive     text-destructive-foreground  /* delete / errors */
border-border      bg-input      ring-ring
```
Rule of thumb: background + its matching `-foreground` = guaranteed readable in
both themes.

---

## 16. Blog content — `@tailwindcss/typography` (`prose`)

For markdown rendered to HTML you don't control element-by-element, wrap it once.
Utilities can't reach those generated `<h1>`/`<p>`/`<blockquote>` tags — `prose` can.

```html
<article class="prose dark:prose-invert max-w-none">
  <!-- react-markdown output goes here -->
</article>
```

```
prose-sm  prose  prose-lg  prose-xl        /* overall scale */
dark:prose-invert                          /* dark mode for prose */
max-w-none                                 /* remove prose's ~65ch cap if you want full width */
prose-zinc  prose-slate                    /* gray tone of the prose theme */

/* Tweak specific generated elements: */
prose-headings:font-semibold
prose-a:text-primary  prose-a:no-underline
prose-img:rounded-lg
prose-code:text-pink-500
prose-pre:bg-zinc-900
```

---

## 17. Arbitrary values (the escape hatch — before reaching for CSS)

When the scale doesn't have what you need, use `[ ]`. Underscores become spaces.

```
top-[117px]            w-[37rem]            text-[13px]
bg-[#1da1f2]           grid-cols-[200px_1fr]
text-[length:var(--my-size)]               /* read a CSS variable */
[mask-image:linear-gradient(black,transparent)]   /* any raw CSS property */
```
Prefer scale values; use arbitrary values for genuine one-offs. If you're doing
this constantly for the same thing, add a token to `@theme` in `globals.css`.

---

## 18. Ready-to-paste recipes for this project

```html
<!-- Page wrapper: centered, readable width, side padding -->
<main class="mx-auto max-w-3xl px-4 py-12">

<!-- Vertical stack with even spacing -->
<div class="flex flex-col gap-4">

<!-- Center one element both axes, full height -->
<div class="flex min-h-screen items-center justify-center">

<!-- Responsive card grid -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

<!-- Card (shadcn tokens) -->
<div class="rounded-lg border border-border bg-card p-6 shadow-sm">

<!-- Sticky translucent nav -->
<header class="sticky top-0 z-50 border-b border-border
               bg-background/80 backdrop-blur">

<!-- Button base -->
<button class="inline-flex items-center justify-center rounded-md
               bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
               transition-colors hover:bg-primary/90
               focus-visible:ring-2 focus-visible:ring-ring
               disabled:opacity-50 disabled:pointer-events-none">

<!-- Muted secondary text -->
<p class="text-sm text-muted-foreground">

<!-- Blog post body -->
<article class="prose dark:prose-invert max-w-none">
```

---

## 19. When a class isn't applying — quick debug checklist

1. **Typo / wrong v4 name?** Check section 0. (`shadow` vs `shadow-sm`, etc.)
2. **File not scanned?** v4 auto-detects, but content in odd locations may need
   an `@source` line in `globals.css`.
3. **Dynamic class string?** Tailwind only sees *complete* class names in source.
   `` `bg-${color}-500` `` won't work — it can't see it. Use full strings or a
   lookup map: `{ red: 'bg-red-500', blue: 'bg-blue-500' }[color]`.
4. **Specificity fight with a component?** A shadcn component may already set the
   property; your class may need to come from the component's own `className`
   prop, or use `cn()` to merge (shadcn ships `tailwind-merge` for exactly this).
5. **Border/ring looks wrong?** You probably forgot the explicit color (v4
   default is `currentColor`).
```