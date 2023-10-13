import { useState } from "react";
import { Link } from "react-router-dom";

export const FunctionalSection = ({ allDogs, toggleTab }) => {
  const [selectedCategory, setSelectedCategory] = useState("none");

  const favoritedCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoritedCount = allDogs.filter((dog) => !dog.isFavorite).length;

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory('none');
      toggleTab("none");
    } else {
      setSelectedCategory(category);
      toggleTab(category);
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
            selectedCategory === "favorited" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("favorited")}
        >
          favorited ( {favoritedCount} )
        </div>

        {/* This should display the unfavorited count */}
        <div
          className={`selector ${
            selectedCategory === "unfavorited" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("unfavorited")}
        >
          unfavorited ( {unfavoritedCount} )
        </div>

        <div
          className={`selector ${
            selectedCategory === "create-dog-form" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("create-dog-form")}
        >
          create dog
        </div>
      </div>
    </div>
  );
};
