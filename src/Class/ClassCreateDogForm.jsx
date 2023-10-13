import { Component } from "react";
import { dogPictures } from "../dog-pictures";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      commentInput: "",
      pictureSelect: "",
      isLoading: false,
    };
  }


  reset = () => {
    this.setState({
      nameInput: "",
      commentInput: "",
      pictureSelect: defaultSelectedImage,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { nameInput, commentInput, pictureSelect } = this.state;
    const filledData = nameInput && commentInput;
    console.log(dogPictures)
    if (filledData) {
      this.props.onAddDog({
        name: nameInput,
        comment: commentInput,
        image: pictureSelect,
        isFavorite: false,
      });
      this.reset();
    }
  };

  render() {
    const { nameInput, commentInput, isLoading, pictureSelect } = this.state;

    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          name="name"
          type="text"
          disabled={isLoading}
          value={nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
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
            this.setState({ commentInput: e.target.value });
          }}
        ></textarea>

        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          value={pictureSelect}
          onChange={(e) => {
            this.setState({ pictureSelect: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option 
                value={pictureValue} 
                key={pictureValue}
              >
                {label}
              </option>
            );
          })}
        </select>

        <input type="submit" disabled={isLoading} />
      </form>
    );
  }
}
