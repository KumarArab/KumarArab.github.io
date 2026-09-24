# arabkumar.in — Portfolio v2 Plan

The old site (2020, "The Flutter Guy", jQuery + Bootstrap template) is being replaced
with an immersive, motion-heavy portfolio. The old content is the starting point only.

Domain: **arabkumar.in** (hosted on GitHub Pages from this repo).

---

## 1. How those "Instagram-famous" sites are actually built

They use the same small toolkit over and over:

| Effect you see | What makes it |
|---|---|
| 3D objects, shaders, particles, glassy blobs | **Three.js** via **React Three Fiber** + **drei** helpers |
| Buttery smooth scroll | **Lenis** |
| Things that animate *as you scroll* (pin, scrub, reveal) | **GSAP + ScrollTrigger** |
| Text splitting into letters/words that fly in | GSAP **SplitText** (free since 2025) |
| Page-to-page transitions | View Transitions API / Framer Motion `AnimatePresence` |
| Custom cursor, magnetic buttons | ~50 lines of custom JS |
| Grain, noise, distortion on images | Custom GLSL fragment shaders |
| Loading screen with counter | Preload assets and animate progress 0→100 |

The rest comes from **restraint**: 2 fonts, 2–3 colours, lots of empty space, big type,
and motion that always has a purpose.

## 2. Tech stack

- **Vite + React + TypeScript**: fast and simple. Builds to static files for GitHub Pages.
- **@react-three/fiber, @react-three/drei, @react-three/postprocessing**: 3D.
- **gsap** (+ ScrollTrigger, SplitText): scroll and text choreography.
- **lenis**: smooth scroll.
- **motion** (Framer Motion): UI micro-interactions and route transitions.
- **react-router**: separate case-study pages per project.
- **Content as data**: `src/content/projects.ts` so new projects are one entry, not new HTML.
- **Deploy**: GitHub Actions → GitHub Pages, `public/CNAME` = `arabkumar.in`.

## 3. Chosen direction: "Two Sides" (Developer × Creator)

Supersedes the A/B/C concepts below. Prototype: `prototypes/split-landing.html`.

- **Landing**: full screen split, **blue = creator (left)**, **yellow = developer (right)**.
  The boundary is liquid. Moving toward a side makes that colour flood the screen, which uncovers
  that side's content. The name "Arab Kumar" straddles the line and flips colour as the liquid passes.
  Click or tap to commit, and the liquid fills the screen as the page transition.
- **Each side is its own world with its own design language**:
  - Developer / "The Workshop" (yellow + ink + monospace): structured, precise, engineering feel.
    Sections: Now → Experience (commit-log timeline) → Shipped apps (3D phones + store links + installs)
    → Stack → Hire me.
  - Creator / "The Studio" (cobalt + cream + serif italic): editorial, expressive, video-first, 9:16 frames.
    Sections: Reach (live counters) → Pages (phone frames playing reels) → YouTube → Brand/UGC
    case studies → Collaborate (media kit).
- **Always switchable**: a small liquid toggle pill in the corner floods to the other side.
- **Where they meet = green** (yellow + blue). The About/Contact page, "the whole person",
  is the only green page. Reached from the bottom of either side.
- **Two audiences, two CTAs**: dev → "Hire me / start a project"; creator → "Collaborate / media kit".
- Routes: `/` (split) · `/dev` · `/creator` · `/me` (green) · `/dev/work/:slug` · `/creator/brands/:slug`.
- Mobile: no hover, so tap a side or drag to flood. Side panels reveal only as a side takes over.

## 3b. Earlier concepts (not chosen)

**A. "The Deck" (recommended).** It uses the cardistry hobby as the core idea.
The hero is a 3D deck of playing cards floating in space. It reacts to the cursor, and on
scroll the cards riffle-shuffle and fan out. **Each card is a project**: its face shows the
project art. Clicking a card flips it and zooms into the case study. The concept is memorable,
personal, and nobody else has it.

**B. "Terminal → World".** The page opens as a fake terminal (`> whoami`). Typing or clicking
"boots" the 3D world: a low-poly desk or room with objects linking to sections.
This is a common idea, but it lands well with devs and recruiters.

**C. "Lens".** Photography is the idea. The hero is a 3D camera lens, and scrolling
"zooms through" it into each section. Project images use a lens-distortion shader on hover.

## 4. Site structure

```
/                    Home (single long scroll, pinned chapters)
/work/:slug          Case study page per project
/archive             Full list of every project (filterable)
/play                (optional) experiments, photography, fun stuff
```

### Home: scroll chapters

0. **Preloader**: counter 0→100, then name letters stagger in and the curtain wipes to the hero.
1. **Hero**: 3D scene (concept A/B/C), big name, a one-line role, scroll cue.
   Magnetic cursor and mouse-parallax on the scene.
2. **Manifesto / About**: 2–3 lines of big text. Words light up as you scroll (scrubbed opacity).
   Small portrait with a hover distortion shader.
3. **Selected Work (4–6 featured)**: pinned section. Either the cards fan out horizontally
   (concept A) or a horizontal-scroll gallery. Each item shows title, year, stack, and a 1-line result.
   Clicking it opens a **shared-element transition** into the case study.
4. **Numbers / Impact**: animated counters (users, downloads, revenue, years, YouTube subs).
5. **Experience timeline**: vertical line that draws itself on scroll, with roles popping in.
6. **Stack / Skills**: 3D physics "ball pit" of tech logos you can push with the cursor,
   or an infinite marquee. No percentage bars.
7. **Beyond code**: hobbies as a horizontal strip, with photography gallery, hip-hop,
   markets, and cardistry (a short card-flourish loop).
8. **Contact**: a huge "Let's talk" that follows the cursor, email copy-on-click, socials,
   and a footer showing your live local time (IST).

### Case study page template (`/work/:slug`)
Hero image/video → Overview (role, timeline, stack, links) → Problem → What I built →
Key screens (parallax gallery) → Results/metrics → Next project (with transition).

### Archive page
Big typographic list. Hovering a row shows a floating image preview that follows the cursor.
Filters: All / Mobile / Web / SaaS / AI / Client / Open-source.

## 5. Non-negotiables (so it's cool AND usable)

- **Performance**: 3D lazy-loads after first paint. Models compressed (Draco/KTX2) and < 2 MB total.
  Target Lighthouse perf ≥ 85 on mobile.
- **Mobile**: a lighter 3D scene with fewer particles and no heavy post-processing. Touch-friendly.
- **`prefers-reduced-motion`**: disables scroll-jacking and heavy animation.
- **SEO**: real HTML text (not text drawn in canvas), meta/OG images per project, sitemap.
- **Recruiter escape hatch**: the resume PDF and a "skip the fancy stuff" link are always visible.

## 6. Build phases

1. Scaffold (Vite/React/TS), design tokens, fonts, Lenis + GSAP setup, deploy pipeline + domain.
2. Content model + all sections in plain HTML/CSS (static but complete).
3. Motion layer: preloader, text reveals, pinned sections, page transitions, cursor.
4. 3D layer: hero scene + project cards/gallery interaction.
5. Case study pages + archive.
6. Polish: mobile scene, reduced motion, SEO/OG images, Lighthouse pass.

## 7. Domain setup (arabkumar.in)

At the domain registrar's DNS panel:
- `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` for `www` → `kumararab.github.io`

In repo Settings → Pages: Source = GitHub Actions, custom domain `arabkumar.in`, enable HTTPS.

## 8. Content needed from Arab

**Per project** (copy this block for each one):

```yaml
- title:
  slug:
  one_liner:        # what it is in ~10 words
  year:
  type:             # mobile / web / saas / ai / tool / client / open-source
  role:             # solo, lead, frontend, etc.
  stack: []
  links: { live: , github: , playstore: , appstore: }
  problem:          # 2-3 lines
  what_i_built:     # 3-5 bullets
  results:          # numbers: users, downloads, revenue, stars, etc.
  media:            # screenshots / screen recordings (mp4 is great)
  featured: true/false
```

**General**
- Current role/company and a short work history (the old site stops at 2021)
- Headline: how you want to be introduced (e.g. "Full-stack & mobile engineer who ships products")
- Goal of the site: land a job, freelance clients, or showcase your own products?
- A good photo of yourself (optional but recommended)
- Updated resume PDF
- Socials: GitHub, LinkedIn, X, YouTube, Instagram
- Hobbies to keep (old: photography, hip-hop, stock market, cardistry)
- Which creative concept (A/B/C) or a mix

## Old content kept for reference
- Name: Arab Kumar · Email: arabkumar1000@gmail.com
- Education: BCA, BIT Mesra (2018–2021)
- Freelance brand: "The Flutter Guy" (2020–)
- Old projects: EduYear (Flutter), Memestick (Android), Decorspace (HTML/CSS/JS),
  The Slice City (Bootstrap/Flask), Fitness App, Mobile App UIs
