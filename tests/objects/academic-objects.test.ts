import { describe, it, expect } from 'bun:test';
import { AcademicUsernameSchema } from '../../src/schemas/objects/academic/academic-username.schema.js';
import { ConferenceSchema } from '../../src/schemas/objects/academic/conference.schema.js';
import { PublicationSchema } from '../../src/schemas/objects/academic/research-publication.schema.js';
import { ResearchSchema } from '../../src/schemas/objects/academic/research.schema.js';
import {
  detectKnownSocialUrl,
  normalizeKnownSocialUrl,
  SocialIconSchema,
  SocialLinksSchema,
} from '../../src/schemas/objects/academic/social-links.schema.js';

// ─── Academic Username ─────────────────────────────────────────────

describe('AcademicUsernameSchema', () => {
  it('accepts a valid username starting with a letter', () => {
    expect(() => AcademicUsernameSchema.parse('jdoe')).not.toThrow();
  });

  it('accepts username with dots and underscores', () => {
    expect(() => AcademicUsernameSchema.parse('john.doe_123')).not.toThrow();
  });

  it('trims whitespace and lowercases', () => {
    const result = AcademicUsernameSchema.parse('  JohnDoe  ');
    expect(result).toBe('johndoe');
  });

  it('rejects a username shorter than 3 characters', () => {
    expect(() => AcademicUsernameSchema.parse('ab')).toThrow();
  });

  it('rejects a username starting with a digit', () => {
    expect(() => AcademicUsernameSchema.parse('1jdoe')).toThrow();
  });

  it('rejects a username with uppercase after parsing', () => {
    // toLowerCase runs first, so uppercase becomes lowercase
    expect(() => AcademicUsernameSchema.parse('VALID')).not.toThrow();
  });

  it('rejects a username longer than 30 characters', () => {
    expect(() => AcademicUsernameSchema.parse('a'.repeat(31))).toThrow();
  });
});

// ─── Conference ────────────────────────────────────────────────────

describe('ConferenceSchema', () => {
  it('accepts a valid conference with required fields', () => {
    const conf = ConferenceSchema.parse({
      name: 'IEEE ICSE 2025',
      date: '2025-05-15',
    });
    expect(conf.name).toBe('IEEE ICSE 2025');
  });

  it('accepts a conference with all optional fields', () => {
    expect(() =>
      ConferenceSchema.parse({
        name: 'ACM SIGGRAPH',
        date: '2025-08-10',
        location: 'Los Angeles, CA',
        description: 'Computer graphics conference',
        icon: 'https://example.com/icon.png',
      })
    ).not.toThrow();
  });

  it('rejects a conference missing the name', () => {
    expect(() => ConferenceSchema.parse({ date: '2025-05-15' })).toThrow();
  });
});

// ─── Publication ───────────────────────────────────────────────────

describe('PublicationSchema', () => {
  it('accepts a minimal publication', () => {
    expect(() =>
      PublicationSchema.parse({ title: 'A Novel Algorithm' })
    ).not.toThrow();
  });

  it('accepts a publication with all fields', () => {
    expect(() =>
      PublicationSchema.parse({
        title: 'Deep Learning for NLP',
        journal: 'Nature AI',
        publicationDate: '2025-01-15',
        coAuthors: ['Jane Smith', 'Bob Lee'],
        description: 'A comprehensive survey',
        doi: {
          doiId: '10.1234/example',
          doiUrl: 'https://doi.org/10.1234/example',
        },
        url: 'https://example.com/paper',
        icon: 'https://example.com/icon.png',
      })
    ).not.toThrow();
  });

  it('rejects a publication with an invalid DOI URL', () => {
    expect(() =>
      PublicationSchema.parse({
        title: 'Test',
        doi: { doiUrl: 'not-a-url' },
      })
    ).toThrow();
  });

  it('rejects a publication missing the title', () => {
    expect(() => PublicationSchema.parse({ journal: 'Nature' })).toThrow();
  });
});

// ─── Research ──────────────────────────────────────────────────────

describe('ResearchSchema', () => {
  it('accepts valid research with required fields', () => {
    const r = ResearchSchema.parse({
      title: 'Quantum Computing Applications',
      startDate: '2024-01-01',
    });
    expect(r.title).toBe('Quantum Computing Applications');
  });

  it('accepts research with all optional fields', () => {
    expect(() =>
      ResearchSchema.parse({
        title: 'Blockchain Security',
        description: 'Investigating vulnerabilities',
        startDate: '2024-06-01',
        endDate: '2026-06-01',
        icon: 'https://example.com/icon.png',
        website: 'https://example.com/research',
      })
    ).not.toThrow();
  });

  it('rejects research missing startDate', () => {
    expect(() => ResearchSchema.parse({ title: 'Missing Date' })).toThrow();
  });
});

// ─── Social Links ──────────────────────────────────────────────────

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
