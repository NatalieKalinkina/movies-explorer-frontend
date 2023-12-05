import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './HeaderNavForUser.css';

function HeaderNavForUser() {
  return (
    <>
      <nav className="header__pages-nav">
        <NavLink to="/movies" className="header__movies link">
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className="header__saved-movies link">
          Сохранённые фильмы
        </NavLink>
      </nav>
      <Link to="/profile" className="header__profile button">
        Аккаунт
      </Link>
    </>
  );
}

export default HeaderNavForUser;
