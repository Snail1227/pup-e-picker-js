import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export const VALID_ACTIVE_TABS = {
  none: "none",
  favorited: "favorited",
  unfavorited: "unfavorited",
  createDogForm: "create-dog-form",
};

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(VALID_ACTIVE_TABS.none);

  const previousDogsState = [...allDogs];

  const listOfFavoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const listOfUnfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const toggleTab = (newTab) => {
    if (activeTab === newTab) {
      setActiveTab("none");
      return;
    }
    setActiveTab(newTab);
  };

  useEffect(() => {
    allDogsRequest();
  }, []);

  const allDogsRequest = () => Requests.getAllDogs().then(setAllDogs);

  const withLoading =
    (func) =>
    async (...args) => {
      setIsLoading(true);
      try {
        await func(...args);
      } finally {
        setIsLoading(false);
      }
    };

  // const updateRequest = async () => {
  //   await allDogsRequest();
  // };

  const handleAddDog = withLoading((newDog) => {
    setAllDogs((prevDog) => [...prevDog, newDog]);
    Requests.postDog(newDog).catch(() => {
      setAllDogs(previousDogsState);
      toast.error("Error to add new dog.");
    });
    toast.success(`Created ${newDog.name}`);

    // await Requests.postDog(newDog);
    // await allDogsRequest();
    // toast.success(`Created ${newDog.name}`);
  });

  const handleDeleteDog = withLoading((id) => {
    setAllDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
    Requests.deleteDog(id).catch(() => {
      setAllDogs(previousDogsState);
      toast.error("Error to delete the dog.");
    });

    // await Requests.deleteDog(id);
    // await updateRequest();
  });

  const handleUpdateDog = withLoading((id, isFavorite) => {
    setAllDogs((prevDogs) =>
      prevDogs.map((dog) =>
        dog.id === id ? { ...dog, isFavorite: !isFavorite } : dog
      )
    );
    Requests.updateDog(id, isFavorite).catch(() => {
      setAllDogs(previousDogsState);
      toast.error("Failed to update the dog.");
    });

    // await Requests.updateDog(id, isFavorite);
    // await updateRequest();
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
          activeTab={activeTab}
          listOfFavoriteDogs={listOfFavoriteDogs}
          listOfUnfavoriteDogs={listOfUnfavoriteDogs}
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
