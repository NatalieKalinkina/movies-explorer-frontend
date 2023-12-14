import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import '../Movies/Movies.css';
import '../MoviesCardList/MoviesCardList.css';
import './SavedMovies.css';
import { savedMovies } from '../../utils/constants';

function SavedMovies() {
  return (
    <>
      <main className="movies saved-movies">
        <SearchForm />
        <div className="movies-list">
          <div className="movies-list__container">
            {savedMovies.map(movie => (
              <MoviesCard
                key={movie.id}
                name={movie.nameRU}
                image={movie.image}
                duration={movie.duration}
                possibleToDelete={movie.saved}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
