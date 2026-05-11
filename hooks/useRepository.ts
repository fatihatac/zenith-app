import { useState, useEffect, useCallback, useRef } from 'react';

export function useRepository<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetcherRef = useRef(fetcher);
  const mountedRef = useRef(true);

  // Always call the latest fetcher
  fetcherRef.current = fetcher;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(() => {
    setLoading(true);
    setError(null);

    fetcherRef
      .current()
      .then((result) => {
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    execute();
  }, [execute]);

  const refresh = useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refresh };
}
