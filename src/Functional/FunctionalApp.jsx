import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

const VALID_ACTIVE_TABS = {
  none: 'none',
  favorited: "favorited",
  unfavorited: "unfavorited",
  createDogForm: "create-dog-form",
}

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("none");

  const listOfFavoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const listOfUnfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const toggleTab = (newTab) => {
    if (activeTab === newTab) {
      setActiveTab("none");
      return;
    }
    setActiveTab(newTab);
  }

  useEffect(() => {
    allDogsRequest();
  }, []);

  const allDogsRequest = () => Requests.getAllDogs().then(setAllDogs);

  const withLoading = (func) => async (...args) => {
    setIsLoading(true);
    try {
      await func(...args);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequest = async () => {
    await allDogsRequest();
  };

  const handleAddDog = withLoading(async (newDog) => {
    await Requests.postDog(newDog);
    await allDogsRequest();
    toast.success(`Created ${newDog.name}`);
  });

  const handleDeleteDog = withLoading(async (id) => {
    await Requests.deleteDog(id);
    await updateRequest();
  });

  const handleUpdateDog = withLoading(async (id, isFavorite) => {
    await Requests.updateDog(id, isFavorite);
    await updateRequest();
  });

  const shouldShowForm = activeTab === VALID_ACTIVE_TABS.createDogForm;

  const filteredDogs = (() => {
    switch (activeTab) {
      case "favorited":
        return listOfFavoriteDogs;
      case "unfavorited":
        return listOfUnfavoriteDogs;
      case "none":
        return allDogs;
      case "create-dog-form":
        return [];
      default:
        return [];
    }
  })();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <FunctionalSection 
          toggleTab={toggleTab} 
          allDogs={allDogs} 
        />
        <div className="content-container">
          {!shouldShowForm && (
            <FunctionalDogs
              filteredDogs={filteredDogs}
              handleUpdateDog={handleUpdateDog}
              allDogs={allDogs}
              handleDeleteDog={handleDeleteDog}
              isLoading={isLoading}
            />
          )}
          {shouldShowForm && (
            <FunctionalCreateDogForm
              onAddDog={handleAddDog}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>
    </div>
  );
}
