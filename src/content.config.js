import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Free ka gyan: one Markdown file per question in src/content/gyan/.
   The filename becomes the page address: offset-account.md -> /gyan/offset-account */
const gyan = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/gyan' }),
  schema: z.object({
    question: z.string(),
    tag: z.string(),
    short: z.string(),            // two-sentence answer on the flip card
    description: z.string(),      // shown in Google results, about 150 characters
    order: z.number().default(99),
    updated: z.coerce.date()
  })
});

export const collections = { gyan };
