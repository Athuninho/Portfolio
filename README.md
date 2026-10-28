# Asumanii: Developer Portfolio

Portfolio website and PDF for Athman Rajab Suba (Asumanii), built with React, TypeScript, Vite, Tailwind CSS, Motion for React, and Lucide. Case-study pages use React Router so each project has its own shareable URL, such as `/projects/shulecloud`.

## Quick start

### Requirements

- Node.js 20 or newer
- npm (included with Node.js)

Check your installed versions:

```powershell
node --version
npm --version
```

### 1. Open the project folder

Open the project in your code editor, or open PowerShell and navigate to the folder. For example:

```powershell
cd C:\Users\Asumanii\OneDrive\Desktop\portfolio
```

If your project is saved somewhere else, use its actual folder path.

### 2. Install dependencies

```powershell
npm install
```

**Windows PowerShell troubleshooting:** If you see an error saying `npm.ps1 cannot be loaded because running scripts is disabled`, use the Windows command wrapper:

```powershell
npm.cmd install
```

This avoids changing your PowerShell execution policy.

### 3. Start the development server

```powershell
npm run dev
```

If PowerShell shows the same `npm.ps1` error, run:

```powershell
npm.cmd run dev
```

When Vite starts, the terminal displays a local URL, usually `http://localhost:5173/`. Open that URL in your browser. Keep the terminal open while you work; Vite refreshes the page when you save changes.

To stop the server, return to the terminal and press `Ctrl + C`.

## Available commands

Run these from the project folder:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Typecheck and create the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run the TypeScript check only |
| `npm run lint` | Lint with oxlint |
| `npm run build:pdf` | Regenerate `public/Athman_Suba_Portfolio.pdf` from the data files |
| `npm run check:placeholders` | List all remaining `[[TODO: ...]]` placeholders |

On Windows PowerShell, if `npm` is blocked by the execution policy, prefix commands with `npm.cmd` (for example, `npm.cmd run build`).

## Updating content

Content is stored in `src/data/`, separately from the components.

- `profile.ts`: name, contact details, biography, education, availability, and CV file.
- `projects.ts`: one object per project. Add a project object to make it appear as a card and case-study page. Unknown fields can remain as `[[TODO: ...]]`; they appear as visible placeholders. Only list features in `features` that you have confirmed work.
- `skills.ts`: skill groups. Add an item to `items` when you learn a new skill.
- Screenshots: place images in `public/images/` and add them to the project's `screenshots` array, for example `{ src: '/images/shulecloud-1.webp', alt: 'Dashboard showing ...' }`. Prefer WebP or optimised JPEG images, ideally under 200 KB each.
- CV: replace `public/Athman_Suba_CV.pdf`. Keep the filename, or update `cvFile` in `profile.ts`.

After changing content, regenerate the portfolio PDF so it matches the website:

```powershell
npm run build:pdf
```

## Contact form

The contact form does not pretend to send messages. Without configuration, it validates the input and opens the visitor's email application with a prefilled message.

To submit directly, create a form with a service such as [Formspree](https://formspree.io/), [Web3Forms](https://web3forms.com/), or EmailJS, then configure the endpoint:

1. Copy `.env.example` to `.env`.
2. Set `VITE_FORM_ENDPOINT` to the endpoint URL, for example `VITE_FORM_ENDPOINT=https://...`.
3. In Vercel, open **Project Settings → Environment Variables**, add `VITE_FORM_ENDPOINT`, and redeploy.

The form posts JSON (`name`, `email`, `subject`, `message`) and includes a hidden honeypot field for basic spam protection. Use the form service's spam filtering and rate limits for stronger protection. Do not put secret keys in `VITE_` variables because they are visible in the browser. Public form endpoints are intended for this use. If you build your own backend, validate and sanitise every field on the server.

## Deploy to GitHub and Vercel

1. Create an empty repository on GitHub, then run the following commands in the project folder. Replace `<repo-name>` with your repository name:

   ```powershell
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/athuninho/<repo-name>.git
   git push -u origin main
   ```

2. Visit [Vercel](https://vercel.com/), sign in with GitHub, choose **Add New → Project**, and import the repository.
3. Vercel generally detects Vite automatically. Use `npm run build` as the build command and `dist` as the output directory. Add `VITE_FORM_ENDPOINT` if you configured one, then deploy.
4. `vercel.json` rewrites routes to `index.html`, allowing direct navigation to and refreshing of routes such as `/projects/pos`.

## Custom domain

1. Buy a domain from a registrar.
2. In Vercel, open **Project → Settings → Domains** and add the domain. Vercel will show the DNS records to create (often an `A` record for the apex domain and a `CNAME` record for `www`).
3. Add those records at your registrar and wait for DNS propagation. Vercel provisions the HTTPS certificate automatically.
4. Replace `YOUR-DOMAIN.example` in `public/sitemap.xml` and `public/robots.txt`, and add the canonical URL and `og:url` to `index.html`.

## Project structure

```text
src/
  components/   Navigation, Hero, Projects, ProjectCard, ProjectDetails,
                About, Skills, Resume, Contact, Footer, and shared pieces
  data/          profile.ts, projects.ts, skills.ts (content only)
  lib/           placeholder helper and accent colours
  pages/         Home, ProjectPage, NotFound
scripts/         build-pdf.ts, check-placeholders.ts
public/          CV, generated portfolio PDF, favicon, robots.txt, sitemap.xml
```

## Accessibility and performance

The site includes semantic landmarks, a skip link, visible focus states, a keyboard-operable mobile menu (Escape closes it and focus stays inside), labelled form fields with inline errors, and `prefers-reduced-motion` support for CSS and Motion animations. Motion is loaded through `LazyMotion` to help keep the bundle small; animations focus on transforms and opacity.

The site is not deployed until you complete the deployment steps above.
