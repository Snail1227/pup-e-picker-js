import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export class ClassApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      listOfFavoriteDogs: [],
      listOfUnfavoriteDogs: [],
      allDogs: [],
      isLoading: false,
      showForm: false
    };
  }

  componentDidMount() {
    Requests.getAllDogs(dogs => this.setState({ allDogs: dogs }));
  }

  dogsCategory = (category) => {
    const favoriteDogs = this.state.allDogs.filter(dog => dog.isFavorite);
    const unfavoriteDogs = this.state.allDogs.filter(dog => !dog.isFavorite);

    if (category === "favorite") {
      this.setState({
        listOfUnfavoriteDogs: [],
        listOfFavoriteDogs: favoriteDogs
      });
    } else if (category === "unfavorite") {
      this.setState({
        listOfFavoriteDogs: [],
        listOfUnfavoriteDogs: unfavoriteDogs
      });
    } else if (category === null) {
      this.setState({
        listOfFavoriteDogs: [],
        listOfUnfavoriteDogs: []
      });
    }
  }

  handleAddDog = (newDog) => {
    this.setState({ isLoading: true });
    Requests.postDog(newDog)
      .then(() => {
        Requests.getAllDogs(dogs => this.setState({ allDogs: dogs }));
        toast.success(`Created ${newDog.name}`);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleDeleteDog = (id) => {
    this.setState({ isLoading: true });
    Requests.deleteDog(id)
      .then(() => Requests.getAllDogs(dogs => this.setState({ allDogs: dogs })))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleUpdateDog = (id, isFavorite) => {
    this.setState({ isLoading: true });
    Requests.updateDog(id, isFavorite)
      .then(() => {
        Requests.getAllDogs(dogs => this.setState({ allDogs: dogs }));
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleCreateForm = (create) => {
    console.log(create)
    if (create === "create") {
      this.setState(prevState => ({ showForm: !prevState.showForm }));
    } else {
      this.setState({ showForm: false });
    }
  }

  render() {
    const { allDogs, showForm, listOfFavoriteDogs, listOfUnfavoriteDogs, handleUpdateDog, handleDeleteDog, isLoading, handleAddDog} = this.state

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <section id="main-section">
        <ClassSection 
          showForm={this.handleCreateForm}
          allDogs={allDogs}
          dogsCategory={this.dogsCategory}
          />
        <div className="content-container">
          { !showForm &&
            <ClassDogs 
              category={listOfFavoriteDogs.length === 0 ? listOfUnfavoriteDogs : listOfFavoriteDogs}
              handleUpdateDog={handleUpdateDog}
              allDogs={allDogs}
              onDelete={handleDeleteDog}
              isLoading={isLoading}
            />
            }
          
          { showForm && 
            <ClassCreateDogForm 
              onAddDog={handleAddDog}
              isLoading={isLoading}
            />
          }
        </div>
      </section>
      </div>
    );
  }
}
