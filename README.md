# Jagriti Verma, portfolio site

Animated portfolio for Jagriti Verma (Melbourne lifestyle creator), built with [Astro](https://astro.build). Each section is its own component, and the build outputs plain static HTML, so everything is readable by search engines without JavaScript.

## Editing the site in a browser (for Jagriti)

The easiest way to edit is **Pages CMS**, a free editor that gives you simple forms and needs no code.

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub. Your GitHub account needs access to this repository.
2. Open **av72245/jagritiverma**.
3. Use the menu on the left:
   - **Free ka gyan:** add, edit or reorder money questions. Each one gets its own page at `/gyan/<question>`.
   - **Work with me page:** numbers, audience, collaboration formats, brands, steps, FAQs and contact email.
   - **Media:** upload photos, reels, the Banker / Broker / Founder photos and the portrait.
4. Press **Save**. The site updates about a minute later.

The editor settings live in `.pages.yml`.

## Adding photos and reels (no code needed)

Drop files into these folders, commit, and the site rebuilds on its own. On github.com: open the folder, click **Add file → Upload files**, drag the files in and press **Commit changes**. Netlify redeploys in about a minute.

| Folder | What goes in | How it's used |
|--------|--------------|---------------|
| `media/photos/` | JPG, PNG or WebP (export iPhone HEIC photos as JPG) | The "Moments" mosaic |
| `media/reels/` | MP4 or MOV videos | The reel wall and the floating hero cards |
| `media/hats/` | `banker.jpg`, `broker.jpg`, `founder.jpg` | The Banker / Broker / Founder slider |
| `media/portrait/` | One photo of Jagriti | The hero circle and the link preview image |

**Naming does the work:**

- `01-hotham-snow.jpg` shows first, with the caption "Hotham snow". The number sets the order, and the words become the caption.
- `03-perth-2026.mp4` becomes the reel titled "Perth 2026".
- Phone names like `IMG_1234.jpg` still work, they just get no caption.

**Optional reel details.** Add a text file with the same name, for example `03-perth-2026.txt`:

    link: https://www.instagram.com/reel/abc123/
    views: 1.2M plays

**You don't need to resize anything.** Photos are resized and converted to WebP when the site builds. Videos over 8 MB, and any `.mov`, are shrunk by a GitHub Action (`.github/workflows/compress-reels.yml`), which also makes a still image for each reel.

**Tips:**

- Use original files from her phone or editing app, not Instagram downloads.
- Reels with trending audio can be taken down for copyright. The site plays them muted.
- The desktop mosaic has a hand-placed layout for exactly 13 photos. Any other number uses a flowing grid.
- Check that anyone else in a photo is happy to appear.

While a folder is empty, the site shows "coming soon" tiles, so photos and reels can be added a few at a time.

## Changing wording

- **Free ka gyan:** one Markdown file per question in `src/content/gyan/`. The filename is the page address (`offset-account.md` becomes `/gyan/offset-account`). The answers are drafts, and Jagriti should check each one, and ideally clear them with KIN Finance compliance, before launch.
- **Work with me page, brands and collaboration formats:** `src/data/work.json`.
- **Hero words, marquee and page title:** `src/data/site.js`.
- Anything else is in the matching file in `src/components/`.

## Pages

- `/`: the main one-page scroll
- `/gyan`: all money questions, plus `/gyan/<question>` for each one
- `/work`: media kit for brands, with the contact form

The contact form uses Netlify Forms. Submissions appear in the Netlify dashboard under **Forms**, where you can also turn on email notifications.

## Easter eggs

- **Home:** the dot on each divider runs from your cursor, hops over you when cornered, and bursts if you catch it.
- **Gyan pages:** the coin on each divider rolls to your cursor. Collect it and a counter keeps your "coins saved" (every 10th coin starts a coin shower). Tap the jar on `/gyan` to shake out coins, type "gyan" anywhere for coin rain, and finishing an article stamps it "Gyan unlocked".
- **Work page:** click "Open to collaborations" to start recording, with a camera viewfinder and running timecode. Press Esc to stop.

## Structure

    src/
      components/   Header, Hero, Marquee, Divider, Channels, Reels, Story,
                    Photos, Gyan, GyanCards, Wealth, Work, Formats, HelloForm, Footer
      content/gyan/ one Markdown file per money question
      data/         site.js (general wording), work.json (work page)
      lib/media.js  reads the media folders at build time
      layouts/      page head: SEO tags, schema, fonts
      pages/        home, gyan/, work, robots.txt, og.png share image
      scripts/      animations and interactions
      styles/       global.css
    media/          upload folders (see above)
    public/         favicon, optional audio

## SEO

- Static HTML for every section, including reels, photos and tips
- Title, description, canonical URL, Open Graph and Twitter cards
- Person and FAQ structured data (the tips appear as FAQs)
- `sitemap-index.xml` and `robots.txt`, generated on every build
- Alt text taken from photo captions

The site address comes from Netlify's `URL` setting automatically. To use a custom domain before Netlify knows about it, set a `SITE_URL` environment variable in Netlify.

## Fonts

Bricolage Grotesque for her name and headlines, and DM Sans for everything else. `FONTS.md` records the original three-font setup if you want it back.

## Music

The Sound button plays a soft generated loop. To use a licensed track, put it at `public/audio/theme.mp3` and set `audio: '/audio/theme.mp3'` in `src/data/site.js`.

## Local development

    npm install
    npm run dev      # http://localhost:4321
    npm run build    # outputs dist/

Deploys to Netlify using `netlify.toml` (build `npm run build`, publish `dist`).

## Still placeholders

- Portrait, reels, photos and hat photos (folders are ready)
- Brand names beyond SHEIN, and the men's skincare brand name
- Collaboration formats and "Rates on request" wording
- Contact email in `work.json`, and audience numbers on the work page
- Job titles: check each against what KIN Finance and her credit licence allow before launch
