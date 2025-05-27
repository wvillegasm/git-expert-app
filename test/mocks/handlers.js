import { http, HttpResponse } from 'msw';

// Mock data for successful responses
const mockGifData = [
  {
    id: '123',
    title: 'Test GIF 1',
    images: {
      downsized_medium: {
        url: 'https://media.giphy.com/media/123/giphy.gif'
      }
    }
  },
  {
    id: '456',
    title: 'Test GIF 2',
    images: {
      downsized_medium: {
        url: 'https://media.giphy.com/media/456/giphy.gif'
      }
    }
  }
];

export const handlers = [
  // Mock the Giphy API search endpoint
  http.get('https://api.giphy.com/v1/gifs/search', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');
    const limit = url.searchParams.get('limit');
    const apiKey = url.searchParams.get('api_key');

    // You can add different responses based on query parameters if needed
    return HttpResponse.json({
      data: mockGifData.slice(0, parseInt(limit) || 2)
    });
  }),
];
