import { useEffect, useState } from 'react';
import { getGifs } from '../helpers/getGifs';

export const useFetchGifs = (category) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const images = await getGifs(category);
        if (isMounted) {
          setImages(images);
        }
      } catch (error) {
        console.error('Error fetching gifs:', error);
        if (isMounted) {
          setImages([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [category]);

  return {
    images,
    isLoading,
  };
};
