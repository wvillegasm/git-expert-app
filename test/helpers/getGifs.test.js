import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGifs } from '../../src/helpers/getGifs'; // Adjust path as necessary

// Hardcoded limit from the getGifs function
const LIMIT_GIFS = 2;
const TEST_API_KEY = 'TEST_API_KEY';

describe('getGifs helper function', () => {
  const originalFetch = global.fetch;
  const originalImportMetaEnv = import.meta.env;

  beforeEach(() => {
    global.fetch = vi.fn();
    // Mock import.meta.env
    import.meta.env = { VITE_GIPHY_API_KEY: TEST_API_KEY };
  });

  afterEach(() => {
    global.fetch = originalFetch;
    import.meta.env = originalImportMetaEnv;
    vi.restoreAllMocks();
  });

  it('should call the Giphy API with the correct URL and parameters', async () => {
    const category = 'cats';
    const mockApiResponse = {
      data: [],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    await getGifs(category);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const expectedUrl = `https://api.giphy.com/v1/gifs/search?api_key=${TEST_API_KEY}&q=${category}&limit=${LIMIT_GIFS}`;
    expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
  });

  it('should process the API response and return mapped GIF objects', async () => {
    const category = 'dogs';
    const mockData = [
      { id: '123', title: 'Dog 1', images: { downsized_medium: { url: 'http://dog1.gif' } } },
      { id: '456', title: 'Dog 2', images: { downsized_medium: { url: 'http://dog2.gif' } } },
    ];
    const mockApiResponse = { data: mockData };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const gifs = await getGifs(category);

    expect(gifs).toEqual([
      { id: '123', title: 'Dog 1', url: 'http://dog1.gif' },
      { id: '456', title: 'Dog 2', url: 'http://dog2.gif' },
    ]);
    expect(gifs.length).toBe(LIMIT_GIFS); // Assuming LIMIT_GIFS is 2 from the actual function
  });

  it('should return an empty array if the fetch response is not ok', async () => {
    const category = 'birds';
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const gifs = await getGifs(category);
    expect(gifs).toEqual([]);
  });

  it('should return an empty array if fetch throws an error', async () => {
    const category = 'fish';
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const gifs = await getGifs(category);
    expect(gifs).toEqual([]);
  });

  it('should return an empty array if API response data is missing', async () => {
    const category = 'food';
    const mockApiResponse = {}; // Missing 'data' property
     global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const gifs = await getGifs(category);
    expect(gifs).toEqual([]);
  });

  it('should handle items with missing or malformed image data gracefully', async () => {
    const category = 'memes';
    const mockData = [
      { id: '789', title: 'Meme 1', images: { downsized_medium: { url: 'http://meme1.gif' } } },
      { id: '101', title: 'Meme 2 (no image url)', images: { downsized_medium: {} } },
      { id: '112', title: 'Meme 3 (no images prop)', /* images property missing */ },
      { id: '113', title: 'Meme 4 (no downsized_medium prop)', images: {} },
    ];
    const mockApiResponse = { data: mockData };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const gifs = await getGifs(category);
    
    // We expect 2 gifs, the first valid one, and one for 'Meme 2' because it has the structure but empty url
    // The actual function `getGifs` filters out items where `img.images.downsized_medium.url` is falsy.
    // So, 'Meme 2', 'Meme 3', 'Meme 4' should be filtered out.
    expect(gifs).toEqual([
      { id: '789', title: 'Meme 1', url: 'http://meme1.gif' },
    ]);
    // The current implementation of getGifs filters out items without a valid URL.
    // If the limit is 2, and we provide more raw items, it will still try to return up to 2 *valid* items.
    // In this case, only one is valid.
    expect(gifs.length).toBe(1); 
  });
});
