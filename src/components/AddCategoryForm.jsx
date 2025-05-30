import { useState } from "react";

const MIN_CATEGORY_LENGTH = 2;

export const AddCategoryForm = ({ onAddCategory }) => {
  const [gifCategory, setGifCategory] = useState("");

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
    setGifCategory("");
  };

  return (
    <form className="space-bottom" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Search gifs"
        onChange={handleOnChange}
        value={gifCategory}
      />
    </form>
  );
};
