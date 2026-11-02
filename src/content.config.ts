import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    description: z.string(),
    pubDate: z.string(),
    displayDate: z.string(),
    author: z.string(),
    authorAvatar: z.string(),
    coverImage: z.string(),
    readingTime: z.number(),
    tags: z.array(
      z.object({
        slug: z.string(),
        label: z.string(),
      })
    ),
  }),
});

export const collections = { blog };
