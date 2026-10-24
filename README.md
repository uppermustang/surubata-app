# Surubata

Bilingual (Nepali and English) tech media site for practical AI, automation, and growth. Nepali is the default language. English lives at `/en`.

The name comes from **सुरुबाट** — from the beginning.

## Stack

- Next.js 15 App Router, TypeScript, React 19
- Tailwind CSS 4 and shadcn-style components (Radix, CVA, Lucide)
- next-intl for Nepali and English (`/ne`, `/en`)
- MDX articles via `next-mdx-remote`
- next-themes (system, light, dark)
- Framer Motion on the homepage hero
- Prisma and PostgreSQL for newsletter signups and audience requests
- Vercel Analytics, with an optional Plausible script

Content for episodes, news, resources, and the newsletter is typed data. Long articles are MDX files. The site runs without a database. Forms save to `data/submissions.json` in development until Postgres is turned on.

## Information architecture

| Path | Page |
| --- | --- |
| `/ne`, `/en` | Homepage: brief, episode, news, articles, resources, newsletter |
| `/podcast`, `/podcast/[slug]` | Episodes, player, transcript, takeaways |
| `/news`, `/news/[slug]` | Curated briefs and why they matter |
| `/articles`, `/articles/[slug]` | Long reads with contents and progress |
| `/resources`, `/resources/[slug]` | Copy, download, and print-ready tools |
| `/newsletter` | Signup and issue archive |
| `/about` | Story, mission, host |
| `/search?q=` | Search across the library |
| `/topics`, `/topics/[tag]` | Topic index and topic pages |
| `/request` | “What do you need?” plus topic requests |
| `/feed.xml` | RSS for the active language |

## Setup

```bash
npm install
copy .env.example .env
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will land on the Nepali homepage.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — generate the Prisma client and build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm run db:push` — push the Prisma schema to Postgres

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, and RSS |
| `DATABASE_URL` | Postgres connection string |
| `DATABASE_ENABLED` | Set to `true` only when Postgres is reachable |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional Plausible domain. Blank skips the script |

Vercel Analytics is included and stays quiet outside a Vercel deployment.

While `DATABASE_ENABLED` is not `true`, newsletter and request forms still validate. In development they write `data/submissions.json` (gitignored). In production without a database they accept the request and say storage is not configured.

## Editing content

- UI copy: `messages/en.json` and `messages/ne.json`. Keep the keys identical.
- Episodes: `src/content/episodes.ts`. Set `youtubeId` to the id from a YouTube watch URL. The current samples embed public YouTube videos so the player is visible before the real episode exists. A local `videoUrl` still works if you host the file yourself.
- News briefs: `src/content/news.ts`. Link out. Do not paste another publication’s full article.
- Resources: `src/content/resources.ts`. `usageCount` only ranks the “most used” shelf. It is sample data.
- Newsletter archive: `src/content/newsletters.ts`
- About and host: `src/content/about.ts`. Replace the sample host before launch. The about photo is a workspace, not a portrait of the host.
- Cover photos: `src/content/covers.ts` and `public/media`. Sample images are free Pexels photos saved in the repo. Swap the file and the alt text when you have your own.
- Articles: add `content/articles/your-slug.en.mdx` and `content/articles/your-slug.ne.mdx` with the same frontmatter shape as the samples (`title`, `excerpt`, `publishedAt`, `tags`, optional `relatedEpisodes`, `relatedResources`, `relatedNews`).
- New tags: add labels in `src/content/taxonomy.ts`.

## Deploy on Vercel

1. Import the repository.
2. Set the environment variables above.
3. Create a Postgres database and set `DATABASE_ENABLED` to `true`.
4. Run `npx prisma db push` against that database (or your own migration flow).
5. Deploy. `npm run build` already runs `prisma generate`.

## SEO and feeds

- Metadata, canonical URLs, and `hreflang` for `ne` and `en`
- `sitemap.xml`, `robots.txt`, Open Graph image, and app icons
- JSON-LD for the organization, website search, articles, news briefs, and episodes
- RSS at `/ne/feed.xml` and `/en/feed.xml`

## Accessibility and performance notes

- Skip link, visible focus, 44px targets, form labels, and `aria-live` on form results
- Language on the document follows the locale header from next-intl
- Article progress, contents, and reading time
- Video stays a poster until play, so the homepage does not load YouTube
- Dark mode follows the system until a reader chooses Light or Dark
