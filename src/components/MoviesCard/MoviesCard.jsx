import React from 'react';
import './MoviesCard.css';

function MoviesCard({ image, name, duration, possibleToSave, saved, possibleToDelete }) {
  return (
    <section className="movies-card">
      <img src={image} className="movies-card__image" alt={name} />
      {possibleToSave && (
        <button
          type="button"
          className="movies-card__save-button button"
          aria-label="Сохранить фильм"
        >
          Сохранить
        </button>
      )}
      {saved && <div className="movies-card__icon movies-card__icon_type_saved"></div>}
      {possibleToDelete && (
        <div className="movies-card__icon  movies-card__icon_type_delete button"></div>
      )}
      <div className="movies-card__caption">
        <p className="movies-card__name">{name}</p>
        <p className="movies-card__duration">{duration}</p>
      </div>
    </section>
  );
}

export default MoviesCard;
