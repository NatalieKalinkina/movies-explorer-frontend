import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/constants';

function MoviesCardList() {
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {movies.map(movie => (
          <MoviesCard
            key={movie.id}
            name={movie.nameRU}
            image={movie.image}
            duration={movie.duration}
            possibleToSave={movie.possibleToSave}
            saved={movie.saved}
          />
        ))}
      </div>
      <button className="movies-list__button button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
