import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Logo from '../Logo/Logo';
import './Register.css';

function Register() {
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
    <section className="register">
      <Logo />
      <div className="register__container">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="register__form"
          autoComplete="off"
          id="register_form-edit"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
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
            {...register('name', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 2,
                message: 'Имя должно содержать от 2 до 30 символов'
              },
              maxLength: {
                value: 30,
                message: 'Имя должно содержать от 2 до 30 символов'
              }
            })}
          />
          <div className="register__input-error-container">
            {errors?.name && (
              <p class="register__input-error">
                {errors?.name?.message || 'Что-то пошло не так...'}
              </p>
            )}
          </div>

          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            type="email"
            className={`register__input ${errors?.email && 'register__input_type_error'}`}
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
          <div className="register__input-error-container">
            {errors?.email && (
              <p class="register__input-error">
                {errors?.email?.message || 'Что-то пошло не так...'}
              </p>
            )}
          </div>
          <label htmlFor="passord" className="register__label">
            Пароль
          </label>
          <input
            type="password"
            className={`register__input ${errors?.password && 'register__input_type_error'}`}
            name="password"
            id="password"
            placeholder="Ваш пароль"
            {...register('password', {
              required: 'Поле обязательно к заполнению'
            })}
          />
          <div className="register__input-error-container">
            {errors?.password && (
              <p class="register__input-error">
                {errors?.password?.message || 'Что-то пошло не так...'}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="register__submit-button button"
            id="register-submit-button"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?&nbsp;</p>
          <Link to="/signin" className="register__signin-link link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
