# Jagriti Verma, portfolio prototype

An animated portfolio prototype for Jagriti Verma (Melbourne lifestyle creator). No build step: `index.html` is the page and `content.js` holds the editable media and wording.

## Preview locally

    python3 -m http.server 8000
    # open http://localhost:8000

## Deploy

Any static host works. Point it at the repo root, with no build command and `index.html` as the entry (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Adding her reels, photos and music

Everything is controlled from `content.js`. If a file is missing, the page shows a "coming soon" tile, so you can add things a few at a time.

**Reels** (`media/reels/`)
- Use the original file from her phone or editing app, not an Instagram download.
- Shrink each one (vertical, about 3 to 6 MB, no audio needed):

      ffmpeg -i input.mov -vf "scale=720:-2,fps=30" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart media/reels/01.mp4
      ffmpeg -i input.mov -ss 1 -frames:v 1 -vf "scale=720:-2" media/reels/01.jpg

- In `content.js`, set each reel's `title`, `url` (the reel's Instagram link, used by the small arrow icon) and optional `stat`.
- Reels with trending audio can be taken down for copyright. Muted clips avoid this.

**Photos** (`media/photos/`)
- JPG or WebP, about 1600 px wide, under 400 KB each. Name them `01.jpg`, `02.jpg` and so on, and edit the captions in `content.js`.
- The desktop mosaic is laid out for 13 photos. Fewer photos leave gaps, so remove the extra slots or add more.
- `hat-banker.jpg`, `hat-broker.jpg`, `hat-founder.jpg` fill the Banker / Broker / Founder slider.
- Check that anyone else in a photo is happy to appear.

**Music**
- The Sound button plays a soft generated loop by default.
- To use a real track, put a licensed file at `media/audio/theme.mp3` and set `audio: 'media/audio/theme.mp3'` in `content.js`.

## Still placeholders

- Portrait circle in the hero ("Photo goes here")
- Reel and photo tiles, reel view counts
- Brand names beyond SHEIN, and the men's skincare brand name
- Collaboration formats and "Rates on request" wording
- Contact form (does not send anything yet) and a direct email address
- Job titles: check each against what KIN Finance and her credit licence allow before launch
