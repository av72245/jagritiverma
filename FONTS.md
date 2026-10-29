# Fonts

## Current (since the Astro rebuild)

| Role | Font | Used for |
|------|------|----------|
| Display | Bricolage Grotesque 800 | Her name, section headings, marquee, big numbers and words, the JV marks |
| Everything else | DM Sans 400 / 500 / 700 | Body text, nav, buttons, labels, card titles, captions, forms |

Set in `src/styles/global.css`:

    --f-display:"Bricolage Grotesque","Arial Narrow",system-ui,sans-serif;
    --f-body:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
    --f-label:var(--f-body);

## Original prototype (to go back)

Three families, loaded from Google Fonts:

    https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap

    --f-display:"Bricolage Grotesque","Arial Narrow",system-ui,sans-serif;
    --f-body:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
    --f-mono:"DM Mono",ui-monospace,Menlo,monospace;

- Bricolage Grotesque was also used for the hero line under her name, card and reel titles, timeline job titles, tip questions, flip-card titles, brand names and map labels.
- DM Mono was used for every small uppercase label: nav links, the "Open to collaborations" pill, section eyebrows, card tags, reel stats, captions, form labels, notes and the Sound button.

To restore it: add `DM+Mono:wght@400;500` and `opsz,wght@12..96,500` back to the font URL in `src/layouts/Layout.astro`, set `--f-label:"DM Mono",ui-monospace,Menlo,monospace;`, and switch the card titles back to `var(--f-display)`.
