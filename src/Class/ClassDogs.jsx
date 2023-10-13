import { Component } from 'react';
import { DogCard } from "../Shared/DogCard";

export class ClassDogs extends Component {
  render() {
    const { handleDeleteDog, isLoading, handleUpdateDog, filteredDogs } = this.props;

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
  }
}
