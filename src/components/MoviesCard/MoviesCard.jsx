import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { getDuration } from '../../utils/getDuration.js';

function MoviesCard({
  movie,
  id,
  image,
  name,
  trailerLink,
  duration,
  onMovieDelete,
  onMovieSave,
  savedMovies,
}) {
  const location = useLocation();

  function handleMovieSave() {
    onMovieSave(movie);
  }

  function handleMovieDelete() {
    onMovieDelete(movie);
  }

  return (

    <section className="movies-card">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={image} className="movies-card__image" alt={name} />
      </a>

      {savedMovies.some(item => item.movieId === id) && location.pathname === '/movies' && (
        <div className="movies-card__icon movies-card__icon_type_saved button"
          onClick={handleMovieDelete}
        ></div>
      )
      }
      {!(savedMovies.some(item => item.movieId === id)) && location.pathname === '/movies' && (
        <button
          type="button"
          className="movies-card__save-button button"
          aria-label="Сохранить фильм"
          onClick={handleMovieSave}
        >
          Сохранить
        </button>
      )
      }
      {location.pathname === '/saved-movies' && (
        <div
          className="movies-card__icon  movies-card__icon_type_delete button"
          onClick={handleMovieDelete}
        ></div>
      )}
      <div className="movies-card__caption">
        <p className="movies-card__name">{name}</p>
        <p className="movies-card__duration">{getDuration(duration)}</p>
      </div>
    </section>

  );
}

export default MoviesCard;
