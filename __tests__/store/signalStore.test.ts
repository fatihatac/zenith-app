// Custom in-memory mock (RN mock depends on window which is unavailable in Bun)
const asyncStorageStore: Record<string, string> = {};
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn((key: string) => Promise.resolve(asyncStorageStore[key] ?? null)),
    setItem: jest.fn((key: string, value: string) => {
      asyncStorageStore[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn((key: string) => {
      delete asyncStorageStore[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      Object.keys(asyncStorageStore).forEach(key => delete asyncStorageStore[key]);
      return Promise.resolve();
    }),
  },
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSignalStore } from '@/store/signalStore';
import { signalRepo } from '@/services/signalService';
import { FeedItem } from '@/types/signal';

const mockFeeds: FeedItem[] = [
  {
    id: 'test-1',
    sourceId: 'test',
    sourceName: 'Test',
    category: 'Technology',
    title: 'Test 1',
    description: '',
    link: '',
    pubDate: Date.now(),
    guid: '1',
    isRead: false,
  },
  {
    id: 'test-2',
    sourceId: 'test',
    sourceName: 'Test',
    category: 'Technology',
    title: 'Test 2',
    description: '',
    link: '',
    pubDate: Date.now(),
    guid: '2',
    isRead: false,
  },
];

describe('signalStore', () => {
  beforeEach(() => {
    useSignalStore.setState(useSignalStore.getInitialState());
  });

  // ─── markAsRead ─────────────────────────────────────────────────────

  it('markAsRead sets feed.isRead to true for the specified feed', () => {
    useSignalStore.setState({ feeds: mockFeeds });

    useSignalStore.getState().markAsRead('test-1');

    const feeds = useSignalStore.getState().feeds;
    expect(feeds.find((f) => f.id === 'test-1')?.isRead).toBe(true);
    expect(feeds.find((f) => f.id === 'test-2')?.isRead).toBe(false);
  });

  // ─── markAllAsRead ──────────────────────────────────────────────────

  it('markAllAsRead sets all feeds to isRead true', () => {
    useSignalStore.setState({ feeds: mockFeeds });

    useSignalStore.getState().markAllAsRead();

    const feeds = useSignalStore.getState().feeds;
    expect(feeds.every((f) => f.isRead)).toBe(true);
  });

  // ─── sourceErrors ───────────────────────────────────────────────────

  it('sourceErrors are populated after fetchFeeds with errors', async () => {
    const getSignalsSpy = jest.spyOn(signalRepo, 'getSignals').mockResolvedValue({
      items: [],
      errors: [{ sourceId: 'test-source', error: 'HTTP 500' }],
    });

    await useSignalStore.getState().fetchFeeds();

    expect(useSignalStore.getState().sourceErrors['test-source']).toBe('HTTP 500');

    getSignalsSpy.mockRestore();
  });

  it('sourceErrors are cleared on re-fetch without errors', async () => {
    const getSignalsSpy = jest.spyOn(signalRepo, 'getSignals');

    // First fetch — returns errors
    getSignalsSpy.mockResolvedValueOnce({
      items: [],
      errors: [{ sourceId: 'test-source', error: 'HTTP 500' }],
    });
    await useSignalStore.getState().fetchFeeds();
    expect(useSignalStore.getState().sourceErrors['test-source']).toBe('HTTP 500');

    // Reset cache guard so the second fetch actually runs
    useSignalStore.setState({ lastFetchedAt: null });

    // Second fetch — returns clean
    getSignalsSpy.mockResolvedValueOnce({
      items: [],
      errors: [],
    });
    await useSignalStore.getState().fetchFeeds();
    expect(useSignalStore.getState().sourceErrors).toEqual({});

    getSignalsSpy.mockRestore();
  });

  // ─── clearError ─────────────────────────────────────────────────────

  it('clearError removes a specific source error', () => {
    useSignalStore.setState({ sourceErrors: { 'test-source': 'HTTP 500' } });

    useSignalStore.getState().clearError('test-source');

    expect(useSignalStore.getState().sourceErrors['test-source']).toBeUndefined();
  });

  it('clearError without arguments clears all errors', () => {
    useSignalStore.setState({
      sourceErrors: { 'test-source': 'HTTP 500', 'other-source': 'Timeout' },
      error: 'some error',
    });

    useSignalStore.getState().clearError();

    expect(useSignalStore.getState().sourceErrors).toEqual({});
    expect(useSignalStore.getState().error).toBeNull();
  });

  // ─── Persistence ────────────────────────────────────────────────────

  it('markAsRead persists read state to AsyncStorage', async () => {
    await AsyncStorage.clear();
    useSignalStore.setState({ feeds: mockFeeds });

    useSignalStore.getState().markAsRead('test-1');

    // Flush microtasks so the fire-and-forget persistence completes
    await new Promise((resolve) => setTimeout(resolve, 0));

    const stored = await AsyncStorage.getItem('signal_read_state');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual({ 'test-1': true });
  });

  // ─── loadFromCache ──────────────────────────────────────────────────

  it('loadFromCache merges read state into cached feeds', async () => {
    await AsyncStorage.clear();

    const cacheData = { feeds: mockFeeds, timestamp: Date.now() };
    await AsyncStorage.setItem('signal_cache', JSON.stringify(cacheData));
    await AsyncStorage.setItem('signal_read_state', JSON.stringify({ 'test-1': true }));

    // Prevent real network calls from the background refresh
    const getSignalsSpy = jest.spyOn(signalRepo, 'getSignals').mockResolvedValue({
      items: [],
      errors: [],
    });

    await useSignalStore.getState().loadFromCache();

    const feeds = useSignalStore.getState().feeds;
    expect(feeds.find((f) => f.id === 'test-1')?.isRead).toBe(true);
    expect(feeds.find((f) => f.id === 'test-2')?.isRead).toBe(false);
    expect(useSignalStore.getState().isFromCache).toBe(true);

    getSignalsSpy.mockRestore();
  });
});
