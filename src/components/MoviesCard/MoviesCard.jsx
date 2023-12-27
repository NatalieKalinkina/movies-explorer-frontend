import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './MoviesCard.css';
import { getDuration } from '../../utils/getDuration.js';

function MoviesCard({
  movie,
  movieId,
  image,
  name,
  trailerLink,
  duration,
  onMovieDelete,
  onMovieSave,
  savedMovies
}) {
  const [isSaved, setIsSaved] = React.useState(false);
  const location = useLocation();

  useEffect(() => {
    if (savedMovies.some(item => item.movieId === movie.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, movie.id]);

  function handleMovieSave() {
    setIsSaved(true);
    onMovieSave(movie);
  }

  function handleMovieDelete() {
    setIsSaved(false);
    onMovieDelete(movie);
  }

  return (
    <section className="movies-card">
      <a href={trailerLink} target="_blank" rel="noreferrer">
        <img src={image} className="movies-card__image" alt={name} />
      </a>
      {isSaved === false && location.pathname === '/movies' && (
        <button
          type="button"
          className="movies-card__save-button button"
          aria-label="Сохранить фильм"
          onClick={handleMovieSave}
        >
          Сохранить
        </button>
      )}
      {isSaved === true && location.pathname === '/movies' && (
        <div className="movies-card__icon movies-card__icon_type_saved"></div>
      )}
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
