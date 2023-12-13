import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HeaderNavForUser.css';

function HeaderNavForUser() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  return (
    <section className="header-for-user">
      <button
        type="button"
        className="header-for-user__burger-button"
        aria-label="меню"
        onClick={toggleMenu}
      ></button>
      <div className={`${isMenuOpen ? 'header-for-user__layout' : ''} `}></div>
      <nav
        className={`
       ${isMenuOpen ? 'header-for-user__burger-menu' : 'header-for-user__pages-nav'}`}
      >
        <button
          type="button"
          className="header-for-user__burger-close-button"
          aria-label="закрыть меню"
          onClick={toggleMenu}
        ></button>
        <NavLink to="/" className="header-for-user__menu-item header-for-user__main link">
          Главная
        </NavLink>
        <NavLink to="/movies" className="header-for-user__menu-item header-for-user__movies link">
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="header-for-user__menu-item header-for-user__saved-movies link"
        >
          Сохранённые фильмы
        </NavLink>
        <Link to="/profile" className="header-for-user__profile button">
          Аккаунт
        </Link>
      </nav>
    </section>
  );
}

export default HeaderNavForUser;
