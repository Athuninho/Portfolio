# Information still needed

Run `npm run check:placeholders` to list every `[[TODO: ...]]` still in the code.
Everything below is currently shown on the site and in the PDF as a visible placeholder.
Edit the files in `src/data/`, then run `npm run build:pdf` to refresh the PDF.

## Per project (`src/data/projects.ts`)

| Project | Still needed |
| --- | --- |
| ShuleCloud | Problem solved, target users, verified features you personally built, your specific modules or endpoints, challenge and solution, lesson learned, screenshots, permission to show it publicly |
| RentalYetu | Which workflows are live, problem solved, target users, your specific features, challenge and solution, lesson learned, screenshots, permission to show it publicly |
| UniNotes App | Tech stack, features in the published app, your contribution and team size, public GitHub repo (if any), challenge and solution, lesson, screenshots |
| POS | Tech stack, which features already work (sales, inventory, receipts, reports, login), GitHub repo and demo (if any), challenge and solution, lesson, screenshots |

## Profile and site

- Skills: testing tools and deployment platforms you have actually used (`src/data/skills.ts`)
- Availability: preferred start date and remote / on-site / hybrid preference (`src/data/profile.ts`)
- Photo (optional): put it in `public/images/` and set `photo` in `src/data/profile.ts`
- Real domain: replace `YOUR-DOMAIN.example` in `public/sitemap.xml` and `public/robots.txt`, and add the canonical URL and `og:url` in `index.html`
- Contact form: create a form endpoint and set `VITE_FORM_ENDPOINT` (see README)
