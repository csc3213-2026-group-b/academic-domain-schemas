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
    const [, section, slug] = url.pathname.split('/');
    if (section !== 'in' || !slug) return null;
    handle = cleanPathPart(slug);
  }

  if (!/^[a-zA-Z0-9-]{3,100}$/.test(handle)) return null;
  return `https://www.linkedin.com/in/${handle}`;
}

function normalizeGithub(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['github.com'])) {
    const [, slug] = url.pathname.split('/');
    if (!slug || url.pathname.split('/').length > 2) return null;
    handle = cleanPathPart(slug);
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
    server = url.hostname.toLowerCase();
    const [, first, second] = url.pathname.split('/');
    if (first?.startsWith('@')) {
      username = cleanPathPart(first);
    } else if (first === 'users' && second) {
      username = cleanPathPart(second);
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
    const [, section, slug] = url.pathname.split('/');
    if (section !== 'profile' || !slug) return null;
    handle = cleanPathPart(slug).toLowerCase();
  }

  if (!domainHandlePattern.test(handle)) return null;
  return `https://bsky.app/profile/${handle}`;
}

function normalizeX(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['x.com', 'twitter.com'])) {
    const [, slug] = url.pathname.split('/');
    if (!slug || url.pathname.split('/').length > 2) return null;
    handle = cleanPathPart(slug);
  }

  if (!/^[A-Za-z0-9_]{1,15}$/.test(handle)) return null;
  return `https://x.com/${handle}`;
}

function normalizeFacebook(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['facebook.com', 'fb.com'])) {
    const [, slug] = url.pathname.split('/');
    if (!slug || url.pathname.split('/').length > 2) return null;
    handle = cleanPathPart(slug);
  }

  if (!/^[A-Za-z0-9.]{5,50}$/.test(handle)) return null;
  return `https://www.facebook.com/${handle}`;
}

function normalizeInstagram(value: string): string | null {
  const url = urlFromInput(value);
  let handle = normalizeBareHandle(value);

  if (url && isAllowedHost(url.hostname, ['instagram.com'])) {
    const [, slug] = url.pathname.split('/');
    if (!slug || url.pathname.split('/').length > 2) return null;
    handle = cleanPathPart(slug);
  }

  if (!/^[A-Za-z0-9._]{1,30}$/.test(handle)) return null;
  return `https://www.instagram.com/${handle}`;
}

function normalizeYoutube(value: string): string | null {
  const url = urlFromInput(value);
  let handle = value.trim();

  if (url && isAllowedHost(url.hostname, ['youtube.com', 'youtu.be'])) {
    const [, section, slug] = url.pathname.split('/');
    if (section === 'channel' && slug && /^UC[A-Za-z0-9_-]{20,}$/.test(slug)) {
      return `https://www.youtube.com/channel/${slug}`;
    }
    if (section?.startsWith('@')) handle = section;
    else if (['c', 'user'].includes(section ?? '') && slug) handle = slug;
    else return null;
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
    usernames: knownSocialValuesSchema,
    otherPlatforms: z
      .array(
        z.object({
          platformName: z.string().trim().min(1),
          url: z.url(),
          icon: z.url().optional(),
        })
      )
      .optional(),
  })
  .transform((value, ctx) => {
    const urls: Partial<Record<KnownSocialPlatform, string>> = {};

    for (const source of ['usernames', 'urls'] as const) {
      const entries = value[source];
      if (!entries) continue;

      for (const platform of KnownSocialPlatforms) {
        const input = entries[platform];
        if (!input) continue;

        const normalized = normalizeKnownSocialUrl(platform, input);
        if (!normalized) {
          ctx.addIssue({
            code: 'custom',
            path: [source, platform],
            message: `Invalid ${platform} profile URL or username`,
          });
          continue;
        }

        urls[platform] = normalized;
      }
    }

    const result: {
      urls?: Partial<Record<KnownSocialPlatform, string>>;
      otherPlatforms?: typeof value.otherPlatforms;
    } = {};

    if (Object.keys(urls).length > 0) result.urls = urls;
    if (value.otherPlatforms) result.otherPlatforms = value.otherPlatforms;

    return result;
  });

export type SocialLinks = z.infer<typeof SocialLinksSchema>;
