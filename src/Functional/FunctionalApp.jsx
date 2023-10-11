import { useEffect, useState, useMemo } from "react";
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

  const favoriteDogs = useMemo(
    () => allDogs.filter((dog) => dog.isFavorite),
    [allDogs]
  );
  const unfavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const dogsCategory = (category) => {
    setShowForm(category === "create" ? !showForm : false);

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

  const updateRequest = async (id) => {
    await allDogsRequest();
    setListOfFavoriteDogs((prevList) =>
      prevList.filter((dog) => dog.id !== id)
    );
    setListOfUnfavoriteDogs((prevList) =>
      prevList.filter((dog) => dog.id !== id)
    );
  };

  const handleAddDog = withLoading(async (newDog) => {
    await Requests.postDog(newDog);
    await allDogsRequest();
    toast.success(`Created ${newDog.name}`);
  });

  const handleDeleteDog = withLoading(async (id) => {
    await Requests.deleteDog(id);
    await updateRequest(id);
  });

  const handleUpdateDog = withLoading(async (id, isFavorite) => {
    await Requests.updateDog(id, isFavorite);
    await updateRequest(id);
  });

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <FunctionalSection dogsCategory={dogsCategory} allDogs={allDogs} />
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
