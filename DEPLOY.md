# Deploying the portfolio

This guide takes the project from the ZIP to a live website with your own address, in three stages:

1. **Before you publish**: a five-minute checklist
2. **Put the code on GitHub**: with GitHub Desktop (no terminal) or with the command line
3. **Make it live**: Vercel (recommended) or GitHub Pages (free alternative)

Total time: about 20 minutes the first time. After that, every change you push goes live automatically.

---

## 1. Before you publish

Anything you push to a **public** GitHub repository can be seen by anyone, so do these first.

| Do this | Where | Why |
|---|---|---|
| Add your CV as `Miracle-Fordjour-CV.pdf` (optional, can be done later) | `public/cv/` | The Download CV buttons switch on automatically once the file exists. |
| Decide which "Still to come" items to keep | `pendingAssets` in each project in `src/data/projects.ts` | Delete any lines for things you don't plan to add. |
| Add the postgraduate provider name (optional) | `education` in `src/data/profile.ts` | It's currently left blank. |
| Check your contact details | `src/data/site.ts` | Email, LinkedIn and GitHub links appear on every page. |

There are **no passwords, API keys or secrets** in this project, so it's safe to make the repository public.

---

## 2. Put the code on GitHub

Unzip `miracle-fordjour-portfolio.zip` first. You'll get a folder called `miracle-fordjour-portfolio`.

The folder already contains a Git history with one commit, so GitHub Desktop and the command line can publish it directly.

### Option A: GitHub Desktop (easiest, no terminal)

1. Install **GitHub Desktop** from <https://desktop.github.com> and sign in with your GitHub account (`miracleasiedu-lab`).
2. **File → Add local repository…** → choose the unzipped `miracle-fordjour-portfolio` folder → **Add repository**.
3. Click **Publish repository** (top bar).
   - Name: `portfolio` (or see the tip below)
   - Description: `Data Analyst portfolio: SQL, Python, Power BI, Tableau and machine learning case studies`
   - **Untick** "Keep this code private" so recruiters can see your code.
4. Click **Publish repository**. Your code is now at `https://github.com/miracleasiedu-lab/portfolio`.

> **Why not drag-and-drop on github.com?** GitHub's web uploader accepts at most 100 files at a time and doesn't
> keep the folder history. This project has about 130 files, so GitHub Desktop or the command line is simpler.

### Option B: Command line

Create an **empty** repository at <https://github.com/new> called `portfolio` (no README, no .gitignore, no licence), then:

```bash
cd miracle-fordjour-portfolio
git remote add origin https://github.com/miracleasiedu-lab/portfolio.git
git push -u origin main
```

### After pushing

Open the repository's **Actions** tab. A workflow called **CI** runs automatically and checks that the site
builds. A green tick means everything is fine. It runs again on every push.

**Tidy up the repository page (2 minutes):** on the repository home page click the ⚙️ next to *About* and add:
- Website: your live URL (once you have it from stage 3)
- Topics: `data-analytics`, `portfolio`, `nextjs`, `sql`, `python`, `power-bi`, `tableau`, `machine-learning`

---

## 3. Make it live

### Option A: Vercel (recommended)

Vercel is made by the team behind Next.js. It's free for personal sites, gives you HTTPS automatically and
redeploys every time you push to GitHub.

1. Go to <https://vercel.com/signup> → **Continue with GitHub** and approve access.
2. Click **Add New… → Project**, find `portfolio` and click **Import**.
3. Leave the framework (Next.js), build command and output settings exactly as Vercel detects them.
4. Open **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://miracle-fordjour.vercel.app` (the address you'll choose in step 6) |

5. Click **Deploy**. The first build takes about a minute.
6. Open **Settings → Domains**. Vercel gives the project an address such as `portfolio-abc123.vercel.app`.
   Click **Edit** and change it to something like `miracle-fordjour.vercel.app`. If you change it, update
   `NEXT_PUBLIC_SITE_URL` to match and click **Redeploy** on the latest deployment.

Your site is live. Put the address on your CV, LinkedIn (*Contact info → Website*) and GitHub profile.

**Custom domain (optional, about £10/year):** buy a domain such as `miraclefordjour.co.uk` from any registrar,
add it in **Settings → Domains**, follow the DNS instructions Vercel shows, then update `NEXT_PUBLIC_SITE_URL`
and redeploy.

### Option B: GitHub Pages (free alternative, no extra account)

The project includes a ready-made workflow that publishes a static version of the site to GitHub Pages.

1. In the repository, open **Settings → Pages**. Under *Build and deployment*, set **Source** to **GitHub Actions**.
2. Open the **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**.
3. When it finishes (about two minutes), the site is at `https://miracleasiedu-lab.github.io/portfolio/`.

> **Tip:** name the repository `miracleasiedu-lab.github.io` instead of `portfolio` and the site appears at the
> shorter address `https://miracleasiedu-lab.github.io`.

To redeploy automatically on every push, open `.github/workflows/pages.yml` and remove the `#` from the two
`push:` lines.

Differences from Vercel: images aren't resized per device, and the interactive parts (filters, search, image
viewer, theme toggle) run on a small built-in script instead of React. The content is identical.

---

## Updating the site later

1. Edit the content files (`src/data/projects.ts`, `profile.ts`, `site.ts`) or add images to `public/projects/<slug>/`.
2. Check it locally:
   ```bash
   npm install      # first time only
   npm run dev      # preview at http://localhost:3000
   npm run build    # the same check CI runs
   ```
3. Commit and push (in GitHub Desktop: write a summary → **Commit to main** → **Push origin**).
   Vercel redeploys automatically within a minute.

Common edits:

| I want to… | Edit |
|---|---|
| Link a project's GitHub repository | `links.github` for that project in `src/data/projects.ts` |
| Add a Tableau Public / Power BI link | `links.dashboard: { href: "…", label: "Tableau Public dashboard" }` |
| Add a screenshot | Save it to `public/projects/<slug>/`, add it to that project's `gallery` |
| Add a new project | Copy a project object in `src/data/projects.ts`, give it a new `slug`, add it to the `projects` list |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| CI or Vercel build fails with a type error | Run `npm run build` locally. The message names the file and line, usually a missing comma or quote in `projects.ts`. |
| Download CV button still says "coming soon" | The file must be exactly `public/cv/Miracle-Fordjour-CV.pdf` (or change `cvFileName` in `site.ts`), then redeploy. |
| Images don't show after adding them | Check the path in `projects.ts` starts with `/projects/<slug>/` and the file name matches exactly, including upper/lower case. |
| Social previews (LinkedIn) show the wrong address | Set `NEXT_PUBLIC_SITE_URL` in Vercel to your live address and redeploy. LinkedIn caches previews, so use <https://www.linkedin.com/post-inspector/> to refresh. |
| GitHub Pages workflow fails at "deploy" | Settings → Pages → Source must be **GitHub Actions**. |
| `npm install` fails locally | Install Node.js 20 LTS from <https://nodejs.org>, then try again. |
