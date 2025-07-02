import { useState } from 'react';
import { AddCategoryForm, GifGrid } from './components';

export const GifExpertApp = () => {
  const [categories, setCategories] = useState([]);

  const handleAddCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([category, ...categories]);
    }
  };

  return (
    <>
      <h1>GifExpertApp</h1>

      <AddCategoryForm onAddCategory={handleAddCategory} />

      {categories.map((category) => (
        <GifGrid key={category} category={category} />
      ))}
    </>
  );
};
