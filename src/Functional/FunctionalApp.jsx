import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState([]);

  useEffect(() => {
    Requests.getAllDogs(setAllDogs);
  }, [])


  const handleAddDog = (newDog) => {
    Requests.postDog(newDog)
      .then((createdDog) => {
        setAllDogs((prevDogs) => [...prevDogs, createdDog])
      })
  }

  const handleDeleteDog = (id) => {
    Requests.deleteDog(id)
    .then(() => {
      setAllDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id))
    });
  }


  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection />
      <FunctionalDogs 
        allDogs={allDogs}
        onDelete={handleDeleteDog}
      />
      <FunctionalCreateDogForm 
        onAddDog={handleAddDog}
      />
    </div>
  );
}
