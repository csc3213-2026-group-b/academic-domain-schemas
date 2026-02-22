import { z } from 'zod';

export const SocialLinksSchema = z.object({
  usernames: z.array(
    z.object({
      linkedin: z.string().optional(),
      github: z.string().optional(),
      mastodon: z.string().optional(),
      bluesky: z.string().optional(),
      x: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
    })
  ),
  otherPlatforms: z
    .array(
      z.object({
        platformName: z.string(),
        url: z.url(),
        icon: z.url().optional(),
      })
    )
    .optional(),
});

export type SocialLinks = z.infer<typeof SocialLinksSchema>;
