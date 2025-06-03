const LIMIT_GIFS = 2;
const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const getGifs = async (category) => {
  try {
    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(
      category
    )}&limit=${LIMIT_GIFS}&api_key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return [];
    }

    const responseData = await response.json();
    const data = responseData.data;

    if (!data) {
      return [];
    }

    const gifs = data
      .filter((item) => item.images?.downsized_medium?.url)
      .map(({ id, title, images }) => ({
        id,
        title,
        url: images.downsized_medium.url,
      }));

    return gifs;
  } catch (error) {
    return [];
  }
};
