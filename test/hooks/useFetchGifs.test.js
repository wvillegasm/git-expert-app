import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';
import { server } from '../mocks/server';

describe('useFetchGifs hook', () => {
  const mockCategory = 'Dragon Ball';
  const mockGifs = [
    { id: 'abc', title: 'Goku GIF', images: { downsized_medium: { url: 'http://goku.gif' } } },
    { id: 'def', title: 'Vegeta GIF', images: { downsized_medium: { url: 'http://vegeta.gif' } } },
  ];

  beforeEach(() => {
    // Reset any request handlers that we may add during the tests
    server.resetHandlers();
  });

  it('should return the correct initial state', () => {
    // Mock API to return empty array for initial render
    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        return HttpResponse.json({ data: [] });
      })
    );

    const { result } = renderHook(() => useFetchGifs(mockCategory));
    expect(result.current.images).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('should call getGifs with the category on mount and update state on success', async () => {
    // Mock API to return mock data
    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', ({ request }) => {
        const url = new URL(request.url);
        expect(url.searchParams.get('q')).toBe(mockCategory);
        return HttpResponse.json({ data: mockGifs });
      })
    );

    const { result } = renderHook(() => useFetchGifs(mockCategory));

    // Check initial state
    expect(result.current.isLoading).toBe(true);

    // Wait for the hook to process the API response
    await waitFor(() => {
      expect(result.current.images).toEqual([
        { id: 'abc', title: 'Goku GIF', url: 'http://goku.gif' },
        { id: 'def', title: 'Vegeta GIF', url: 'http://vegeta.gif' },
      ]);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should set isLoading to false even if getGifs returns an empty array', async () => {
    // Mock API to return empty data
    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        return HttpResponse.json({ data: [] });
      })
    );

    const { result } = renderHook(() => useFetchGifs(mockCategory));

    await waitFor(() => {
      expect(result.current.images).toEqual([]);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should recall getGifs if the category changes', async () => {
    const initialCategory = 'Naruto';
    const newCategory = 'Bleach';

    const initialGifs = [
      { id: 'naruto1', title: 'Naruto GIF', images: { downsized_medium: { url: 'http://naruto.gif' } } }
    ];

    const newGifs = [
      { id: 'ichigo1', title: 'Ichigo GIF', images: { downsized_medium: { url: 'http://ichigo.gif' } } }
    ];

    // Mock API for initial category
    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', ({ request }) => {
        const url = new URL(request.url);
        const category = url.searchParams.get('q');

        if (category === initialCategory) {
          return HttpResponse.json({ data: initialGifs });
        } else if (category === newCategory) {
          return HttpResponse.json({ data: newGifs });
        }
        return HttpResponse.json({ data: [] });
      })
    );

    const { result, rerender } = renderHook(
      ({ category }) => useFetchGifs(category),
      { initialProps: { category: initialCategory } }
    );

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.images).toEqual([
        { id: 'naruto1', title: 'Naruto GIF', url: 'http://naruto.gif' }
      ]);
      expect(result.current.isLoading).toBe(false);
    });

    // Change the category
    act(() => {
      rerender({ category: newCategory });
    });

    // Should become loading again
    expect(result.current.isLoading).toBe(true);

    // Wait for new data to load
    await waitFor(() => {
      expect(result.current.images).toEqual([
        { id: 'ichigo1', title: 'Ichigo GIF', url: 'http://ichigo.gif' }
      ]);
      expect(result.current.isLoading).toBe(false);
    });
  });

});
