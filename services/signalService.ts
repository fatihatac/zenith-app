import { XMLParser } from 'fast-xml-parser';
import { FeedItem, RawFeedItem, RssSource, RSS_SOURCES } from '@/types/signal';
import { ISignalRepository } from '@/interfaces/ISignalRepository';

// ─── RssParserService ───────────────────────────────────────────────

export class RssParserService {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      attributeNamePrefix: '@_',
      ignoreAttributes: false,
      textNodeName: '#text',
      isArray: (name: string) => ['item', 'entry'].includes(name),
    });
  }

  parseRss(xml: string, _sourceId: string, _sourceName: string, _category: string): RawFeedItem[] {
    const parsed = this.parser.parse(xml);

    const extractText = (val: unknown): string | undefined => {
      if (typeof val === 'string') return val;
      if (val && typeof val === 'object' && '#text' in (val as Record<string, unknown>)) {
        return (val as Record<string, unknown>)['#text'] as string | undefined;
      }
      return undefined;
    };

    // RSS 2.0 detection
    if (xml.includes('<rss')) {
      const channel = parsed?.rss?.channel;
      if (!channel?.item) return [];

      return channel.item.map((item: Record<string, unknown>) => ({
        title: extractText(item.title),
        description: extractText(item.description),
        link: extractText(item.link),
        pubDate: extractText(item.pubDate),
        guid: extractText(item.guid),
        'content:encoded': extractText(item['content:encoded']),
      }));
    }

    // Atom detection
    if (xml.includes('<feed')) {
      const entries = parsed?.feed?.entry;
      if (!entries) return [];
      return entries.map((entry: Record<string, unknown>) => ({
        title: extractText(entry.title),
        description: extractText(entry.summary || entry.content),
        link:
          typeof entry.link === 'string'
            ? entry.link
            : ((entry.link as Record<string, unknown>)?.['@_href'] as string | undefined),
        pubDate: extractText(entry.published || entry.updated),
        guid: extractText(entry.id),
      }));
    }

    return [];
  }
}

export const rssParserService = new RssParserService();

// ─── HtmlSanitizerService ───────────────────────────────────────────

export class HtmlSanitizerService {
  sanitize(raw: string, maxLength: number = 120): string {
    // 1. Strip HTML tags
    let result = raw.replace(/<[^>]*>/g, '');
    // 2. Decode HTML entities
    result = result
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/');
    // 3. Normalize whitespace
    result = result.replace(/\s+/g, ' ').trim();
    // 4. Truncate with ellipsis
    if (result.length > maxLength) {
      result = result.substring(0, maxLength).trim() + '…';
    }
    return result;
  }
}

export const htmlSanitizer = new HtmlSanitizerService();

// ─── RssAggregatorService ───────────────────────────────────────────

interface AggregatorResult {
  items: FeedItem[];
  errors: { sourceId: string; error: string }[];
}

class RssAggregatorService {
  async fetchAll(): Promise<AggregatorResult> {
    const results = await Promise.allSettled(
      RSS_SOURCES.map((source) => this.fetchOne(source)),
    );

    const allItems: FeedItem[] = [];
    const errors: { sourceId: string; error: string }[] = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const source = RSS_SOURCES[i];

      if (result.status === 'rejected') {
        errors.push({ sourceId: source.id, error: String(result.reason) });
      } else {
        if (result.value.error) {
          errors.push({ sourceId: source.id, error: result.value.error });
        }
        allItems.push(...result.value.items);
      }
    }

    // Sort newest first, then deduplicate by guid
    allItems.sort((a, b) => b.pubDate - a.pubDate);

    const seen = new Set<string>();
    const deduped: FeedItem[] = [];
    for (const item of allItems) {
      const key = item.guid || item.id;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(item);
      }
    }

    return { items: deduped, errors };
  }

  private async fetchOne(
    source: RssSource,
  ): Promise<{ items: FeedItem[]; error?: string }> {
    try {
      const response = await fetch(source.url);
      if (!response.ok) {
        return {
          items: [],
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
      const xml = await response.text();
      const rawItems = rssParserService.parseRss(
        xml,
        source.id,
        source.name,
        source.category,
      );

      const items: FeedItem[] = rawItems.map((item) => ({
        id: `${source.id}-${item.guid || item.link}`,
        sourceId: source.id,
        sourceName: source.name,
        category: source.category,
        title: htmlSanitizer.sanitize(item.title || 'Untitled', 200),
        description: htmlSanitizer.sanitize(
          item.description || item['content:encoded'] || '',
          120,
        ),
        link: item.link || '',
        pubDate: new Date(item.pubDate || '').getTime() || Date.now(),
        guid: item.guid || item.link || '',
        isRead: false,
      }));

      return { items };
    } catch (err: unknown) {
      return {
        items: [],
        error: err instanceof Error ? err.message : 'Network error',
      };
    }
  }
}

const aggregator = new RssAggregatorService();

// ─── SignalRepository ───────────────────────────────────────────────

export class SignalRepository implements ISignalRepository {
  async getSignals(): Promise<{ items: FeedItem[]; errors: { sourceId: string; error: string }[] }> {
    const result = await aggregator.fetchAll();
    return result;
  }
}

export const signalRepo = new SignalRepository();

export const getSignals = (): Promise<{ items: FeedItem[]; errors: { sourceId: string; error: string }[] }> => {
  return signalRepo.getSignals();
};

export const rssAggregator = aggregator;
