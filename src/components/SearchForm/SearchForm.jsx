import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          id="movie-input"
          required
        ></input>
        <button
          type="submit"
          className="search-form__submit-button button"
          aria-label="Найти фильмы"
        ></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
