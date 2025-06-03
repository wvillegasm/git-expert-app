import PropTypes from 'prop-types';
import { useState } from 'react';

const MIN_CATEGORY_LENGTH = 2;

/**
 * AddCategoryForm component allows users to input and submit a new GIF category.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {function(string): void} props.onAddCategory - Callback function called with the
 * formatted category name when a valid category is submitted.
 *
 * @example
 * <AddCategoryForm onAddCategory={handleAddCategory} />
 */

export const AddCategoryForm = ({ onAddCategory }) => {
  const [gifCategory, setGifCategory] = useState('');

  const handleOnChange = (e) => {
    setGifCategory(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const gifCategoryFormatted = gifCategory.trim().toUpperCase();

    if (gifCategoryFormatted.length < MIN_CATEGORY_LENGTH) {
      return;
    }

    onAddCategory(gifCategoryFormatted);
    setGifCategory('');
  };

  return (
    <form
      aria-label='add-category-form'
      name='add-category-form'
      className='space-bottom'
      onSubmit={handleOnSubmit}
    >
      <input
        type='text'
        placeholder='Search gifs'
        onChange={handleOnChange}
        value={gifCategory}
      />
    </form>
  );
};

AddCategoryForm.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
};
