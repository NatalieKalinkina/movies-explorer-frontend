import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import '../Movies/Movies.css';
import '../MoviesCardList/MoviesCardList.css';
import './SavedMovies.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SavedMovies({ savedMovies, onMovieDelete, savedMoviesForRender, setSavedMoviesForRender }) {
  const [checkedCheckbox, setCheckedCheckbox] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSavedMoviesForRender(savedMovies);
  }, [navigate]);

  function changeCheckbox() {
    setCheckedCheckbox(!checkedCheckbox);
    let foundSavedMovies = JSON.parse(localStorage.getItem('SavedMoviesForRender'));
    if (!foundSavedMovies) {
      foundSavedMovies = savedMovies;
    }
    if (checkedCheckbox === false) {
      const filteredSavedMovies = foundSavedMovies.filter(movie => movie.duration < 40);
      setSavedMoviesForRender(filteredSavedMovies);
    } else {
      setSavedMoviesForRender(foundSavedMovies);
    }
  }
  const onSearch = searchQuery => {
    setCheckedCheckbox(false);
    const searchResult = savedMovies.filter(
      movie =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (searchResult.length === 0) {
      setSearchMessage('Фильмов не найдено');
    }
    setSavedMoviesForRender(searchResult);
    localStorage.setItem('SavedMoviesForRender', JSON.stringify(searchResult));
  };

  return (
    <>
      <main className="movies saved-movies">
        <SearchForm
          onSearch={onSearch}
          checkedCheckbox={checkedCheckbox}
          changeCheckbox={changeCheckbox}
        />
        <div className="movies-list">
          <div className="movies-list__container">
            {savedMoviesForRender.map(movie => (
              <MoviesCard
                key={movie.movieId}
                movie={movie}
                name={movie.nameRU}
                image={movie.image}
                duration={movie.duration}
                saved={movie.saved}
                country={movie.country}
                director={movie.director}
                year={movie.year}
                description={movie.description}
                trailerLink={movie.trailerLink}
                nameEN={movie.nameEN}
                thumbnail={movie.thumbnail}
                movieId={movie.movieId}
                onMovieDelete={onMovieDelete}
                savedMovies={savedMovies}
              />
            ))}
          </div>
          <p className="movies__search-message">{searchMessage}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
