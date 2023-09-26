import { dogPictures } from "../dog-pictures";
import { Requests } from "../api.js"
import { useState } from "react";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = () => {
  const [nameInput, setNameInput] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [pictureSelect, setPictureSelect] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pictureSelect)
    Requests.postDog({ name: nameInput, comment: commentInput, picture:pictureSelect});
  }

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={handleSubmit}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input 
        type="text" 
        disabled={false} 
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value)
        }}
      />

      <label htmlFor="description">Dog Description</label>
      <textarea 
        name="comment" 
        id="" 
        cols={80} 
        rows={10} 
        disabled={false}
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value)
        }}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select 
        id="picture" 
        onChange={(e) => {
          console.log(e.target.value)
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

      <input type="submit" />
    </form>
  );
};
