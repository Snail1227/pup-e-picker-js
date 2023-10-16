import { DogCard } from "../Shared/DogCard";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  handleDeleteDog,
  isLoading,
  handleUpdateDog,
  filteredDogs,
}) => {
  return (
    <>
      {filteredDogs.map((item) => (
        <DogCard
          dog={{
            image: item.image,
            description: item.comment,
            name: item.name,
            isFavorite: item.isFavorite,
          }}
          key={item.id}
          onTrashIconClick={() => {
            handleDeleteDog(item.id);
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
