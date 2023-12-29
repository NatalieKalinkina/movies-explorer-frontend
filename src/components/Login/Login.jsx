import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { mainApi } from '../../utils/MainApi';
import Logo from '../Logo/Logo';
import './Login.css';

function Login({ onLogin, errorMessage, setErrorMessage }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    mainApi
      .authorize(values.email, values.password)
      .then(data => {
        if (data.token) {
          onLogin(values.email, values.password);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setErrorMessage('Вы ввели неправильный логин или пароль.');
        } else if (err === 'Ошибка: 500') {
          setErrorMessage('На сервере произошла ошибка.');
        } else {
          setErrorMessage(err)
        }
      });
  }

  return (
    <main className="login">
      <Logo />
      <div className="login__container">
        <h2 className="login__title">Рады видеть!</h2>
        <form
          className="login__form"
          autoComplete="off"
          id="login_form-edit"
          noValidate
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            type="email"
            className={`login__input ${errors?.email && 'login__input_type_error'}`}
            name="email"
            id="email"
            pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$"
            required
            placeholder="Ваш e-mail"
            value={values.email || ''}
            onChange={handleChange}
          />
          <div className="login__input-error-container">
            {errors?.email && <p className="login__input-error">{errors?.email}</p>}
          </div>
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            type="password"
            className={`login__input ${errors?.password && 'login__input_type_error'}`}
            name="password"
            required
            id="password"
            placeholder="Ваш пароль"
            value={values.password || ''}
            onChange={handleChange}
          />
          <div className="login__input-error-container">
            {errors?.password && <p className="login__input-error">{errors?.password}</p>}
          </div>
          <button
            type="submit"
            className="login__submit-button button"
            id="login-submit-button"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        {errorMessage &&
          <div className='login__api-error-container'>
            <p className="login__api-error">{errorMessage}</p>
          </div>
        }
        <div className="login__signup">
          <p className="login__signup-text">Ещё не зарегистрированы?&nbsp;</p>
          <Link to="/signup" className="login__signup-link link">
            Регистрация
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
