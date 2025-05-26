import { useState } from "react";

export const AddCategoryForm = ({ onAddCategory }) => {
  const [gifCategory, setGifCategory] = useState("");

  const handleOnChange = (e) => {
    setGifCategory(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const gifCategoryFormatted = gifCategory.trim().toUpperCase();

    if (gifCategoryFormatted.length < 2) {
      return;
    }

    onAddCategory(gifCategoryFormatted, setGifCategory);

    // setGifCategory("");
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
