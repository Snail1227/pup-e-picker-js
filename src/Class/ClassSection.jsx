import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: "none",
    };
  }

  favoritedCount = () => {
    return this.props.allDogs.filter((dog) => dog.isFavorite).length;
  };

  unfavoritedCount = () => {
    return this.props.allDogs.filter((dog) => !dog.isFavorite).length;
  };

  handleCategoryClick = (category) => {
    if (this.state.selectedCategory === category) {
      this.setState({ selectedCategory: "none" });
      this.props.toggleTab("none");
    } else {
      this.setState({ selectedCategory: category });
      this.props.toggleTab(category);
    }
  };

  render() {
    return (
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              this.state.selectedCategory === "favorited" ? "active" : ""
            }`}
            onClick={() => this.handleCategoryClick("favorited")}
          >
            favorited ( {this.favoritedCount()} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              this.state.selectedCategory === "unfavorited" ? "active" : ""
            }`}
            onClick={() => this.handleCategoryClick("unfavorited")}
          >
            unfavorited ( {this.unfavoritedCount()} )
          </div>

          <div
            className={`selector ${
              this.state.selectedCategory === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => this.handleCategoryClick("create-dog-form")}
          >
            create dog
          </div>
        </div>
      </div>
    );
  }
}
