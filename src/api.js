
export const baseUrl = "http://localhost:3000/pup-e";

export const Requests  = {

    
  // should return a promise with all dogs in the database
  getAllD: () => 
    fetch(baseUrl).then((response) => response.json()),


  createNote: (note) => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-type":"application/json",
      },
      body: JSON.stringify(note)
    })
      .then((response) => response.json())
  },


  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  
  getAllDogs: ( { setData } ) => {
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      return data;
    })  
  },
  
  // should delete a dog from the database
  deleteDog: ({ id }) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
      },
    })
    .then(response => response.text())
    .then(result => console.log(result));
  },


  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};

  

