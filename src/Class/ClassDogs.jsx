import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  render() {
    const { allDogs, onDelete, isLoading, handleUpdateDog, category } =
      this.props;
    const toShowDogs = category.length === 0 ? allDogs : category;

    return (
      <>
        {toShowDogs.map((item) => (
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
  }
}
