# Miracle Fordjour — Data Analyst Portfolio

**Live site: <https://portfolio-six-sooty-91.vercel.app>**

A recruiter-friendly portfolio site built with **Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4**.
It presents 12 analytics projects as searchable cards and full case studies, plus About, Skills, CV and Contact pages.

Every figure on the site comes from the projects' own reports, notebook outputs and results files. Nothing is estimated.
Missing assets (GitHub repos, some screenshots, the CV PDF) are shown as clearly labelled placeholders.

---

## Quick start

Requires **Node.js 18.18 or later** (Node 20 recommended; `.nvmrc` pins 20).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production check:

```bash
npm run build      # type-checks, lints and pre-renders all 25 pages
npm start          # serve the production build locally
```

Other scripts: `npm run lint`, `npm run typecheck`.

---

## Project structure

```
src/
  app/
    page.tsx                  Home: hero, summary, skills, featured projects, business cases, CV, contact
    about/page.tsx            About me
    skills/page.tsx           Six skill categories with links to supporting projects
    projects/page.tsx         Searchable, filterable gallery (filters sync to the URL, e.g. ?category=SQL)
    projects/[slug]/page.tsx  Case-study template (15 sections) — statically generated per project
    cv/page.tsx               CV (prints cleanly from the browser)
    contact/page.tsx          Contact details + email composer
    loading.tsx, error.tsx, not-found.tsx
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/                 Reusable UI (cards, gallery, lightbox, KPI grid, bar chart, code block, TOC…)
  data/
    site.ts                   Name, links, email, CV file name  ← edit personal details here
    profile.ts                About text, skills, experience, education
    projects.ts               All 12 projects and case studies  ← edit project content here
    types.ts                  Data types (documented)
  lib/cv.ts                   Detects whether the CV PDF exists
public/
  projects/<slug>/            Project charts and dashboard screenshots (WebP)
  notebooks/                  HTML exports of executed notebooks (attrition, fraud, bank)
  dashboards/                 Interactive Chocolate Sales HTML dashboard
  cv/                         Put your CV PDF here
```

---

## Updating content

### Add your CV
Save it as `public/cv/Miracle-Fordjour-CV.pdf` and rebuild. All "Download CV" buttons switch on automatically
(the file name lives in `src/data/site.ts` → `cvFileName`).

### Add a GitHub repository link
In `src/data/projects.ts`, find the project and set `links.github: "https://github.com/miracleasiedu-lab/<repo>"`.
The "GitHub soon" placeholder becomes a "View GitHub" link on the card and case study.

### Add a dashboard link (Tableau Public, Power BI Publish to web, Streamlit…)
Set `links.dashboard: { href: "https://…", label: "Tableau Public dashboard" }`.

### Add screenshots
1. Save images to `public/projects/<slug>/` (WebP or PNG).
2. Add them to the project's `gallery` with the `img()` helper, giving the real pixel width and height.
3. Optionally set `thumbnail` (use `fit: "cover"` for dashboard screenshots; charts default to `contain`).

### Fill a placeholder section
Each case-study field in `caseStudy` is optional. Empty fields render as a dashed "to be added" box,
and the contents list shows them in italics. Remove items from `pendingAssets` once they are added.

### Add a new project
Copy one of the project objects in `src/data/projects.ts`, give it a unique `slug`, and add it to the
`projects` array. The gallery, filters, case-study page, sitemap and navigation pick it up automatically.

---

## Placeholders and notes for the owner

These were left as placeholders on purpose rather than guessed:

| Item | Where | Status |
|---|---|---|
| CV PDF | `public/cv/` | Not supplied. The supplied Word CV still contains `[X]` placeholders and Wellcome-specific wording, so it was not converted. |
| GitHub repository URLs | every project, `links.github` | None supplied. The GitHub **profile** link (`github.com/miracleasiedu-lab`) is live. |
| Dataset links | FIFA 23, Hospital, Chocolate, Retail | Source pages not stated in the project files. |
| Screenshots | Olist, UK Weather | No images in the project files. |
| Tableau / Power BI live links | Hospital, Chocolate | Publish the `.twbx` to Tableau Public and the `.pbix` with Publish to web, then add the links. |
| Postgraduate provider | `src/data/profile.ts` → `education` | Provider name not stated in the CV (`institution: null`). |

**Differences between the brief and the supplied projects.** The site describes what each project actually contains.
Where the brief listed a tool that isn't in the project files, it appears under "Still to come" on that case study:

- Olist — brief says SQL / Power BI; the project is MySQL only.
- FIFA 23 — brief says SQL / Tableau; the project is a Python notebook.
- Bank Marketing — brief says Python / SQL; the project is Python only.
- Student Performance — brief says Python / SQL; the project is SQL (SQLite).
- Retail Sales — brief says Excel / Python; the project is Excel.
- UK Weather — brief says Weather & Air Quality; the project covers weather only.

Delete the matching `pendingAssets` lines if you don't plan to add those pieces.

**Fixes made to the Chocolate Sales HTML dashboard** (`public/dashboards/chocolate-sales-dashboard.html`):
category axes showed 0, 1, 2… instead of names (a `ticks.callback: undefined` override), the overview's
"Sales by Salesperson" chart was never drawn, and the salesperson matrices overflowed the page at desktop width.

**Before sharing the original reports anywhere**, tidy three leftovers: the Student Performance report's cover
says "Analysis & Report by Claude", the Online Shoppers report still says "Candidate: [Your name]", and the Chocolate
Sales PDF byline reads "@Someone". None of these reports is published on this site.

---

## Deploy

**Step-by-step guide: [DEPLOY.md](DEPLOY.md)** (GitHub Desktop or command line, Vercel, GitHub Pages, custom domain, troubleshooting).

The short version:

```bash
git remote add origin https://github.com/miracleasiedu-lab/portfolio.git
git push -u origin main
```

Then import the repository at [vercel.com/new](https://vercel.com/new), set `NEXT_PUBLIC_SITE_URL` to your live address, and deploy.

| Workflow | File | When it runs |
|---|---|---|
| CI (lint, type-check, build) | `.github/workflows/ci.yml` | Every push to `main` and every pull request |
| Deploy to GitHub Pages | `.github/workflows/pages.yml` | On demand from the Actions tab (optional alternative to Vercel) |

### Static hosting (any host)

```bash
STATIC_EXPORT=1 npm run build      # plain HTML export into ./out
python3 scripts/build_static.py    # self-contained bundle into ./static-site
```

`static-site/` has relative links, inlined CSS and fonts, and a small dependency-free script for the
interactive parts, so it works on GitHub Pages, Netlify, an S3 bucket, a sub-folder, or straight from disk.

---

## Accessibility, SEO and performance

- Semantic landmarks, skip link, visible keyboard focus, `aria-current` navigation, labelled controls and live regions.
- Light and dark themes (follows the system setting; toggle remembered per browser), with no flash on load.
- `prefers-reduced-motion` respected; the only automatic animation is the hero ledger reveal.
- Bar charts include a data-table view; images have alt text and captions; lightbox supports arrow keys and Escape.
- Per-page metadata, canonical URLs, Open Graph image, `sitemap.xml`, `robots.txt` and JSON-LD (Person, CreativeWork).
- All pages are statically pre-rendered. Images are served through `next/image` (AVIF/WebP, responsive sizes).
- Fonts (Geist, Instrument Serif) are bundled from npm, so builds don't depend on Google Fonts.
