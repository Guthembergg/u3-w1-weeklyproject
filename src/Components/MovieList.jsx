import { Component } from "react";
import { Image, Spinner, Alert } from "react-bootstrap";
import SingleMovie from "./SingleMovie";

class MovieList extends Component {
  state = {
    movie: [],
    isLoading: true,
    hasError: false,
    errorMessage: "",
    selected: false,
  };

  fetchMovie = async () => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=46c9a463&s=${this.props.movie}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.setState({
          movie: data.Search,
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Error loading content ERROR: ${response.status}`,
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errorMessage: `CATCH FATAL ERROR: ${error.message}`,
      });
    }
  };
  componentDidMount = () => {
    this.fetchMovie();
  };

  render() {
    return (
      <>
        {this.state.movie
          .filter((movie) => movie.Type === "movie")
          .map((el, i) => (
            <SingleMovie movie={el} key={`movie-${i}`} />
          ))}
      </>
    );
  }
}

export default MovieList;
