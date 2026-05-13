export type SignalCategory = string;

export interface RssSource {
  id: string;
  name: string;
  url: string;
  category: SignalCategory;
}

export interface FeedItem {
  id: string;
  sourceId: string;
  sourceName: string;
  category: SignalCategory;
  title: string;
  description: string;
  link: string;
  pubDate: number;
  guid: string;
  isRead: boolean;
}

export interface RssFeed {
  sourceId: string;
  title: string;
  description: string;
  link: string;
  items: FeedItem[];
  fetchedAt: number;
}

export interface RawFeedItem {
  title?: string;
  description?: string;
  link?: string;
  pubDate?: string;
  guid?: string;
  'content:encoded'?: string;
  'dc:creator'?: string;
}

export const RSS_SOURCES: readonly RssSource[] = [
  { id: 'hackernews', name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'Technology' },
  { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: 'Technology' },
  { id: 'coindesk', name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', category: 'Crypto' },
  { id: 'cointelegraph', name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss', category: 'Crypto' },
  { id: 'verge', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'Technology' },
  { id: 'arstechnica', name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', category: 'Technology' },
];
