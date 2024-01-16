import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { mainApi } from '../../utils/MainApi.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesForRender, setSavedMoviesForRender] = React.useState(savedMovies);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [searchMessage, setSearchMessage] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  useEffect(() => {
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          localStorage.setItem('isLoggedIn', true);
          setSearchMessage('');
          mainApi.getUserInfo().then(data => {
            setCurrentUser(data);
          });
          mainApi.getSavedMovies().then(data => {
            setSavedMovies(data.movies);
            setSavedMoviesForRender(data.movies);
          });
        })
        .catch(() => {
          setSearchMessage(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        });
    }
  }, [token]);

  const onRegister = (name, email, password) => {
    const userPassword = password;
    mainApi
      .register(name, email, password)
      .then(res => {
        if (res.email) {
          navigate('/movies');
          setLoggedIn(true);
          localStorage.setItem('isLoggedIn', true);
          mainApi.authorize(res.email, userPassword);
        } else {
          setErrorMessage('Произошла ошибка при регистрации');
        }
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setErrorMessage('На сервере произошла ошибка.');
        }
      })
      .finally(setIsDisabled(false));
  };

  const onLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    navigate('/movies');
  };

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('checkbox');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('moviesForRender');
    localStorage.removeItem('SavedMoviesForRender');
    localStorage.removeItem('isMoreMovies');
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
    navigate('/');
  };

  function handleUpdateUser(data) {
    mainApi
      .postUserInfo(data)
      .then(user => {
        setCurrentUser(user);
        setErrorMessage('');
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setErrorMessage('Пользователь с таким email уже существует.');
        } else if (err === 'Ошибка: 500') {
          setErrorMessage('На сервере произошла ошибка.');
        } else {
          setErrorMessage('При обновлении профиля произошла ошибка.');
        }
      })
      .finally(setIsDisabled(false));
  }

  function handleMovieSave(movie) {
    mainApi
      .saveMovie(movie)
      .then(savedMovie => {
        setIsSaved(true);
        setSavedMoviesForRender([...savedMovies, savedMovie]);
        setSavedMovies([...savedMovies, savedMovie]);
      })
      .catch(err => console.error(err));
  }

  function handleMovieDelete(movie) {
    if (!movie._id) {
      const element = savedMovies.find(item => item.movieId === movie.id);
      movie._id = element._id;
    }
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setIsSaved(false);
        setSavedMoviesForRender(state => state.filter(m => m._id !== movie._id));
        setSavedMovies(state => state.filter(m => m._id !== movie._id));
      })
      .catch(err => console.error(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies
                  onMovieSave={handleMovieSave}
                  onMovieDelete={handleMovieDelete}
                  savedMovies={savedMovies}
                  searchMessage={searchMessage}
                  setSearchMessage={setSearchMessage}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                  isSaved={isSaved}
                  setIsSaved={setIsSaved}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  isSaved={isSaved}
                  setIsSaved={setIsSaved}
                  savedMovies={savedMovies}
                  savedMoviesForRender={savedMoviesForRender}
                  setSavedMoviesForRender={setSavedMoviesForRender}
                  onMovieDelete={handleMovieDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn === true ? (
                <Navigate to="/" replace />
              ) : (
                <Register
                  onRegister={onRegister}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                />
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn === true ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onLogin={onLogin}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  onSignOut={onSignOut}
                  onUpdateUser={handleUpdateUser}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
