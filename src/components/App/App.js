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
// import ErrorToolTip from '../ErrorToolTip/ErrorToolTip';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [moviesForRender, setMoviesForRender] = React.useState(savedMovies);

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
          mainApi.getSavedMovies().then(data => {
            setSavedMovies(data.movies);
            setMoviesForRender(data.movies);
          });
        })
        .catch(err => console.error(err));
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
          console.log('Произошла ошибка при регистрации');
        }
      })
      .catch(err => {
        console.error('Ошибка запроса', err);
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
      })
      .catch(err => console.error(err));
  }

  function handleMovieSave(movie) {
    mainApi.saveMovie(movie).then(savedMovie => {
      setMoviesForRender([...savedMovies, savedMovie]);
      setSavedMovies([...savedMovies, savedMovie]);
    });
  }

  function handleMovieDelete(movie) {
    mainApi
      .deleteSavedMovie(movie._id)
      .then(() => {
        setMoviesForRender(state => state.filter(m => m._id !== movie._id));
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
                <Movies onMovieSave={handleMovieSave} savedMovies={savedMovies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  savedMovies={savedMovies}
                  moviesForRender={moviesForRender}
                  setMoviesForRender={setMoviesForRender}
                  onMovieDelete={handleMovieDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn === true ? <Navigate to="/" replace /> : <Register onRegister={onRegister} />
            }
          />
          <Route
            path="/signin"
            element={loggedIn === true ? <Navigate to="/" replace /> : <Login onLogin={onLogin} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile onSignOut={onSignOut} onUpdateUser={handleUpdateUser} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <ErrorToolTip /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
