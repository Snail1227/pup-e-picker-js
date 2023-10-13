export const baseUrl = "http://localhost:3000/pup-e";

export const Requests = {
  // should return a promise with all dogs in the database

  getAllDogs: () => {
    return fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
  },

  // should create a dog in the database from a partial dog object
  // and return a promise with the result

  postDog: ({ name, comment, image }) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        comment: comment,
        image: image,
        isFavorite: false,
      }),
    }).then((response) => response.json());
  },

  // should delete a dog from the database
  deleteDog: (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },

  updateDog: (id, isFavorite) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavorite: !isFavorite,
      }),
    }).then((response) => response.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
