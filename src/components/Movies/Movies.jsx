import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
}

export default Movies;
