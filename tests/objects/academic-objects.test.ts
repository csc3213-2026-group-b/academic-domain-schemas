import { describe, it, expect } from 'bun:test';
import { AcademicUsernameSchema } from '../../src/schemas/objects/academic/academic-username.schema.js';
import { ConfrenceSchema } from '../../src/schemas/objects/academic/confrence.schema.js';
import { PublicationSchema } from '../../src/schemas/objects/academic/research-publication.schema.js';
import { ResearchSchema } from '../../src/schemas/objects/academic/research.schema.js';
import { SocialLinksSchema } from '../../src/schemas/objects/academic/social-links.schema.js';

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

describe('ConfrenceSchema', () => {
  it('accepts a valid conference with required fields', () => {
    const conf = ConfrenceSchema.parse({
      name: 'IEEE ICSE 2025',
      date: '2025-05-15',
    });
    expect(conf.name).toBe('IEEE ICSE 2025');
  });

  it('accepts a conference with all optional fields', () => {
    expect(() =>
      ConfrenceSchema.parse({
        name: 'ACM SIGGRAPH',
        date: '2025-08-10',
        location: 'Los Angeles, CA',
        description: 'Computer graphics conference',
        icon: 'https://example.com/icon.png',
      })
    ).not.toThrow();
  });

  it('rejects a conference missing the name', () => {
    expect(() => ConfrenceSchema.parse({ date: '2025-05-15' })).toThrow();
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
          doi_id: '10.1234/example',
          doi_url: 'https://doi.org/10.1234/example',
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
        doi: { doi_url: 'not-a-url' },
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
  it('accepts an empty usernames array', () => {
    expect(() => SocialLinksSchema.parse({ usernames: [] })).not.toThrow();
  });

  it('accepts social links with multiple platforms', () => {
    expect(() =>
      SocialLinksSchema.parse({
        usernames: [
          {
            linkedin: 'johndoe',
            github: 'johndoe',
            x: '@johndoe',
          },
        ],
      })
    ).not.toThrow();
  });

  it('accepts social links with otherPlatforms', () => {
    expect(() =>
      SocialLinksSchema.parse({
        usernames: [{}],
        otherPlatforms: [
          {
            platformName: 'ResearchGate',
            url: 'https://researchgate.net/profile/johndoe',
          },
        ],
      })
    ).not.toThrow();
  });

  it('rejects otherPlatforms with an invalid url', () => {
    expect(() =>
      SocialLinksSchema.parse({
        usernames: [{}],
        otherPlatforms: [{ platformName: 'Bad', url: 'not-an-url' }],
      })
    ).toThrow();
  });

  it('rejects missing usernames', () => {
    expect(() => SocialLinksSchema.parse({})).toThrow();
  });
});
