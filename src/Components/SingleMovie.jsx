import { Component } from "react";
import { Image, Spinner } from "react-bootstrap";

class SingleMovie extends Component {
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
        `http://www.mdbapi.com/?apikey=46c9a463&s=${this.props.movie}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.Search);
        this.setState({
          movie: data.Search[0],
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Error loading content. ERROR: ${response.status}`,
        });
        alert(this.state.errorMessage);
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        hasError: true,
        errorMessage: `CATCH FATAL ERROR: ${error.message}`,
      });
      alert(this.state.errorMessage);
    }
  };
  componentDidMount = () => {
    this.fetchMovie();
  };

  render() {
    return (
      <div
        className="col mb-2 px-1"
        style={{
          borderBottom: this.state.selected ? "1px solid grey" : "0px",
        }}
        onClick={() => this.setState({ selected: !this.state.selected })}
      >
        {this.state.isLoading && (
          <Spinner animation="border" role="status" variant="light"></Spinner>
        )}
        {!this.state.isLoading && !this.state.hasError && (
          <Image
            className="img-fluid"
            style={{ aspectRatio: "0.67" }}
            src={this.state.movie.Poster}
            alt="movie "
            fluid
          />
        )}
        {this.state.selected && (
          <div
            className="pt-3"
            style={{
              color: "white",
            }}
          >
            {this.state.movie.Title}
            <div
              style={{
                color: "orange",
              }}
            >
              {this.state.movie.Year}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SingleMovie;
