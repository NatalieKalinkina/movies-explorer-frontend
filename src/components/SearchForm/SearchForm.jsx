import React, { useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useNavigate } from 'react-router-dom';

function SearchForm({ onSearch, lastSearchQuery, changeCheckbox, checkedCheckbox }) {
  const [formValue, setFormValue] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lastSearchQuery) {
      setFormValue({ ...formValue, text: lastSearchQuery });
    }
  }, [lastSearchQuery, navigate, setFormValue]);

  function handleChange(evt) {
    setIsEmpty(false);
    setFormValue('');
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
       if (!formValue.text) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false);
      onSearch(formValue.text)
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
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
     {isEmpty && (<p className='search-form__input-error'>Необходимо ввести ключевое слово</p>)}
      <FilterCheckbox checkedCheckbox={checkedCheckbox} changeCheckbox={changeCheckbox} />
    </section>
  );
}

export default SearchForm;
