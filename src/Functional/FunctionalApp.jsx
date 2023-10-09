import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [filterDogs, setFilterDogs] = useState("")
  const [allDogs, setAllDogs] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const choseCategory = (category) => {
    if (category === "favorite") {
      const favoriteDogs = allDogs.filter(dog => dog.isFavorite);
      setAllDogs(favoriteDogs)
    } else {
      Requests.getAllDogs(setAllDogs);
    }
  }

  useEffect(() => {
    Requests.getAllDogs(setAllDogs);
  }, [])

  const handleAddDog = (newDog) => {
    setIsLoading(true);
    Requests.postDog(newDog)
      .then(() => {
        Requests.getAllDogs(setAllDogs);
        toast.success(`Created ${newDog.name}`);
      })
        .finally(() => {
          setIsLoading(false);
        })
  }

  const handleDeleteDog = (id) => {
    setIsLoading(true);
    Requests.deleteDog(id)
      .then(() => Requests.getAllDogs(setAllDogs))
        .finally(() => {
          setIsLoading(false);
        })
  }

  const handleUpdateDog = (id, isFavorite) => {
    setIsLoading(true);
    Requests.updateDog(id, isFavorite)
      .then(() => {
        Requests.getAllDogs(setAllDogs);
      })
        .finally(() => {
          setIsLoading(false);  
        });
  }

  const handleCreateForm = (create) => {
    if (create === "create") {
      setShowForm(showForm === false ? true : false);
    } else {
      setShowForm(false);
    }
  }

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <FunctionalSection 
          showForm={handleCreateForm}
          allDogs={allDogs}
          choseCategory={choseCategory}
          />
        <div className="content-container">
          { !showForm &&
            <FunctionalDogs 
              category={filterDogs}
              handleUpdateDog={handleUpdateDog}
              allDogs={allDogs}
              onDelete={handleDeleteDog}
              isLoading={isLoading}
            />
            }
          
          { showForm && 
            <FunctionalCreateDogForm 
              onAddDog={handleAddDog}
              isLoading={isLoading}
            />
          }
        </div>
      </section>
    </div>
  );
}
