import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

const VALID_ACTIVE_TABS = {
  none: 'none',
  favorited: "favorited",
  unfavorited: "unfavorited",
  createDogForm: "create-dog-form",
}

export class ClassApp extends Component {
  state = {
    allDogs: [],
    isLoading: false,
    activeTab: "none"
  };

  listOfFavoriteDogs = () => this.state.allDogs.filter((dog) => dog.isFavorite);
  listOfUnfavoriteDogs = () => this.state.allDogs.filter((dog) => !dog.isFavorite);
  previousDogsState = [...this.state.allDogs];

  toggleTab = (newTab) => {
    if (this.state.activeTab === newTab) {
      this.setState({ activeTab: "none" });
      return;
    }
    this.setState({ activeTab: newTab });
  }

  componentDidMount() {
    this.allDogsRequest();
  }

  allDogsRequest = () => Requests.getAllDogs().then(allDogs => this.setState({ allDogs }));

  withLoading = (func) => async (...args) => {
    this.setState({ isLoading: true });
    try {
        await func(...args);
    } finally {
        this.setState({ isLoading: false });
    }
};

  // updateRequest = async () => {
  //   await this.allDogsRequest();
  // };

  handleAddDog = this.withLoading((newDog) => {
    this.setState(prevState => ({ allDogs: [...prevState.allDogs, newDog] }));
    
    Requests.postDog(newDog)
      .catch(() => {
        this.setState({ allDogs: this.previousDogsState });
        toast.error("Error to add new dog.");
      });
    toast.success(`Created ${newDog.name}`);

    // await Requests.postDog(newDog);
    // await this.allDogsRequest();
    // toast.success(`Created ${newDog.name}`);
  });

  handleDeleteDog = this.withLoading((id) => {
    this.setState(prevState => ({ 
      allDogs: prevState.allDogs.filter((dog) => dog.id !== id) 
    }));
    
    Requests.deleteDog(id).catch(() => {
      this.setState({ allDogs: this.previousDogsState });
      toast.error("Error to delete the dog.");
    });

    // await Requests.deleteDog(id);
    // await this.updateRequest();
  });

  handleUpdateDog = this.withLoading(async (id, isFavorite) => {
    this.setState((prevState) => ({ 
      allDogs: prevState.allDogs.map((dog) =>
        dog.id === id ? { ...dog, isFavorite: !isFavorite } : dog
      )
    }));
    
    Requests.updateDog(id, isFavorite).catch(() => {
      this.setState({ allDogs: this.previousDogsState });
      toast.error("Failed to update the dog.");
    });
      // await Requests.updateDog(id, isFavorite);
      // await this.updateRequest();
    });

  render() {
    const shouldShowForm = this.state.activeTab === VALID_ACTIVE_TABS.createDogForm;

    const filteredDogs = (() => {
      switch (this.state.activeTab) {
        case "favorited":
          return this.listOfFavoriteDogs();
        case "unfavorited":
          return this.listOfUnfavoriteDogs();
        case "none":
          return this.state.allDogs;
        case "create-dog-form":
          return [];
        default:
          return [];
      }
    })();

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <section id="main-section">
          <ClassSection
            toggleTab={this.toggleTab} 
            allDogs={this.state.allDogs} 
            activeTab={this.state.activeTab}
            listOfFavoriteDogs={this.listOfFavoriteDogs}
            listOfUnfavoriteDogs={this.listOfUnfavoriteDogs}
          />
          <div className="content-container">
            {!shouldShowForm && (
              <ClassDogs
                filteredDogs={filteredDogs}
                handleUpdateDog={this.handleUpdateDog}
                allDogs={this.state.allDogs}
                handleDeleteDog={this.handleDeleteDog}
                isLoading={this.state.isLoading}
              />
            )}
            {shouldShowForm && (
              <ClassCreateDogForm
                onAddDog={this.handleAddDog}
                isLoading={this.state.isLoading}
              />
            )}
          </div>
        </section>
      </div>
    );
  }
}
