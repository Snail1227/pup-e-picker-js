import { DogCard } from "../Shared/DogCard";
import { dogPictures } from "../dog-pictures";
import { useState, useEffect } from 'react';
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = () => {
  const [data, setData] = useState([]);

  useEffect (() => {
    Requests.getAllDogs(setData);
  }, []);
  
  console.log(data);
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {/* <DogCard
        dog={{
          id: 1,
          image: dogPictures.BlueHeeler,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Blue Heeler",
        }}
        key={1}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      />
      <DogCard
        dog={{
          id: 2,
          image: dogPictures.Boxer,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Boxer",
        }}
        key={2}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      />
      <DogCard
        dog={{
          id: 3,
          image: dogPictures.Chihuahua,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Chihuahua",
        }}
        key={3}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      />
      <DogCard
        dog={{
          id: 4,
          image: dogPictures.Corgi,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Corgi",
        }}
        key={4}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      /> */}

      {data.map((item) => (
        <DogCard
        dog={{
          id: item.id,
          image: item.picture,
          description: item.comment,
          isFavorite: true,
          name: item.name,
        }}
          key={item.id}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
