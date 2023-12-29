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

  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          mainApi.getUserInfo().then(data => {
            setCurrentUser(data);
          });
        })
        .catch(console.error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          setSearchMessage('');
          mainApi.getSavedMovies().then(data => {
            setSavedMovies(data.movies);
            setSavedMoviesForRender(data.movies);
          });
        })
        .catch(() => {
          setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        });
        
    }
  }, [token, navigate]);

  const onRegister = (name, email, password) => {
    const userPassword = password;
    mainApi
      .register(name, email, password)
      .then(res => {
        if (res.email) {
          navigate('/movies');
          setLoggedIn(true);
          mainApi.authorize(res.email, userPassword);
        } else {
          setErrorMessage('Произошла ошибка при регистрации');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrorMessage('Пользователь с таким email уже существует.');
          } else {
            setErrorMessage('На сервере произошла ошибка.');
          } 
      });
  };

  const onLogin = () => {
    setLoggedIn(true);
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
    setLoggedIn(false);
    navigate('/');
  };

  function handleUpdateUser(data) {
    mainApi
      .postUserInfo(data)
      .then(user => {
        setCurrentUser(user);
        setErrorMessage('')
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrorMessage('Пользователь с таким email уже существует.');
          } else if (err === 'Ошибка: 500') {
            setErrorMessage('На сервере произошла ошибка.');
          } else {
            setErrorMessage('При обновлении профиля произошла ошибка.')
          }
      });
  }

  function handleMovieSave(movie) {
    mainApi.saveMovie(movie).then(savedMovie => {
      setSavedMoviesForRender([...savedMovies, savedMovie]);
      setSavedMovies([...savedMovies, savedMovie]);
    });
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setSavedMoviesForRender(state => state.filter(m => m._id !== movie._id));
        setSavedMovies(state => state.filter(m => m._id !== movie._id));
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch(console.error);
    }
  }, [token, navigate, loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies onMovieSave={handleMovieSave} savedMovies={savedMovies} searchMessage={searchMessage} setSearchMessage={setSearchMessage}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
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
              loggedIn === true ? <Navigate to="/" replace /> : <Register onRegister={onRegister} errorMessage={errorMessage}/>
            }
          />
          <Route
            path="/signin"
            element={loggedIn === true ? <Navigate to="/" replace /> : <Login onLogin={onLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onSignOut={onSignOut} onUpdateUser={handleUpdateUser} errorMessage={errorMessage}/>
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
