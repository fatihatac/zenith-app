import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { FeedItem } from '@/types/signal';
import { signalRepo } from '@/services/signalService';

const CACHE_KEY = 'signal_cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const READ_STATE_KEY = 'signal_read_state';

interface CacheData {
  feeds: FeedItem[];
  timestamp: number;
}

interface SignalStoreState {
  feeds: FeedItem[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  sourceErrors: Record<string, string | null>;
  lastFetchedAt: number | null;
  isFromCache: boolean;

  fetchFeeds: () => Promise<void>;
  refreshFeeds: () => Promise<void>;
  loadFromCache: () => Promise<void>;
  clearError: (sourceId?: string) => void;
  markAsRead: (feedId: string) => void;
  markAllAsRead: () => void;
}

export const useSignalStore = create<SignalStoreState>((set, get) => ({
  feeds: [],
  loading: false,
  refreshing: false,
  error: null,
  sourceErrors: {},
  lastFetchedAt: null,
  isFromCache: false,

  fetchFeeds: async () => {
    const state = get();
    // Skip if already loading or cached (< 1h)
    if (state.loading) return;
    if (state.lastFetchedAt && Date.now() - state.lastFetchedAt < CACHE_TTL_MS) return;

    set({ loading: true, error: null, sourceErrors: {} });

    try {
      const { items, errors } = await signalRepo.getSignals();
      const errorsRecord: Record<string, string | null> = {};
      errors.forEach(e => { errorsRecord[e.sourceId] = e.error; });
      if (items && items.length > 0) {
        const cacheData: CacheData = { feeds: items, timestamp: Date.now() };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      }
      set({
        feeds: items || [],
        loading: false,
        lastFetchedAt: Date.now(),
        isFromCache: false,
        sourceErrors: errorsRecord,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch feeds',
        loading: false,
      });
      // Preserve old feeds on error
    }
  },

  refreshFeeds: async () => {
    set({ refreshing: true, error: null, sourceErrors: {} });

    try {
      const { items, errors } = await signalRepo.getSignals();
      const errorsRecord: Record<string, string | null> = {};
      errors.forEach(e => { errorsRecord[e.sourceId] = e.error; });
      if (items && items.length > 0) {
        const cacheData: CacheData = { feeds: items, timestamp: Date.now() };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      }
      set({
        feeds: items || [],
        refreshing: false,
        lastFetchedAt: Date.now(),
        isFromCache: false,
        sourceErrors: errorsRecord,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to refresh feeds',
        refreshing: false,
      });
    }
  },

  loadFromCache: async () => {
    try {
      const raw = await AsyncStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached: CacheData = JSON.parse(raw);
        if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
          // Stale-while-revalidate: show cache, background fetch
          let mergedFeeds = cached.feeds || [];
          try {
            const readStateRaw = await AsyncStorage.getItem(READ_STATE_KEY);
            if (readStateRaw) {
              const readState: Record<string, true> = JSON.parse(readStateRaw);
              mergedFeeds = mergedFeeds.map(feed => ({
                ...feed,
                isRead: readState[feed.id] === true || feed.isRead,
              }));
            }
          } catch {
            // Silently fail - read state is non-critical
          }
          set({ feeds: mergedFeeds, isFromCache: true, lastFetchedAt: cached.timestamp });
          // Fire background refresh
          get().fetchFeeds();
        } else {
          // Cache expired, force refresh
          get().fetchFeeds();
        }
      } else {
        // No cache, fetch fresh
        get().fetchFeeds();
      }
    } catch {
      get().fetchFeeds();
    }
  },

  clearError: (sourceId?: string) => {
    if (sourceId) {
      set((state) => {
        const newErrors = { ...state.sourceErrors };
        delete newErrors[sourceId];
        return { sourceErrors: newErrors };
      });
    } else {
      set({ error: null, sourceErrors: {} });
    }
  },

  markAsRead: (feedId: string) => {
    // Update state immediately
    set((state) => ({
      feeds: state.feeds.map((feed) =>
        feed.id === feedId ? { ...feed, isRead: true } : feed
      ),
    }));
    // Persist to AsyncStorage (fire-and-forget)
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(READ_STATE_KEY);
        const readState: Record<string, true> = raw ? JSON.parse(raw) : {};
        readState[feedId] = true;
        await AsyncStorage.setItem(READ_STATE_KEY, JSON.stringify(readState));
      } catch {
        // Silently fail - read state is non-critical
      }
    })();
  },

  markAllAsRead: () => {
    const { feeds } = get();
    // Update state immediately
    set({
      feeds: feeds.map((feed) => ({ ...feed, isRead: true })),
    });
    // Persist all feedIds to AsyncStorage (fire-and-forget)
    (async () => {
      try {
        const allIds: Record<string, true> = {};
        feeds.forEach((feed) => { allIds[feed.id] = true; });
        await AsyncStorage.setItem(READ_STATE_KEY, JSON.stringify(allIds));
      } catch {
        // Silently fail - read state is non-critical
      }
    })();
  },
}));
