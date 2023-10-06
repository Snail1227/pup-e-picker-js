import { useState } from "react";
import { Link } from "react-router-dom";

export const FunctionalSection = ({ allDogs }) => {
  const [selectedCategory, setSelectedCategory] =  useState(null);

  const favoritedCount = allDogs.filter(dog => dog.isFavorite).length;
  const unfavoritedCount = allDogs.length - favoritedCount;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div 
            className={`selector ${selectedCategory === 'favorited' ? 'active' : ''}`} 
            onClick={() => setSelectedCategory('favorited')}>
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div 
            className={`selector ${selectedCategory === 'unfavorited' ? 'active' : ''}`} 
            onClick={() => setSelectedCategory('unfavorited')}>
            unfavorited ( {unfavoritedCount} )
          </div>

          <div 
            className={`selector ${selectedCategory === true ? 'active' : ""}`} 
            onClick={() => setSelectedCategory(selectedCategory === true ? false : true)}>
            <Link 
              to={"/FunctionalCreateDogForm"} 
              onClick={() => setSelectedCategory('create')}
            >
            create dog
            </Link>
          </div>
        </div>
      </div>
      <div className="content-container"></div>
    </section>
  );
};
