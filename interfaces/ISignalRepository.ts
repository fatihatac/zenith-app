import { FeedItem } from '@/types/signal';

export interface ISignalRepository {
  getSignals(): Promise<{ items: FeedItem[]; errors: { sourceId: string; error: string }[] }>;
}
