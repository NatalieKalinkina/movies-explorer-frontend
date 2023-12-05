import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [formValue, setFormValue] = React.useState({
    name: 'Наталья',
    email: 'pochta@yandex.ru'
  });

  const [userName, setUserName] = React.useState('Наталья');

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setUserName(formValue.name);
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title"> Привет, {userName}!</h2>
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
              value={formValue.name}
              onChange={handleChange}
              required
            />
          </fieldset>

          <fieldset className="profile__fieldset">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              type="email"
              className="profile__input profile__input_type_email"
              name="email"
              id="email"
              value={formValue.email}
              onChange={handleChange}
              required
            />
          </fieldset>

          <button
            type="submit"
            className="profile__button profile__submit-button link"
            id="profile-submit-button"
          >
            Редактировать
          </button>
          <Link to="/" className="profile__button profile__sign-out-button link">
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Profile;
