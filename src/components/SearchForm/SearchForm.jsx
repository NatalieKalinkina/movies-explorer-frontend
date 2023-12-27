import React, { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useNavigate } from 'react-router-dom';

function SearchForm({ onSearch, lastSearchQuery, changeCheckbox, checkedCheckbox }) {
  const [formValue, setFormValue] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (lastSearchQuery) {
      setFormValue({ ...formValue, text: lastSearchQuery });
    }
  }, [lastSearchQuery, navigate, setFormValue]);

  function handleChange(evt) {
    setFormValue('');
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(formValue.text);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          id="movie-input"
          name="text"
          required
          value={formValue.text || ''}
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="search-form__submit-button button"
          aria-label="Найти фильмы"
        ></button>
      </form>
      <FilterCheckbox checkedCheckbox={checkedCheckbox} changeCheckbox={changeCheckbox} />
    </section>
  );
}

export default SearchForm;
