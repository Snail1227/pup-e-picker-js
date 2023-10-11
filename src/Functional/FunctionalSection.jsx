import { useState } from "react";
import { Link } from "react-router-dom";

export const FunctionalSection = ({ allDogs, showForm, dogsCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const favoritedCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedCount = allDogs.length - favoritedCount;

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      dogsCategory(null);
      showForm(false);
    } else {
      setSelectedCategory(category);
      dogsCategory(category);
      showForm(category);
    }
  };

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
            selectedCategory === "favorite" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("favorite")}
        >
          favorited ( {favoritedCount} )
        </div>

        {/* This should display the unfavorited count */}
        <div
          className={`selector ${
            selectedCategory === "unfavorite" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("unfavorite")}
        >
          unfavorited ( {unfavoritedCount} )
        </div>

        <div
          className={`selector ${
            selectedCategory === "create" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("create")}
        >
          create dog
        </div>
      </div>
    </div>
  );
};
