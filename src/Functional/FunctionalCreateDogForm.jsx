import { dogPictures } from "../dog-pictures";
import { Requests } from "../api.js";
import { useState, useEffect } from "react";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ( { allData } ) => {
  const [nameInput, setNameInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [pictureSelect, setPictureSelect] = useState(defaultSelectedImage);
  const [allNotes, setAllNotes] = useState([]);

  const reset = () => {
    setNameInput("");
    setCommentInput("");
  };

  // const refetchData = () => {
  //   return Requests.getAllNotes().then((notes) => {
  //     setAllNotes(notes);
  //   })
  // }


  const fetchDogs = () => {
    setAllNotes(Requests.getAllDogs())
  };

  console.log(allNotes)

  useEffect(() => {
    fetchDogs()
  }, []);

  
  // const createNote = (note) => {
  //   Requests.createNote(note).then(() => {
  //     refetchData()
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Requests.postDog({
    //   name: nameInput,
    //   comment: commentInput,
    //   image: pictureSelect
    // });

    

    Requests.createNote({
      name: nameInput,
      comment: commentInput,
      image: pictureSelect,
    });

    reset();
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        name="name"
        type="text"
        disabled={false}
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
        disabled={false}
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
      ></textarea>

      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
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

      <input type="submit" />
    </form>
  );
};
