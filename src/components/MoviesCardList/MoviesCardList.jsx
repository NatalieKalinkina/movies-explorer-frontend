import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ moviesForRender, onMovieSave, onMovieDelete, savedMovies, isMoreMovies, onMoreMoviesOpen }) {
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {moviesForRender.map(movie => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            id={movie.id}
            name={movie.nameRU}
            image={`https://api.nomoreparties.co/${movie.image.url}`}
            duration={movie.duration}
            country={movie.country}
            director={movie.director}
            year={movie.year}
            description={movie.description}
            trailerLink={movie.trailerLink}
            nameEN={movie.nameEN}
            thumbnail={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
            movieId={movie.movieId}
            savedMovies={savedMovies}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
          />
        ))}
      </div>
      {isMoreMovies && (<button className="movies-list__button button" onClick={onMoreMoviesOpen}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;
