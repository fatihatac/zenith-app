import { useEffect } from 'react';
import { useSignalStore } from '@/store/signalStore';

export const useSignals = () => {
  const feeds = useSignalStore((s) => s.feeds);
  const loading = useSignalStore((s) => s.loading);
  const refreshing = useSignalStore((s) => s.refreshing);
  const error = useSignalStore((s) => s.error);
  const sourceErrors = useSignalStore((s) => s.sourceErrors);
  const isFromCache = useSignalStore((s) => s.isFromCache);
  const fetchFeeds = useSignalStore((s) => s.fetchFeeds);
  const refreshFeeds = useSignalStore((s) => s.refreshFeeds);
  const clearError = useSignalStore((s) => s.clearError);
  const markAsRead = useSignalStore((s) => s.markAsRead);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return { feeds, loading, refreshing, error, sourceErrors, isFromCache, refresh: refreshFeeds, clearError, markAsRead };
};
