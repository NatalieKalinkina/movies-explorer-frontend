import React, { useEffect } from 'react';
import './Movies.css';
import { useNavigate } from 'react-router-dom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';

function Movies({ onMovieSave, onMovieDelete, savedMovies }) {
  // const [allMovies, setAllMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastSearchQuery, setLastSearchQuery] = React.useState('');
  const [checkedCheckbox, setCheckedCheckbox] = React.useState(false);
  const [lastCheckbox, setLastCheckbox] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('');
  const navigate = useNavigate();
  let allMoviesData = JSON.parse(localStorage.getItem('allMovies'));

  useEffect(() => {
    const foundMoviesData = JSON.parse(localStorage.getItem('foundMovies'));
    const searchQueryData = JSON.parse(localStorage.getItem('searchQuery'));
    const checkboxData = JSON.parse(localStorage.getItem('checkbox'));
    const filteredMoviesData = JSON.parse(localStorage.getItem('filteredMovies'));
    if (foundMoviesData === null || foundMoviesData === undefined) {
      setFoundMovies([]);
    } else {
      setFoundMovies(foundMoviesData);
    }
    if (searchQueryData) {
      setLastSearchQuery(searchQueryData);
    }
    if (checkboxData === true) {
      setLastCheckbox(true);
      setFoundMovies(filteredMoviesData);
    }
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
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    } else {
      setFoundMovies(allFoundMovies);
    }
    localStorage.setItem('checkbox', JSON.stringify(!checkedCheckbox));
    setLastCheckbox(!checkedCheckbox);
  }

  // function getAllMovies() {
  //   setIsLoading(true);
  //   moviesApi
  //     .getMovies()
  //     .then(data => {
  //       setAllMovies(data);
  //       localStorage.setItem('allMovies', JSON.stringify(data));
  //       const allMoviesData = JSON.parse(localStorage.getItem('allMovies'));
  //     })
  //     .catch(console.error)
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // const onSearch = searchQuery => {
  //   setCheckedCheckbox(false);
  //   setLastCheckbox(false);
  //   const allMoviesData = JSON.parse(localStorage.getItem('allMovies'));
  //   if (!allMoviesData) {
  //     getAllMovies();
  //   }
  //   const searchResult = allMoviesData.filter(
  //     movie =>
  //       movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFoundMovies(searchResult);
  //   localStorage.setItem('foundMovies', JSON.stringify(searchResult));
  //   localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
  //   console.log(foundMovies);
  // };

  const onSearch = async searchQuery => {
    try {
      setIsLoading(true);
      setCheckedCheckbox(false);
      setLastCheckbox(false);
      if (!allMoviesData) {
        const allMovies = await moviesApi.getMovies();
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
      }
      setFoundMovies(searchResult);
      localStorage.setItem('foundMovies', JSON.stringify(searchResult));
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
      setIsLoading(false);
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
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            foundMovies={foundMovies}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            isLoading={isLoading}
            savedMovies={savedMovies}
          />
        )}
        <p className="movies__search-message">{searchMessage}</p>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
