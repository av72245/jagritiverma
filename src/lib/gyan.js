import { getCollection } from 'astro:content';

const COL = [['--rose', '--on-pop'], ['--sea', '--on-pop'], ['--gold', '--on-pop'], ['--royal', '--on-royal']];

/* All tips in display order, each with its accent colour */
export async function getTips() {
  const tips = (await getCollection('gyan')).sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
  return tips.map((t, i) => ({ ...t, c: COL[i % 4][0], on: COL[i % 4][1] }));
}
