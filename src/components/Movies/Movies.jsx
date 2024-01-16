import React, { useEffect } from 'react';
import './Movies.css';
import { useNavigate } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { WIDTH_LAPTOP, WIDTH_MOBILE, INITIAL_AMOUNT_MOVIES_LAPTOP, INITIAL_AMOUNT_MOVIES_TABLET, INITIAL_AMOUNT_MOVIES_MOBILE, ADD_AMOUNT_MOVIES_LAPTOP, ADD_AMOUNT_MOVIES_TABLET, ADD_AMOUNT_MOVIES_MOBILE } from '../../utils/constants.js';

function Movies({ onMovieSave, onMovieDelete, savedMovies, searchMessage, setSearchMessage, isDisabled, setIsDisabled, isSaved, setIsSaved }) {
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastSearchQuery, setLastSearchQuery] = React.useState('');
  const [checkedCheckbox, setCheckedCheckbox] = React.useState(false);
  const [lastCheckbox, setLastCheckbox] = React.useState(false);
  const [moviesForRender, setMoviesForRender] = React.useState([]);
  const [isMoreMovies, setIsMoreMovies] = React.useState(false);
  const [initialAmountMovies, setInitialAmountMovies] = React.useState(0);
  const [addAmountMovies, setAddAmountMovies] = React.useState(0);
  const [lastAmountMovies, setLastAmountMovies] = React.useState(0);
  const navigate = useNavigate();
  const width = window.innerWidth;

  let allMoviesData = JSON.parse(localStorage.getItem('allMovies'));

  useEffect(() => {
    const foundMoviesData = JSON.parse(localStorage.getItem('foundMovies'));
    const searchQueryData = JSON.parse(localStorage.getItem('searchQuery'));
    const checkboxData = JSON.parse(localStorage.getItem('checkbox'));
    const filteredMoviesData = JSON.parse(localStorage.getItem('filteredMovies'));
    const moviesForRenderData = JSON.parse(localStorage.getItem('moviesForRender'));
    const isMoreMoviesData = JSON.parse(localStorage.getItem('isMoreMovies'));
    if (foundMoviesData === null || foundMoviesData === undefined) {
      setFoundMovies([]);
      setMoviesForRender([]);
    } else {
      setFoundMovies(foundMoviesData);
      setMoviesForRender(moviesForRenderData);
    }
    if (searchQueryData) {
      setLastSearchQuery(searchQueryData);
    }
    if (checkboxData === true) {
      setLastCheckbox(true);
      setFoundMovies(filteredMoviesData);
      setMoviesForRender(moviesForRenderData);
    }
    setIsMoreMovies(isMoreMoviesData);
  }, [navigate]);

  useEffect(() => {
    if (lastCheckbox === true) {
      setCheckedCheckbox(true);
    }
  }, [lastCheckbox, checkedCheckbox, navigate]);

  function changeCheckbox() {
    setCheckedCheckbox(!checkedCheckbox);
    const allFoundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    if (checkedCheckbox === false) {
      const filteredMovies = foundMovies.filter(movie => movie.duration < 40);
      setFoundMovies(filteredMovies);
      setMoviesForRender(countMovies(filteredMovies));
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('moviesForRender', JSON.stringify(countMovies(filteredMovies)));
    } else {
      setFoundMovies(allFoundMovies);
      setMoviesForRender(countMovies(allFoundMovies));
      localStorage.setItem('moviesForRender', JSON.stringify(countMovies(allFoundMovies)));
    }
    localStorage.setItem('checkbox', JSON.stringify(!checkedCheckbox));
    setLastCheckbox(!checkedCheckbox);
  }

  useEffect(() => {
    if (width > WIDTH_LAPTOP) {
      setInitialAmountMovies(INITIAL_AMOUNT_MOVIES_LAPTOP);
      setAddAmountMovies(ADD_AMOUNT_MOVIES_LAPTOP);
    } else if (width < WIDTH_MOBILE) {
      setInitialAmountMovies(INITIAL_AMOUNT_MOVIES_MOBILE);
      setAddAmountMovies(ADD_AMOUNT_MOVIES_MOBILE);
    } else {
      setInitialAmountMovies(INITIAL_AMOUNT_MOVIES_TABLET);
      setAddAmountMovies(ADD_AMOUNT_MOVIES_TABLET);
    }
  }, [width]);

  const handleMoreMoviesClick = () => {
    setMoviesForRender(foundMovies.slice(0, lastAmountMovies + addAmountMovies))
    localStorage.setItem('moviesForRender', JSON.stringify(foundMovies.slice(0, lastAmountMovies + addAmountMovies)));
    setLastAmountMovies(lastAmountMovies + addAmountMovies);
    localStorage.setItem('isMoreMovies', true);
    if ((foundMovies.length - moviesForRender.length) <= addAmountMovies) {
      setIsMoreMovies(false);
      localStorage.setItem('isMoreMovies', false);
    }
  }

  function countMovies(array) {
    setLastAmountMovies(initialAmountMovies);
    const slicedArray = array.slice(0, initialAmountMovies);
    if (array.length > 12) {
      setIsMoreMovies(true);
    } else {
      setIsMoreMovies(false);
    }
    localStorage.setItem('isMoreMovies', true);
    return slicedArray;
  }

  const onSearch = async searchQuery => {
    try {
      setIsDisabled(true);
      setIsLoading(true);
      setCheckedCheckbox(false);
      setLastCheckbox(false);
      if (!allMoviesData) {
        const allMovies = await moviesApi.getMovies()
          .catch(() => {
            setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
          }
          )
        localStorage.setItem('allMovies', JSON.stringify(allMovies));
        allMoviesData = JSON.parse(localStorage.getItem('allMovies'));
      }

      const searchResult = allMoviesData.filter(
        movie =>
          movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (searchResult.length === 0) {
        setSearchMessage('Фильмов не найдено');
      } else {
        setSearchMessage('');
      }
      setFoundMovies(searchResult);
      setMoviesForRender(countMovies(searchResult));
      localStorage.setItem('foundMovies', JSON.stringify(searchResult));
      localStorage.setItem('moviesForRender', JSON.stringify(countMovies(searchResult)));
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
      setIsLoading(false);
      setIsDisabled(false);
    } catch (e) {
      console.log(e);
      setSearchMessage(e);
      setIsLoading(false);
      setFoundMovies([]);
    }
  };

  return (
    <>
      <main className="movies">
        <SearchForm
          onSearch={onSearch}
          lastSearchQuery={lastSearchQuery}
          checkedCheckbox={checkedCheckbox}
          changeCheckbox={changeCheckbox}
          isDisabled={isDisabled}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesForRender={moviesForRender}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            isLoading={isLoading}
            savedMovies={savedMovies}
            isMoreMovies={isMoreMovies}
            onMoreMoviesOpen={handleMoreMoviesClick}
          />
        )}
        <p className="movies__search-message">{searchMessage}</p>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
