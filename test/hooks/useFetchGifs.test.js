import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';
import { getGifs } from '../../src/helpers/getGifs'; // Path to the original module

// Mock the getGifs helper
vi.mock('../../src/helpers/getGifs');

describe('useFetchGifs hook', () => {
  const mockCategory = 'Dragon Ball';
  const mockGifs = [
    { id: 'abc', title: 'Goku GIF', url: 'http://goku.gif' },
    { id: 'def', title: 'Vegeta GIF', url: 'http://vegeta.gif' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should return the correct initial state', () => {
    getGifs.mockResolvedValueOnce([]); // Ensure getGifs doesn't throw during initial render
    const { result } = renderHook(() => useFetchGifs(mockCategory));
    expect(result.current.images).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('should call getGifs with the category on mount and update state on success', async () => {
    getGifs.mockResolvedValueOnce(mockGifs);

    const { result } = renderHook(() => useFetchGifs(mockCategory));

    // Check initial state (isLoading might already be false if getGifs resolves very quickly)
    // For more robust testing of loading state, we might need to delay mock resolve
    expect(result.current.isLoading).toBe(true); // Check before effects complete

    // Wait for the hook to process the promise
    await act(async () => {
      // Let the useEffect run and promises resolve
      // For getGifs.mockResolvedValueOnce, this ensures the .then() in getImages executes
    });
    
    expect(getGifs).toHaveBeenCalledTimes(1);
    expect(getGifs).toHaveBeenCalledWith(mockCategory);
    
    // Need to await for the state updates triggered by the async operation
    // Vitest/testing-library's `waitFor` can be useful here if act alone is not enough
    // or if there are chained promises/multiple state updates.
    // For this specific structure, after getGifs resolves and setImages/setIsLoading are called,
    // the state should be updated.

    // Re-check after async operations have completed
    await vi.waitFor(() => { // vitest utility
        expect(result.current.images).toEqual(mockGifs);
        expect(result.current.isLoading).toBe(false);
    });
  });

  it('should set isLoading to false even if getGifs returns an empty array', async () => {
    getGifs.mockResolvedValueOnce([]); // Simulate no GIFs found

    const { result } = renderHook(() => useFetchGifs(mockCategory));

    await act(async () => {}); // Allow useEffect to run

    await vi.waitFor(() => {
        expect(result.current.images).toEqual([]);
        expect(result.current.isLoading).toBe(false);
    });
  });
  
  it('should recall getGifs if the category changes', async () => {
    getGifs.mockResolvedValue(mockGifs); // Default mock for first render
    const initialCategory = 'Naruto';
    const newCategory = 'Bleach';

    const { result, rerender } = renderHook(
      ({ category }) => useFetchGifs(category),
      { initialProps: { category: initialCategory } }
    );

    await act(async () => {}); // Initial effect

    await vi.waitFor(() => {
      expect(getGifs).toHaveBeenCalledTimes(1);
      expect(getGifs).toHaveBeenCalledWith(initialCategory);
      expect(result.current.isLoading).toBe(false); // After first load
    });
    
    // Change the category
    getGifs.mockClear(); // Clear previous call counts
    getGifs.mockResolvedValueOnce([ { id: 'xyz', title: 'Ichigo', url: 'http://ichigo.gif'} ]); // New data for new category
    
    act(() => {
        rerender({ category: newCategory });
    });

    // The useEffect should run again due to category change
    // isLoading should become true again briefly
    expect(result.current.isLoading).toBe(true); // Check immediately after rerender and effect trigger

    await act(async () => {}); // Allow new effect to run

    await vi.waitFor(() => {
        expect(getGifs).toHaveBeenCalledTimes(1);
        expect(getGifs).toHaveBeenCalledWith(newCategory);
        expect(result.current.images).toEqual([ { id: 'xyz', title: 'Ichigo', url: 'http://ichigo.gif'} ]);
        expect(result.current.isLoading).toBe(false);
    });
  });

});
