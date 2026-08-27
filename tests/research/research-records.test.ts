import { describe, expect, it } from 'bun:test';
import { ConferenceSchema } from '../../src/schemas/research/conference.schema.js';
import { PublicationSchema } from '../../src/schemas/research/research-publication.schema.js';
import { ResearchSchema } from '../../src/schemas/research/research.schema.js';

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
