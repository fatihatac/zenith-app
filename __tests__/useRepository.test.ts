import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useRepository } from '../hooks/useRepository';

describe('useRepository', () => {
  it('should fetch data successfully', async () => {
    const mockFetcher = jest.fn().mockResolvedValue('test-data');
    const { result } = renderHook(() => useRepository<string>(mockFetcher));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe('test-data');
    expect(result.current.error).toBeNull();
  });

  it('should handle errors', async () => {
    const mockError = new Error('fetch failed');
    const mockFetcher = jest.fn().mockRejectedValue(mockError);
    const { result } = renderHook(() => useRepository<string>(mockFetcher));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });

  it('should refresh data', async () => {
    const mockFetcher = jest.fn().mockResolvedValue('data');
    const { result } = renderHook(() => useRepository<string>(mockFetcher));

    await waitFor(() => expect(result.current.loading).toBe(false));

    mockFetcher.mockResolvedValue('refreshed-data');
    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.data).toBe('refreshed-data');
    });
  });
});
