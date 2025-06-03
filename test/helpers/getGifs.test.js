import { http, HttpResponse } from 'msw';
import { getGifs } from '../../src/helpers/getGifs';
import { server } from '../mocks/server';

describe('getGifs helper function', () => {
  const LIMIT_GIFS = 2;

  beforeEach(() => {
    // Reset any handlers that might be added in individual tests
    server.resetHandlers();

    // Mock the environment variable for all tests
    vi.stubEnv('VITE_GIPHY_API_KEY', 'test-api-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should call the Giphy API with the correct URL and parameters', async () => {
    const category = 'cats';

    // Mock empty response
    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', ({ request }) => {
        const url = new URL(request.url);
        // Verify the correct parameters are being sent
        expect(url.searchParams.get('q')).toBe(category);
        expect(url.searchParams.get('limit')).toBe(LIMIT_GIFS.toString());
        expect(url.searchParams.get('api_key')).toBe('test-api-key');

        return HttpResponse.json({ data: [] });
      })
    );

    const result = await getGifs(category);
    expect(result).toEqual([]);
  });

  it('should process the API response and return mapped GIF objects', async () => {
    const category = 'dogs';
    const mockData = [
      {
        id: '123',
        title: 'Dog 1',
        images: { downsized_medium: { url: 'http://dog1.gif' } },
      },
      {
        id: '456',
        title: 'Dog 2',
        images: { downsized_medium: { url: 'http://dog2.gif' } },
      },
    ];

    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        return HttpResponse.json({ data: mockData });
      })
    );

    const gifs = await getGifs(category);

    expect(gifs).toEqual([
      { id: '123', title: 'Dog 1', url: 'http://dog1.gif' },
      { id: '456', title: 'Dog 2', url: 'http://dog2.gif' },
    ]);
    expect(gifs.length).toBe(LIMIT_GIFS);
  });

  it('should return an empty array if the fetch response is not ok', async () => {
    const category = 'birds';

    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const gifs = await getGifs(category);
    expect(gifs).toEqual([]);
  });

  it('should return an empty array if fetch throws an error', async () => {
    const category = 'fish';

    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        throw new Error('Network error');
      })
    );

    const gifs = await getGifs(category);
    expect(gifs).toEqual([]);
  });

  it('should return an empty array if API response data is missing', async () => {
    const category = 'food';

    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        return HttpResponse.json({}); // Missing 'data' property
      })
    );

    const gifs = await getGifs(category);
    expect(gifs).toEqual([]);
  });

  it('should handle items with missing or malformed image data gracefully', async () => {
    const category = 'memes';
    const mockData = [
      {
        id: '789',
        title: 'Meme 1',
        images: { downsized_medium: { url: 'http://meme1.gif' } },
      },
      {
        id: '101',
        title: 'Meme 2 (no image url)',
        images: { downsized_medium: {} },
      },
      {
        id: '112',
        title: 'Meme 3 (no images prop)' /* images property missing */,
      },
      { id: '113', title: 'Meme 4 (no downsized_medium prop)', images: {} },
    ];

    server.use(
      http.get('https://api.giphy.com/v1/gifs/search', () => {
        return HttpResponse.json({ data: mockData });
      })
    );

    const gifs = await getGifs(category);

    // Only the first GIF should be valid and returned
    expect(gifs).toEqual([
      { id: '789', title: 'Meme 1', url: 'http://meme1.gif' },
    ]);
    expect(gifs.length).toBe(1);
  });
});
