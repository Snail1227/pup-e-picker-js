import { DogCard } from "../Shared/DogCard"; 

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ( { allDogs, onDelete, isLoading, handleUpdateDog} ) => {

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {allDogs.map((item) => (
        <DogCard
          dog={{
            image: item.image,
            description: item.comment,
            name: item.name,
            isFavorite: item.isFavorite,
          }}
          key={item.id}
          onTrashIconClick={() => {
            onDelete(item.id);
          }}
          onHeartClick={() => {
            handleUpdateDog(item.id, item.isFavorite);
          }}
          onEmptyHeartClick={() => {
            handleUpdateDog(item.id, item.isFavorite);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
