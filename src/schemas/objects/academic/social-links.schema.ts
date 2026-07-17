import { z } from 'zod';

export const SocialLinksSchema = z.object({
  usernames: z
    .object({
      linkedin: z.string().trim().min(1).optional(),
      github: z.string().trim().min(1).optional(),
      mastodon: z.string().trim().min(1).optional(),
      bluesky: z.string().trim().min(1).optional(),
      x: z.string().trim().min(1).optional(),
      facebook: z.string().trim().min(1).optional(),
      instagram: z.string().trim().min(1).optional(),
      youtube: z.string().trim().min(1).optional(),
    })
    .optional(),
  otherPlatforms: z
    .array(
      z.object({
        platformName: z.string().trim().min(1),
        url: z.url(),
        icon: z.url().optional(),
      })
    )
    .optional(),
});

export type SocialLinks = z.infer<typeof SocialLinksSchema>;
