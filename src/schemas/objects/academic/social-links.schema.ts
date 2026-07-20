import { z } from 'zod';

export const KnownSocialPlatforms = [
  'linkedin',
  'github',
  'mastodon',
  'bluesky',
  'x',
  'facebook',
  'instagram',
  'youtube',
] as const;

export type KnownSocialPlatform = (typeof KnownSocialPlatforms)[number];

export const KnownSocialIcons = {
  linkedin: { type: 'simple-icons', slug: 'linkedin' },
  github: { type: 'simple-icons', slug: 'github' },
  mastodon: { type: 'simple-icons', slug: 'mastodon' },
  bluesky: { type: 'simple-icons', slug: 'bluesky' },
  x: { type: 'simple-icons', slug: 'x' },
  facebook: { type: 'simple-icons', slug: 'facebook' },
  instagram: { type: 'simple-icons', slug: 'instagram' },
  youtube: { type: 'simple-icons', slug: 'youtube' },
} as const satisfies Record<
  KnownSocialPlatform,
  { type: 'simple-icons'; slug: string }
>;

const domainHandlePattern =
  /^(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{1,62}$/;

function urlFromInput(value: string): URL | null {
  const input = value.trim();
  if (input === '') return null;

  if (URL.canParse(input)) return new URL(input);
  if (URL.canParse(`https://${input}`)) return new URL(`https://${input}`);

  return null;
}

function cleanPathPart(value: string): string {
  return decodeURIComponent(value).trim().replace(/^@/, '').replace(/\/+$/, '');
}

function isAllowedHost(hostname: string, allowed: string[]) {
  const host = hostname.toLowerCase().replace(/^www\./, '');
  return allowed.includes(host);
}

function normalizeBareHandle(value: string): string {
  return value.trim().replace(/^@/, '').replace(/\/+$/, '');
}

function normalizeLinkedin(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['linkedin.com'])) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] !== 'in' || !parts[1] || parts.length > 2) return null;
    handle = cleanPathPart(parts[1]);
  }

  if (!/^[a-zA-Z0-9-]{3,100}$/.test(handle)) return null;
  return `https://www.linkedin.com/in/${handle}`;
}

function normalizeGithub(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['github.com'])) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 1) return null;
    handle = cleanPathPart(parts[0] ?? '');
  }

  if (
    !/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(handle) ||
    handle.includes('--')
  ) {
    return null;
  }

  return `https://github.com/${handle}`;
}

function normalizeMastodon(value: string): string | null {
  const handleMatch =
    /^@?([A-Za-z0-9_]{1,30})@([A-Za-z0-9.-]+\.[A-Za-z]{2,})$/.exec(
      value.trim()
    );
  if (handleMatch) {
    return `https://${handleMatch[2]?.toLowerCase()}/@${handleMatch[1]}`;
  }

  const url = urlFromInput(value);
  let username = '';
  let server = '';

  if (url) {
    server = url.hostname.toLowerCase().replace(/^www\./, '');
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0]?.startsWith('@')) username = cleanPathPart(parts[0]);
    else if (parts[0] === 'users' && parts[1]) {
      username = cleanPathPart(parts[1]);
    }
  }

  if (
    !/^[A-Za-z0-9_]{1,30}$/.test(username) ||
    !domainHandlePattern.test(server)
  ) {
    return null;
  }

  return `https://${server}/@${username}`;
}

function normalizeBluesky(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value).toLowerCase();

  if (url) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] !== 'profile' || !parts[1] || parts.length > 2) return null;
    handle = cleanPathPart(parts[1]).toLowerCase();
  }

  if (!domainHandlePattern.test(handle)) return null;
  return `https://bsky.app/profile/${handle}`;
}

function normalizeX(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['x.com', 'twitter.com'])) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 1) return null;
    handle = cleanPathPart(parts[0] ?? '');
  }

  if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) return null;
  return `https://x.com/${handle}`;
}

function normalizeFacebook(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['facebook.com', 'fb.com'])) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 1) return null;
    handle = cleanPathPart(parts[0] ?? '');
  }

  if (!/^[A-Za-z0-9.]{5,50}$/.test(handle)) return null;
  return `https://www.facebook.com/${handle}`;
}

function normalizeInstagram(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['instagram.com'])) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 1) return null;
    handle = cleanPathPart(parts[0] ?? '');
  }

  if (!/^[A-Za-z0-9._]{1,30}$/.test(handle)) return null;
  return `https://www.instagram.com/${handle}`;
}

function normalizeYoutube(value: string): string | null {
  const url = urlFromInput(value);
  let handle = value.trim();

  if (url && isAllowedHost(url.hostname, ['youtube.com', 'youtu.be'])) {
    const parts = url.pathname.split('/').filter(Boolean);
    if (
      parts[0] === 'channel' &&
      /^UC[A-Za-z0-9_-]{20,}$/.test(parts[1] ?? '')
    ) {
      return `https://www.youtube.com/channel/${parts[1]}`;
    }
    if (parts[0]?.startsWith('@')) handle = parts[0];
    else if (['c', 'user'].includes(parts[0] ?? '') && parts[1]) {
      handle = parts[1];
    } else {
      return null;
    }
  }

  handle = normalizeBareHandle(handle);
  if (!/^[A-Za-z0-9._-]{3,30}$/.test(handle)) return null;
  return `https://www.youtube.com/@${handle}`;
}

export function normalizeKnownSocialUrl(
  platform: KnownSocialPlatform,
  value: string
): string | null {
  if (value.trim() === '') return null;

  if (platform === 'linkedin') return normalizeLinkedin(value);
  if (platform === 'github') return normalizeGithub(value);
  if (platform === 'mastodon') return normalizeMastodon(value);
  if (platform === 'bluesky') return normalizeBluesky(value);
  if (platform === 'x') return normalizeX(value);
  if (platform === 'facebook') return normalizeFacebook(value);
  if (platform === 'instagram') return normalizeInstagram(value);
  return normalizeYoutube(value);
}

export function detectKnownSocialUrl(
  value: string
): { platform: KnownSocialPlatform; url: string } | null {
  for (const platform of KnownSocialPlatforms) {
    const url = normalizeKnownSocialUrl(platform, value);
    if (url) return { platform, url };
  }

  return null;
}

export const SocialIconSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('simple-icons'),
    slug: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-z0-9-]+$/),
  }),
  z.object({
    type: z.literal('font-awesome'),
    style: z.literal('brands').default('brands'),
    name: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-z0-9-]+$/),
  }),
  z.object({
    type: z.literal('url'),
    url: z.url(),
  }),
]);

const knownSocialValuesSchema = z
  .object(
    Object.fromEntries(
      KnownSocialPlatforms.map((platform) => [
        platform,
        z.string().trim().min(1).optional(),
      ])
    ) as Record<KnownSocialPlatform, z.ZodOptional<z.ZodString>>
  )
  .optional();

export const SocialLinksSchema = z
  .object({
    urls: knownSocialValuesSchema,
    otherPlatforms: z
      .array(
        z.object({
          platformName: z.string().trim().min(1),
          url: z.url(),
          icon: SocialIconSchema.optional(),
        })
      )
      .optional(),
  })
  .transform((value, ctx) => {
    const urls: Partial<Record<KnownSocialPlatform, string>> = {};
    const otherPlatforms: NonNullable<typeof value.otherPlatforms> = [];

    if (value.urls) {
      for (const platform of KnownSocialPlatforms) {
        const input = value.urls[platform];
        if (!input) continue;

        const normalized = normalizeKnownSocialUrl(platform, input);
        if (!normalized) {
          ctx.addIssue({
            code: 'custom',
            path: ['urls', platform],
            message: `Invalid ${platform} profile URL or username`,
          });
          continue;
        }

        urls[platform] = normalized;
      }
    }

    for (const platform of value.otherPlatforms ?? []) {
      const known = detectKnownSocialUrl(platform.url);
      if (known) {
        urls[known.platform] = known.url;
        continue;
      }

      otherPlatforms.push(platform);
    }

    const result: {
      urls?: Partial<Record<KnownSocialPlatform, string>>;
      otherPlatforms?: typeof otherPlatforms;
    } = {};

    if (Object.keys(urls).length > 0) result.urls = urls;
    if (otherPlatforms.length > 0) result.otherPlatforms = otherPlatforms;

    return result;
  });

export type SocialIcon = z.infer<typeof SocialIconSchema>;
export type SocialLinks = z.infer<typeof SocialLinksSchema>;
