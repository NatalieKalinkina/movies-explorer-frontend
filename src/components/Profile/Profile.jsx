import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Profile.css';
import '../Login/Login.css';

function Profile({ onSignOut, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [previousName, setPreviousName] = React.useState(currentUser.name);
  const [previousEmail, setPreviousEmail] = React.useState(currentUser.email);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
    setPreviousName(name);
    setPreviousEmail(email);
  }

  React.useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email });
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  React.useEffect(() => {
    if (values.name === previousName && values.email === previousEmail) {
      setIsValid(false);
    }
  }, [values.name, values.email]);

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title"> Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          autoComplete="off"
          id="profile_form-edit"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="profile__fieldset">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              type="text"
              className="profile__input profile__input_type_name"
              name="name"
              id="name"
              value={values.name || ''}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="30"
            />
          </fieldset>
          <div className="profile__input-error-container">
            {errors?.name && <p className="profile__input-error">{errors?.name}</p>}
          </div>
          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              type="email"
              className="profile__input profile__input_type_email"
              name="email"
              id="email"
              value={values.email || ''}
              onChange={handleChange}
              required
            />
          </fieldset>
          <div className="profile__input-error-container">
            {errors?.email && <p className="profile__input-error">{errors?.email}</p>}
          </div>
          <button
            type="submit"
            className="profile__button profile__submit-button link"
            id="profile-submit-button"
            disabled={!isValid}
          >
            Редактировать
          </button>
          <Link
            to="/"
            className="profile__button profile__sign-out-button link"
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </main>
  );
}

export default Profile;
