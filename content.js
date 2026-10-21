/*
  Edit this file to change the media and wording on the site.
  Paths are relative to index.html. If a file is missing, the page shows a "coming soon" tile instead.
*/
window.SITE = {
  /* Words that rotate in the hero line: "Creator in Melbourne. Also a ___." */
  roles: ['mortgage broker', 'unfiltered optimist', 'community founder', 'skincare founder', 'former credit assessor', 'former engineer', 'creator'],

  /* Optional: path to a licensed music file, e.g. 'media/audio/theme.mp3'. Leave empty to use the built-in soft synth loop. */
  audio: '',

  /* Photos for the Banker / Broker / Founder slider */
  hats: {
    banker: 'media/photos/hat-banker.jpg',
    broker: 'media/photos/hat-broker.jpg',
    founder: 'media/photos/hat-founder.jpg'
  },

  /* Most-watched reels. Put the video in media/reels/ (mp4, vertical, about 3 to 6 MB) and a still image beside it.
     url = the reel's Instagram link (the small arrow icon opens it). stat = e.g. '1.2M plays' (optional). */
  reels: [
    { title: 'Glamping',         src: 'media/reels/01.mp4', poster: 'media/reels/01.jpg', url: 'https://www.instagram.com/jaginmelbourne/reels/', stat: '' },
    { title: 'Hotham 2026',      src: 'media/reels/02.mp4', poster: 'media/reels/02.jpg', url: 'https://www.instagram.com/jaginmelbourne/reels/', stat: '' },
    { title: 'Perth 2026',       src: 'media/reels/03.mp4', poster: 'media/reels/03.jpg', url: 'https://www.instagram.com/jaginmelbourne/reels/', stat: '' },
    { title: 'Banker to broker', src: 'media/reels/04.mp4', poster: 'media/reels/04.jpg', url: 'https://www.instagram.com/jaginmelbourne/reels/', stat: '' },
    { title: 'Free ka gyan',     src: 'media/reels/05.mp4', poster: 'media/reels/05.jpg', url: 'https://www.instagram.com/jaginmelbourne/reels/', stat: '' },
    { title: 'Skincare',         src: 'media/reels/06.mp4', poster: 'media/reels/06.jpg', url: 'https://www.instagram.com/jaginmelbourne/reels/', stat: '' }
  ],

  /* Photo mosaic. Delete lines you do not need. Put images in media/photos/ (jpg or webp, about 1600 px wide). */
  photos: [
    { src: 'media/photos/01.jpg', cap: 'Add a caption' },
    { src: 'media/photos/02.jpg', cap: 'Add a caption' },
    { src: 'media/photos/03.jpg', cap: 'Add a caption' },
    { src: 'media/photos/04.jpg', cap: 'Add a caption' },
    { src: 'media/photos/05.jpg', cap: 'Add a caption' },
    { src: 'media/photos/06.jpg', cap: 'Add a caption' },
    { src: 'media/photos/07.jpg', cap: 'Add a caption' },
    { src: 'media/photos/08.jpg', cap: 'Add a caption' },
    { src: 'media/photos/09.jpg', cap: 'Add a caption' },
    { src: 'media/photos/10.jpg', cap: 'Add a caption' },
    { src: 'media/photos/11.jpg', cap: 'Add a caption' },
    { src: 'media/photos/12.jpg', cap: 'Add a caption' },
    { src: 'media/photos/13.jpg', cap: 'Add a caption' }
  ],

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
