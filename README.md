# arabkumar.in

Personal site of Arab Kumar: two halves, one brain.

| Route | Audience | Source |
|---|---|---|
| `/` | everyone | `index.html`, `src/landing/` (liquid split + three.js brain) |
| `/code/` | recruiters | `code/index.html`, `src/code/` |
| `/content/` | brands & agencies | `content/index.html`, `src/content/` |

**Edit content, not code:** `src/code/data.ts` and `src/content/data.ts` hold every word, link and number.
Placeholders are marked `todo` / `null` and show a red tag or "soon" on the page.

**Media:** put app screenshots in `public/work/<app-id>/` and reels (short, muted mp4) in `public/reels/`,
then reference them from the data files.

**Palettes:** one per weekday (IST), defined in `src/lib/palette.ts`.

```bash
npm install
npm run dev      # local dev server
npm run build    # static build in dist/
```

Deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`
(repo Settings → Pages → Source must be **GitHub Actions**). The custom domain comes from `public/CNAME`.

The 2020 site is kept in `legacy/` for reference.
