/*
  Wording for the site. Photos and reels are NOT listed here: drop them into
  media/photos and media/reels and they appear on the next build.
*/
export const site = {
  name: 'Jagriti Verma',
  title: 'Jagriti Verma | Melbourne lifestyle creator and mortgage broker',
  description: 'Jagriti Verma is a Melbourne lifestyle creator (@jaginmelbourne), mortgage broker at KIN Finance and founder of Women Wealth Circle. Reels, money tips and brand collaborations.',
  instagram: 'https://www.instagram.com/jaginmelbourne/',
  sameAs: [
    'https://www.instagram.com/jaginmelbourne/',
    'https://www.instagram.com/mortgagebroker_jag/',
    'https://www.instagram.com/siblings_gone_rogue/'
  ],

  /* Words that rotate in the hero line: "Creator in Melbourne. Also a ___." */
  roles: ['mortgage broker', 'unfiltered optimist', 'community founder', 'skincare founder', 'former credit assessor', 'former engineer', 'creator'],

  /* Scrolling band under the hero */
  marquee: ['Lifestyle', 'Melbourne', 'Free ka gyan', 'Banker to broker', "Men's skincare", 'Glamping', 'Home loans', 'Unfiltered optimist'],

  /* Optional licensed music file in public/, e.g. '/audio/theme.mp3'. Empty = built-in soft synth loop. */
  audio: '',

  /* Shown as "coming soon" reels until real videos are in media/reels */
  placeholderReels: ['Glamping', 'Hotham 2026', 'Perth 2026', 'Banker to broker', 'Free ka gyan', 'Skincare'],
  /* How many "coming soon" photo tiles to show while media/photos is empty */
  placeholderPhotos: 13
  /* Brands, formats and the work page live in src/data/work.json.
     Free ka gyan tips live in src/content/gyan/, one file per question. */
};
