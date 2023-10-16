import { Link } from "react-router-dom";
import { VALID_ACTIVE_TABS } from "./FunctionalApp";

export const FunctionalSection = ({
  toggleTab,
  activeTab,
  listOfFavoriteDogs,
  listOfUnfavoriteDogs,
}) => {
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
            activeTab === VALID_ACTIVE_TABS.favorited ? "active" : ""
          }`}
          onClick={() => toggleTab(VALID_ACTIVE_TABS.favorited)}
        >
          favorited ( {listOfFavoriteDogs.length} )
        </div>

        {/* This should display the unfavorited count */}
        <div
          className={`selector ${
            activeTab === VALID_ACTIVE_TABS.unfavorited ? "active" : ""
          }`}
          onClick={() => toggleTab(VALID_ACTIVE_TABS.unfavorited)}
        >
          unfavorited ( {listOfUnfavoriteDogs.length} )
        </div>

        <div
          className={`selector ${
            activeTab === VALID_ACTIVE_TABS.createDogForm ? "active" : ""
          }`}
          onClick={() => toggleTab(VALID_ACTIVE_TABS.createDogForm)}
        >
          create dog
        </div>
      </div>
    </div>
  );
};
