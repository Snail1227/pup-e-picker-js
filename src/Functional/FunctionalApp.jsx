import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

export function FunctionalApp() {
  const [allData, setAllData] = useState([])
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection />
      <FunctionalDogs allDogs={allData}/>
      <FunctionalCreateDogForm allData={ (allDogs) => {
          setAllData(allDogs);
        }} 
      />
    </div>
  );
}
