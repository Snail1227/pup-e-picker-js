import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState([])

  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    Requests.getAllDogs(setAllDogs);
    // Requests.getAllDogs()
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


  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection 
        allDogs={allDogs}
        />
      <FunctionalDogs 
        handleUpdateDog={handleUpdateDog}
        allDogs={allDogs}
        onDelete={handleDeleteDog}
        isLoading={isLoading}
      />
      <FunctionalCreateDogForm 
        onAddDog={handleAddDog}
        isLoading={isLoading}
      />
    </div>
  );
}
