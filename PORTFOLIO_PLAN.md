# arabkumar.in — Portfolio v2 Plan

The old site (2020, "The Flutter Guy", jQuery + Bootstrap template) is being replaced
with an immersive, motion-heavy portfolio. The old content is the starting point only.

Domain: **arabkumar.in** (hosted on GitHub Pages from this repo).

---

# v3 Information Architecture (current source of truth)

Three pages, three audiences:
- `/` **Landing**: everyone. Job: explain in about 3 seconds that there are two sides and route people.
- `/code` **Technical**: recruiters and hiring managers. Job: a 30-second scan, then proof.
- `/content` **Creative (@flipsidefolly)**: brands and agencies. Job: a media kit that sells the fit.

Brain metaphor: **left brain = Code (logic), right brain = Content (creative)**. So Code moves to the LEFT.

## Landing `/`
1. The 3D brain sits in the centre. The left hemisphere is a wireframe or circuit mesh with code particles.
   The right hemisphere is a glossy liquid blob with colour and motion. The cursor tilts the brain, and
   hovering a hemisphere lights it up and floods that half of the screen (the liquid split stays).
2. Copy: "Arab Kumar" · "Two halves. One brain." ·
   left "Code: I build mobile apps & products people use." + **Enter Codebase** ·
   right "Content: I make reels people replay." + **Enter Studio**.
3. Router line under the brain: "Hiring? Go left. Collaborating? Go right."
4. Footer: LinkedIn · GitHub · @flipsidefolly · daily palette chip.

## Technical `/code` (recruiter flow: skim → proof → contact)
0. Sticky bar: name · "Open to opportunities" pill · Resume · Email. Also a "60-second version" toggle for a one-screen summary.
1. **Hero / TL;DR**: title, years of experience, current company, location, and 4 stat counters
   (years · apps live · downloads · community followers). Buttons: Resume · LinkedIn · GitHub.
2. **Experience**: timeline from LinkedIn, drawn as a commit log (role, company, dates, 2 impact bullets, stack).
3. **Flagship apps (live on stores)**: big case studies with 3D phones, store badges and a "Live" pill:
   - Cabo: multiplayer card (memory) game on iOS and Android, linked to the engineering blog
   - Matrix: news app on iOS and Android
   - Paperid: audiobook app on Android
4. **Built for my own problems (indie products)**: problem → solution cards with a status pill:
   - SnapMyCode (web), Casca (IG → YouTube auto-post), Flutter Guru (LinkedIn post automation),
     Buckminister (expense tracker, in development)
5. **Playables**: web games you can play right there inside a phone frame: Juice Merge, Story Quiz, Matching Tiles.
6. **Writing & community**: Cabo engineering blog, daily LinkedIn posts, @the.flutter.guy (IG),
   YouTube @theflutterguy, GitHub (Flutter UI/UX repos, contributions graph).
7. **Stack**: grouped by job (Mobile · Backend · Web · Tooling · AI).
8. **Contact**: "Hiring for mobile? Let's talk." · Email · Resume · LinkedIn, then a crossover teaser: "There's another half →".

## Creative `/content` (brand flow: who → numbers → fit → proof → book)
1. **Hero**: @flipsidefolly, a looping reel or portrait, a positioning line, niche tags
   (Dance · Fashion · Humour · Relatable), and 4 headline numbers (followers · avg reach · engagement rate · avg views).
2. **Meet the creator**: 3 lines of personality, what the page feels like.
3. **Content pillars**: Dance classes · Fashion · Humour · Relatable/yap. Each has a reel frame that autoplays plus its avg views.
4. **Performance**: top reels by views, reach and engagement trend, engagement vs benchmark. Numbers carry an "as of" date.
5. **Audience**: age, gender, top cities and countries. This is where brands check fit.
6. **Brand fit**: the categories I'm a natural fit for, the values, and what I don't promote.
7. **Past collaborations**: logos plus mini case studies (brief → content → results).
8. **Services**: Reel · Story · Carousel · UGC · Dance challenge · Event/appearance. Packages, rates on request.
9. **Book**: email, DM, media kit PDF, then a crossover teaser: "Also builds apps →".

## Copy principles
- Every section headline states a claim. The numbers directly below it prove the claim.
- Recruiter page: plain and specific ("5 apps live, 2 platforms"). Brand page: voice-first and warm, but still numbers-led.
- Each page has a single primary CTA, repeated at the top and the bottom.

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

## 3. Chosen direction: "Code / Content"

Prototype: `prototypes/split-landing.html`.

**Landing (`/`)**: kept deliberately clean. A liquid split: Content on the left (top on phones),
Code on the right (bottom on phones). The side you move toward floods the screen, and each side's
block stays centred in its own region.
- Content side: "the studio" · **Content** · one line on what I do · Instagram link · **Enter Studio**
- Code side: "the codebase" · **Code_** · one line on what kind of developer I am · LinkedIn link · **Enter Codebase**
- Background art at low opacity, with slight cursor parallax:
  - Content: IG, YouTube, camera, reel, heart, comment, mic and clapper icons, plus graffiti words in a marker font.
  - Code: matrix rain, LinkedIn, terminal, git, `</>`, bug and phone icons, plus code snippets.
- The CTAs flood the screen with that side's colour, then route to a dedicated page.

**Routes**: `/` split landing · `/code` developer page · `/content` creator page (+ sub-pages later).

**Brand palette: one per day of the week** (picked by the IST weekday; visitors can preview the others).
Each side's accent is the other side's colour.

| Day | Name | Code bg / ink / accent | Content bg / ink |
|---|---|---|---|
| Sun | Bone & Oxblood | #E9E2D4 / #1A1714 / #7A1F2B | #7A1F2B / #F4EADB |
| Mon | Graphite & Cobalt | #131316 / #ECECEC / #6F86FF | #2E48F0 / #FFF4E0 |
| Tue | Forest & Blush | #0F2A22 / #EFE6D8 / #86D6A8 | #F1C4B3 / #4A1621 |
| Wed | Navy & Coral | #0F1B33 / #F2ECE1 / #FF7A59 | #FF7A59 / #1B0F0A |
| Thu | Espresso & Matcha | #1E1611 / #EFE4D2 / #A8C686 | #A8C686 / #1E1611 |
| Fri | Saffron Night | #0E1116 / #EDE6D6 / #F0A33A | #F0A33A / #17120B |
| Sat | Aubergine & Lilac | #1E1226 / #EFE6F2 / #C8B3F0 | #C8B3F0 / #1E1226 |

**Landing copy**
- Content: "Relatable reels, informative posts, fashion and the occasional yap." / "Content that feels like a friend, not a feed." · Instagram: https://www.instagram.com/flipsidefolly/
- Code: "Mobile developer building apps that sharpen your memory." / "And products that fix my own problems first." · LinkedIn: https://www.linkedin.com/in/arab-kumar-b5853b191/

**Type**: Instrument Serif (Content voice) · JetBrains Mono (Code voice) · Bricolage Grotesque (name/UI) · Permanent Marker (graffiti art only).

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
