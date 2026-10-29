/*
  Reads the upload folders at build time.
    media/photos/   01-hotham-snow.jpg   -> caption "Hotham snow", shown first
    media/reels/    01-glamping.mp4      -> title "Glamping"
                    01-glamping.jpg      -> optional still shown before it plays
                    01-glamping.txt      -> optional "link: ..." and "views: ..." lines
    media/hats/     banker.jpg, broker.jpg, founder.jpg
    media/portrait/ any one image, used in the hero circle
*/

const photoMods = import.meta.glob('/media/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', { eager: true, import: 'default' });
const hatMods = import.meta.glob('/media/hats/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', { eager: true, import: 'default' });
const portraitMods = import.meta.glob('/media/portrait/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', { eager: true, import: 'default' });
const videoUrls = import.meta.glob('/media/reels/*.{mp4,webm,mov,MP4,WEBM,MOV}', { eager: true, query: '?url', import: 'default' });
const posterMods = import.meta.glob('/media/reels/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' });
const notes = import.meta.glob('/media/reels/*.txt', { eager: true, query: '?raw', import: 'default' });

const base = (p) => p.split('/').pop().replace(/\.[^.]+$/, '');
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

/* "01-hotham-snow" -> "Hotham snow"; "IMG_1234" -> "" */
export function nameToText(name) {
  const t = name.replace(/^\d+[\s._-]*/, '').replace(/[_-]+/g, ' ').trim();
  if (!t || /^(img|dsc|pxl|mvimg|vid)\s?\d+$/i.test(t) || !/[a-z]/i.test(t)) return '';
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export const photos = Object.keys(photoMods).sort(byName).map((p) => ({
  img: photoMods[p],
  cap: nameToText(base(p))
}));

export const hats = Object.fromEntries(Object.keys(hatMods).map((p) => [base(p).toLowerCase(), hatMods[p]]));

export const portrait = Object.values(portraitMods)[0] || null;

function readNote(raw) {
  const out = {};
  String(raw || '').split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*(link|url|views|stat|title)\s*:\s*(.+)$/i);
    if (m) out[{ url: 'link', stat: 'views' }[m[1].toLowerCase()] || m[1].toLowerCase()] = m[2].trim();
  });
  return out;
}

export const reels = Object.keys(videoUrls).sort(byName).map((p) => {
  const name = base(p);
  const posterKey = Object.keys(posterMods).find((k) => base(k) === name);
  const noteKey = Object.keys(notes).find((k) => base(k) === name);
  const note = noteKey ? readNote(notes[noteKey]) : {};
  return {
    src: videoUrls[p],
    poster: posterKey ? posterMods[posterKey] : null,
    title: note.title || nameToText(name) || 'Reel',
    url: note.link || '',
    stat: note.views || ''
  };
});
