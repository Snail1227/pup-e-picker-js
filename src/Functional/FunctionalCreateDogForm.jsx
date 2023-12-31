import { dogPictures } from "../dog-pictures";
import { useState } from "react";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({ onAddDog, isLoading }) => {
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [pictureSelect, setPictureSelect] = useState(defaultSelectedImage);

  const reset = () => {
    setNameInput("");
    setCommentInput("");
    setPictureSelect(defaultSelectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filledData = nameInput && commentInput;

    if (filledData) {
      onAddDog({
        name: nameInput,
        description: commentInput,
        image: pictureSelect,
        isFavorite: false,
      });
      reset();
    }
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        name="name"
        type="text"
        disabled={isLoading}
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea
        name="comment"
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={pictureSelect}
        onChange={(e) => {
          setPictureSelect(e.target.value);
        }}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>

      <input type="submit" disabled={isLoading} />
    </form>
  );
};
