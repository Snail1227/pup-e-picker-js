import { DogCard } from "../Shared/DogCard";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ( { allDogs, onDelete } ) => {

  
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>

      {allDogs.map((item) => (
        <DogCard
          dog={{
            image: item.image,
            description: item.comment,
            isFavorite: true,
            name: item.name,
          }}
          key={item.id}
          onTrashIconClick={() => {
            onDelete(item.id);
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
