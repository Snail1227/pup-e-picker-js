import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Toaster, toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Requests.getAllDogs(setAllDogs);
  }, [])


  const handleAddDog = (newDog) => {
    setLoading(true);
    Requests.postDog(newDog)
      .then((createdDog) => {
        setAllDogs((prevDogs) => [...prevDogs, createdDog]);
        toast.success(`Created ${newDog.name}`);
      })
      .finally(() => {
        setLoading(false);
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
      <Toaster />
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
        loading={loading}
      />
    </div>
  );
}
