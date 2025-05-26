export const getGifs = async (category) => {
    const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(
      category
    )}&limit=2&api_key=${API_KEY}`;

    const response = await fetch(url);
    const { data } = await response.json();

    const gifs = data.map(({ id, title, images }) => ({
      id,
      title,
      url: images.downsized_medium.url,
    }));

    return gifs;
};
