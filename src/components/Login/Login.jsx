import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../Logo/Logo';
import './Login.css';

function Login() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = data => {
    console.log('данные отправлены');
    reset();
  };

  return (
    <section className="login">
      <Logo />
      <div className="login__container">
        <h2 className="login__title">Рады видеть!</h2>
        <form
          className="login__form"
          autoComplete="off"
          id="login_form-edit"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            type="email"
            className={`login__input ${errors?.email && 'login__input_type_error'}`}
            name="email"
            id="email"
            placeholder="Ваш e-mail"
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]/,
                message: 'Адрес электронной почты должен содержать символы "@" и "."'
              }
            })}
          />
          <div className="login__input-error-container">
            {errors?.email && (
              <p class="login__input-error">{errors?.email?.message || 'Что-то пошло не так...'}</p>
            )}
          </div>
          <label htmlFor="passord" className="login__label">
            Пароль
          </label>
          <input
            type="password"
            className={`login__input ${errors?.password && 'login__input_type_error'}`}
            name="password"
            id="password"
            placeholder="Ваш пароль"
            {...register('password', {
              required: 'Поле обязательно к заполнению'
            })}
          />
          <div className="login__input-error-container">
            {errors?.password && (
              <p class="login__input-error">
                {errors?.password?.message || 'Что-то пошло не так...'}
              </p>
            )}
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
        <div className="login__signin">
          <p className="login__signin-text">Ещё не зарегистрированы?&nbsp;</p>
          <Link to="/signup" className="login__signin-link link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
