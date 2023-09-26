export const baseUrl = "http://localhost:3000/pup-e";

export const Requests  = {
  // should return a promise with all dogs in the database
  postDog: ({ name, comment, picture }) => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-type":"application/json",
      },
      body: JSON.stringify({
        name,
        comment,
        picture
      })
    })
      .then((data) => data.json())
      .then(console.log)
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  
  getAllDogs: ( {setData} ) => {
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      },
    })
    .then((data) => data.json())
    .then((data) => {
      setData(data);
      console.log(data);
      return data;
    })  
  },

  // should delete a dog from the database
  deleteDog: () => {},

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};

  

