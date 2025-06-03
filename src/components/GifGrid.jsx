import { useFetchGifs } from '../hooks/useFetchGifs';
import { GifItem } from './';

import '../styles.css';

export const GifGrid = ({ category }) => {
  const { images, isLoading } = useFetchGifs(category);

  return (
    <>
      <h3>{category}</h3>

      {isLoading && <p>Loading...</p>}

      <div className='gif-grid'>
        {images.map((image) => (
          <GifItem key={image.id} {...image} />
        ))}
      </div>
    </>
  );
};
