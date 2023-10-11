import { Component } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
    };
  }

  handleCategoryClick = (category) => {
    if (this.state.selectedCategory === category) {
      this.setState({ selectedCategory: null });
      this.props.dogsCategory(null);
    } else {
      this.setState({ selectedCategory: category });
      this.props.dogsCategory(category);
    }
    this.props.showForm(category);
  };

  render() {
    const { allDogs } = this.props;
    const favoritedCount = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavoritedCount = allDogs.length - favoritedCount;

    return (
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/functional"} className="btn">
          Change to Functional
        </Link>
        <div className="selectors">
          <div
            className={`selector ${
              this.state.selectedCategory === "favorite" ? "active" : ""
            }`}
            onClick={() => this.handleCategoryClick("favorite")}
          >
            favorited ( {favoritedCount} )
          </div>
          <div
            className={`selector ${
              this.state.selectedCategory === "unfavorite" ? "active" : ""
            }`}
            onClick={() => this.handleCategoryClick("unfavorite")}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${
              this.state.selectedCategory === "create" ? "active" : ""
            }`}
            onClick={() => this.handleCategoryClick("create")}
          >
            create dog
          </div>
        </div>
      </div>
    );
  }
}
