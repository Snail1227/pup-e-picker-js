import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [listOfFavoriteDogs, setListOfFavoriteDogs] = useState([]);
  const [listOfUnfavoriteDogs, setListOfUnfavoriteDogs] = useState([]);

  const [allDogs, setAllDogs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const dogsCategory = (category) => {
    if (category === "favorite") {
      setListOfUnfavoriteDogs([]);
      setListOfFavoriteDogs(favoriteDogs);
    } else if (category === "unfavorite") {
      setListOfFavoriteDogs([]);
      setListOfUnfavoriteDogs(unfavoriteDogs);
    } else if (category === null) {
      setListOfFavoriteDogs([]);
      setListOfUnfavoriteDogs([]);
    }
  };

  useEffect(() => {
    allDogsRequest();
  }, []);

  const allDogsRequest = () => Requests.getAllDogs(setAllDogs);

  const handleAddDog = (newDog) => {
    setIsLoading(true);
    Requests.postDog(newDog)
      .then(() => {
        allDogsRequest();
        toast.success(`Created ${newDog.name}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteDog = (id) => {
    setIsLoading(true);
    Requests.deleteDog(id)
      .then(() => allDogsRequest())
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateDog = (id, isFavorite) => {
    setIsLoading(true);
    Requests.updateDog(id, isFavorite)
      .then(() => {
        if (isFavorite === false) {
          setListOfUnfavoriteDogs(unfavoriteDogs);
        } else {
          setListOfFavoriteDogs(favoriteDogs);
        }
      })
      .then(() => allDogsRequest())

      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateForm = (create) => {
    if (create === "create") {
      setShowForm(showForm === false ? true : false);
    } else {
      setShowForm(false);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <FunctionalSection
          showForm={handleCreateForm}
          allDogs={allDogs}
          dogsCategory={dogsCategory}
        />
        <div className="content-container">
          {!showForm && (
            <FunctionalDogs
              category={
                listOfFavoriteDogs.length === 0
                  ? listOfUnfavoriteDogs
                  : listOfFavoriteDogs
              }
              handleUpdateDog={handleUpdateDog}
              allDogs={allDogs}
              onDelete={handleDeleteDog}
              isLoading={isLoading}
            />
          )}

          {showForm && (
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
