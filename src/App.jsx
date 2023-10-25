import "./App.css";
import { Navbar, Container, Nav, Form, Carousel } from "react-bootstrap";
import { getMovieList, searchMovie } from "./API";
import { useEffect, useState } from "react";

const App = () =>
{
  const [ popularMovies, setPopularMovies ] = useState( [] );

  useEffect( () =>
  {
    getMovieList().then( ( result ) =>
    {
      setPopularMovies( result );
    } );
  }, [] );

  const PopularMovieList = () =>
  {
    return popularMovies.map( ( movie, i ) => (
      <div className="Movie-Wrapper" key={ i }>
        <img
          className="Movie-Image"
          src={ `${ process.env.REACT_APP_BASEIMGURL }/${ movie.poster_path }` }
          alt="img"
        />
        <div className="Movie-Title">{ movie.title }</div>
        <div className="Movie-Date">
          Release: { movie.release_date } | ⭐{ movie.vote_average }
        </div>
      </div>
    ) );
  };

  const search = async ( q ) =>
  {
    if ( q.length > 3 )
    {
      const query = await searchMovie( q );
      setPopularMovies( query.results );
    }
  };

  return (
    <div className="App">
      <div className="Navigation">
        <Navbar className="nav-onTop" variant="dark">
          <Container>
            <Navbar.Brand href="/" className="Nav-title">
              Movieee.
            </Navbar.Brand>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={ ( { target } ) => search( target.value ) }
                />
              </Form>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <div className="Carousel">
        <Carousel>
          { popularMovies.map( ( movie, index ) => (
            <Carousel.Item key={ index }>
              <img
                className="d-block w-100"
                src={ `${ process.env.REACT_APP_BASEIMGURL }/${ movie.poster_path }` }
                alt={ movie.title }
              />
              <Carousel.Caption>
                <h3>{ movie.title }</h3>
                <p>{/* Description of the movie */ }</p>
              </Carousel.Caption>
            </Carousel.Item>
          ) ) }
        </Carousel>
      </div>

      <div className="Title-Container">
        <h2>Popular Movie</h2>
      </div>
      <div className="Movie-Container">
        <PopularMovieList />
      </div>

      <footer>
        <div class="footer-content">
          <p>&copy; 2023 Your Website Name</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
