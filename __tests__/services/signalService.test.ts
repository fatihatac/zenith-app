import { RssParserService, HtmlSanitizerService, rssAggregator } from '@/services/signalService';
import { RSS_SOURCES } from '@/types/signal';

// ─── Test Fixtures ────────────────────────────────────────────────────

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test Feed</title>
    <item>
      <title>Test Article</title>
      <link>https://example.com/article1</link>
      <description>This is a test article description.</description>
      <pubDate>Mon, 15 May 2025 10:00:00 GMT</pubDate>
      <guid>guid-123</guid>
    </item>
  </channel>
</rss>`;

const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Atom Feed</title>
  <entry>
    <title>Atom Article</title>
    <link href="https://example.com/atom1"/>
    <summary type="html">Atom summary with <b>bold</b> text.</summary>
    <published>2025-05-15T10:00:00Z</published>
    <id>atom-guid-1</id>
  </entry>
</feed>`;

// ─── RssParserService ─────────────────────────────────────────────────

describe('RssParserService', () => {
  const parser = new RssParserService();

  it('parses RSS 2.0 XML correctly', () => {
    const items = parser.parseRss(rssXml, 'test', 'Test Feed', 'Technology');

    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Test Article');
    expect(items[0].link).toBe('https://example.com/article1');
    expect(items[0].pubDate).toBe('Mon, 15 May 2025 10:00:00 GMT');
    expect(items[0].guid).toBe('guid-123');
  });

  it('parses Atom XML correctly', () => {
    const items = parser.parseRss(atomXml, 'test', 'Atom Feed', 'Technology');

    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Atom Article');
    expect(items[0].link).toBe('https://example.com/atom1');
    expect(items[0].pubDate).toBe('2025-05-15T10:00:00Z');
    expect(items[0].guid).toBe('atom-guid-1');
  });

  it('returns empty array for invalid XML', () => {
    const items = parser.parseRss(
      'this is not valid xml at all',
      'test',
      'Test Feed',
      'Technology',
    );
    expect(items).toEqual([]);
  });

  it('extracts CDATA content from description', () => {
    const cdataXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CDATA Feed</title>
    <item>
      <title>CDATA Article</title>
      <link>https://example.com/cdata</link>
      <description><![CDATA[<p>This is <b>CDATA</b> content</p>]]></description>
      <pubDate>Tue, 20 May 2025 12:00:00 GMT</pubDate>
      <guid>cdata-guid-1</guid>
    </item>
  </channel>
</rss>`;

    const items = parser.parseRss(cdataXml, 'test', 'CDATA Feed', 'Technology');
    expect(items).toHaveLength(1);
    // CDATA content should be extracted as raw text (including HTML tags)
    expect(items[0].description).toBe('<p>This is <b>CDATA</b> content</p>');
  });
});

// ─── HtmlSanitizerService ─────────────────────────────────────────────

describe('HtmlSanitizerService', () => {
  const sanitizer = new HtmlSanitizerService();

  it('strips HTML tags', () => {
    expect(sanitizer.sanitize('<p>Hello <b>World</b></p>')).toBe('Hello World');
  });

  it('decodes HTML entities', () => {
    expect(sanitizer.sanitize('Hello &amp; &lt;World&gt;')).toBe('Hello & <World>');
  });

  it('truncates text longer than maxLength with ellipsis', () => {
    const longText = 'a'.repeat(200);
    const result = sanitizer.sanitize(longText, 120);
    // substring(0, 120) + '…' = 121 chars max
    expect(result.length).toBeLessThanOrEqual(122);
    expect(result.endsWith('…')).toBe(true);
  });

  it('handles empty string input', () => {
    expect(sanitizer.sanitize('')).toBe('');
    expect(sanitizer.sanitize('', 120)).toBe('');
  });
});

// ─── RssAggregatorService (via exported instance) ─────────────────────

describe('RssAggregatorService', () => {
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchSpy = jest.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetchAll fetches from all RSS_SOURCES and returns parsed items', async () => {
    let callCount = 0;
    fetchSpy.mockImplementation(() => {
      callCount++;
      const uniqueGuid = `guid-${callCount}`;
      return Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(rssXml.replace('guid-123', uniqueGuid)),
      } as Response);
    });

    const result = await rssAggregator.fetchAll();

    expect(fetchSpy).toHaveBeenCalledTimes(RSS_SOURCES.length);
    // Each source returns 1 item with a unique guid (avoids dedup collapsing)
    expect(result.items.length).toBe(RSS_SOURCES.length);
    for (const item of result.items) {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title', 'Test Article');
      expect(item).toHaveProperty('link', 'https://example.com/article1');
      expect(item).toHaveProperty('pubDate');
      expect(typeof item.pubDate).toBe('number');
    }
    expect(result.errors).toHaveLength(0);
  });

  it('handles fetch errors gracefully (all sources fail)', async () => {
    fetchSpy.mockRejectedValue(new Error('Network connection failed'));

    const result = await rssAggregator.fetchAll();

    expect(result.items).toEqual([]);
    expect(result.errors).toHaveLength(RSS_SOURCES.length);
    for (const err of result.errors) {
      expect(err).toHaveProperty('sourceId');
      expect(err).toHaveProperty('error');
    }
  });

  it('isolates a single failing source without affecting others', async () => {
    // First source succeeds
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: () => Promise.resolve(rssXml),
    } as Response);
    // Remaining sources fail
    for (let i = 1; i < RSS_SOURCES.length; i++) {
      fetchSpy.mockRejectedValueOnce(new Error('Network error'));
    }

    const result = await rssAggregator.fetchAll();

    // Only 1 item from the first (successful) source
    expect(result.items).toHaveLength(1);
    expect(result.items[0].title).toBe('Test Article');
    // Errors for the remaining 5 sources
    expect(result.errors).toHaveLength(RSS_SOURCES.length - 1);
    expect(fetchSpy).toHaveBeenCalledTimes(RSS_SOURCES.length);
  });
});
