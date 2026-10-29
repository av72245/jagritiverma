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
  placeholderPhotos: 13,

  /* Brands she has made content for. Names only until each brand has agreed to a logo being shown. */
  brands: ['SHEIN'],
  brandSlots: 5,

  /* Free ka gyan cards. General information only. */
  tips: [
    { tag: 'Pre-approval', q: 'Pre-approved means the house is sorted, right?',
      a: 'Not quite. Pre-approval is a lender’s conditional yes on how much you could borrow. It can change if your finances or the property change, so treat it as a green light to start looking, not a promise.' },
    { tag: 'Rates', q: 'Which number should I compare on a loan?',
      a: 'Look at the comparison rate as well as the headline rate. It rolls most fees into one figure, so two loans are easier to compare side by side.' },
    { tag: 'Credit file', q: 'Does applying at lots of lenders hurt?',
      a: 'Each credit application can leave an enquiry on your credit file, and a pile of them can look risky. Talk it through first, then apply where it makes sense.' },
    { tag: 'Costs', q: 'Is the deposit the only cost?',
      a: 'No. Budget for stamp duty (it varies by state), legal or conveyancing fees, building and pest checks, and moving costs. Leaving these out is a common surprise.' },
    { tag: 'Borrowing', q: 'What do lenders actually look at?',
      a: 'Not just income. They look at spending, debts, credit card limits and dependants too. Even an unused card limit can reduce how much you can borrow.' },
    { tag: 'Offset', q: 'What is an offset account?',
      a: 'A transaction account linked to your loan, on loans that offer one. The balance in it is offset against your loan when interest is worked out, so you can pay less interest and still reach your cash.' },
    { tag: 'Check-up', q: 'How often should I review my loan?',
      a: 'A yearly check is a good habit. Rates and products change, and the loan that suited you at the start may not still be the best fit.' },
    { tag: 'Deposit', q: 'Can I buy with less than a 20% deposit?',
      a: 'Often yes. With a smaller deposit a lender may charge lenders mortgage insurance, and some schemes can help first home buyers. What applies to you depends on your situation, so ask before you assume.' }
  ]
};
