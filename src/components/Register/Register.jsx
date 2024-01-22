import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({ onRegister, errorMessage, setErrorMessage, isDisabled }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  React.useEffect(() => {
    setErrorMessage('');
  }, [navigate]);

  return (
    <main className="register">
      <Logo />
      <div className="register__container">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="register__form"
          autoComplete="off"
          id="register_form-edit"
          noValidate
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="register__label">
            Имя
          </label>
          <input
            type="text"
            className={`register__input ${errors?.name && 'register__input_type_error'}`}
            name="name"
            id="name"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <div className="register__input-error-container">
            {errors?.name && <p className="register__input-error">{errors?.name}</p>}
          </div>

          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            type="email"
            className={`register__input ${errors?.email && 'register__input_type_error'}`}
            name="email"
            id="email"
            pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$"
            placeholder="Ваш e-mail"
            required
            value={values.email || ''}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <div className="register__input-error-container">
            {errors?.email && <p className="register__input-error">{errors?.email}</p>}
          </div>
          <label htmlFor="password" className="register__label">
            Пароль
          </label>
          <input
            type="password"
            className={`register__input ${errors?.password && 'register__input_type_error'}`}
            name="password"
            id="password"
            placeholder="Ваш пароль"
            required
            value={values.password || ''}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <div className="register__input-error-container">
            {errors?.password && <p className="register__input-error">{errors?.password}</p>}
          </div>
          <button
            type="submit"
            className="register__submit-button button"
            id="register-submit-button"
            disabled={!isValid || isDisabled}
          >
            Зарегистрироваться
          </button>
        </form>
        {errorMessage &&
          <div className='register__api-error-container'>
            <p className="register__api-error">{errorMessage}</p>
          </div>
        }
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?&nbsp;</p>
          <Link to="/signin" className="register__signin-link link">
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Register;
