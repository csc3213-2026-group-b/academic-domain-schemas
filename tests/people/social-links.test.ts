import { describe, expect, it } from 'bun:test';

import {
  detectKnownSocialUrl,
  normalizeKnownSocialUrl,
  SocialIconSchema,
  SocialLinksSchema,
} from '@/schemas/people/social-links.schema';

describe('SocialLinksSchema', () => {
  it('accepts an empty social-links object', () => {
    expect(() => SocialLinksSchema.parse({})).not.toThrow();
  });

  it('normalizes known social urls and adds canonical hosts', () => {
    expect(
      SocialLinksSchema.parse({
        urls: {
          instagram: 'instagram.com/@johndoe',
          facebook: 'facebook.com/john.doe',
          linkedin: 'linkedin.com/in/johndoe',
          github: 'https://github.com/johndoe',
        },
      })
    ).toEqual({
      urls: {
        instagram: 'https://www.instagram.com/johndoe',
        facebook: 'https://www.facebook.com/john.doe',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
      },
    });
  });

  it('normalizes old Twitter URLs to X URLs', () => {
    expect(normalizeKnownSocialUrl('x', 'twitter.com/johndoe')).toBe(
      'https://x.com/johndoe'
    );
  });

  it('normalizes Bluesky front-facing profile URLs to bsky.app', () => {
    expect(
      normalizeKnownSocialUrl(
        'bluesky',
        'https://example.social/profile/johndoe.bsky.social'
      )
    ).toBe('https://bsky.app/profile/johndoe.bsky.social');
  });

  it('normalizes Mastodon handles to server profile urls', () => {
    expect(
      normalizeKnownSocialUrl('mastodon', '@johndoe@mastodon.social')
    ).toBe('https://mastodon.social/@johndoe');
  });

  it('normalizes supported Mastodon profile URL formats', () => {
    expect(
      normalizeKnownSocialUrl(
        'mastodon',
        'https://mastodon.social/users/johndoe'
      )
    ).toBe('https://mastodon.social/@johndoe');
    expect(
      normalizeKnownSocialUrl('mastodon', 'https://mastodon.social/@johndoe')
    ).toBe('https://mastodon.social/@johndoe');
  });

  it('normalizes supported YouTube profile URL formats', () => {
    expect(
      normalizeKnownSocialUrl(
        'youtube',
        'https://youtube.com/channel/UC12345678901234567890'
      )
    ).toBe('https://www.youtube.com/channel/UC12345678901234567890');
    expect(
      normalizeKnownSocialUrl('youtube', 'https://youtube.com/@johndoe')
    ).toBe('https://www.youtube.com/@johndoe');
    expect(
      normalizeKnownSocialUrl('youtube', 'https://youtube.com/c/johndoe')
    ).toBe('https://www.youtube.com/@johndoe');
  });

  it('rejects malformed and non-profile social inputs', () => {
    expect(normalizeKnownSocialUrl('linkedin', 'not a profile')).toBeNull();
    expect(
      normalizeKnownSocialUrl('mastodon', 'https://localhost/users/johndoe')
    ).toBeNull();
    expect(
      normalizeKnownSocialUrl('youtube', 'https://youtube.com/watch?v=123')
    ).toBeNull();
  });

  it('detects known social urls entered as other platforms', () => {
    expect(detectKnownSocialUrl('https://twitter.com/johndoe')).toEqual({
      platform: 'x',
      url: 'https://x.com/johndoe',
    });
  });

  it('lifts known other-platform URLs and drops their editable icons', () => {
    expect(
      SocialLinksSchema.parse({
        otherPlatforms: [
          {
            platformName: 'Twitter',
            url: 'https://twitter.com/johndoe',
            icon: {
              type: 'url',
              url: 'https://example.com/icon.svg',
            },
          },
          {
            platformName: 'ResearchGate',
            url: 'https://researchgate.net/profile/johndoe',
            icon: {
              type: 'simple-icons',
              slug: 'researchgate',
            },
          },
        ],
      })
    ).toEqual({
      urls: {
        x: 'https://x.com/johndoe',
      },
      otherPlatforms: [
        {
          platformName: 'ResearchGate',
          url: 'https://researchgate.net/profile/johndoe',
          icon: {
            type: 'simple-icons',
            slug: 'researchgate',
          },
        },
      ],
    });
  });

  it('accepts Font Awesome brand icons for other platforms', () => {
    expect(
      SocialIconSchema.parse({
        type: 'font-awesome',
        name: 'orcid',
      })
    ).toEqual({
      type: 'font-awesome',
      style: 'brands',
      name: 'orcid',
    });
  });

  it('accepts manual icon URLs for other platforms', () => {
    expect(() =>
      SocialIconSchema.parse({
        type: 'url',
        url: 'https://example.com/icon.svg',
      })
    ).not.toThrow();
  });

  it('rejects an empty platform name', () => {
    expect(() =>
      SocialLinksSchema.parse({
        otherPlatforms: [
          {
            platformName: ' ',
            url: 'https://example.com',
          },
        ],
      })
    ).toThrow();
  });

  it('rejects an invalid platform URL', () => {
    expect(() =>
      SocialLinksSchema.parse({
        otherPlatforms: [
          {
            platformName: 'Example',
            url: 'not-a-url',
          },
        ],
      })
    ).toThrow();
  });

  it('rejects invalid known social links', () => {
    expect(() =>
      SocialLinksSchema.parse({
        urls: {
          instagram: 'https://example.com/johndoe',
        },
      })
    ).toThrow();
  });
});
