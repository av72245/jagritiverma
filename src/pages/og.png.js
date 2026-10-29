import sharp from 'sharp';

/* Share card used when no portrait is in media/portrait */
export async function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><radialGradient id="g" cx="30%" cy="25%" r="80%"><stop offset="0" stop-color="#FF6F91"/><stop offset=".55" stop-color="#FF3D77"/><stop offset="1" stop-color="#F2A100"/></radialGradient></defs>
  <rect width="1200" height="630" fill="#150F1A"/>
  <circle cx="1010" cy="120" r="260" fill="#0FA3A0" opacity=".35"/>
  <circle cx="900" cy="330" r="170" fill="url(#g)"/>
  <text x="900" y="372" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="120" text-anchor="middle" fill="#1B1421">JV</text>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="108" fill="#F7EEF4">Jagriti</text>
  <text x="80" y="410" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="108" fill="#F7EEF4">Verma</text>
  <text x="84" y="490" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#B9AAC2">Melbourne creator · Mortgage broker · Founder</text>
</svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
