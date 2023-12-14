import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Header.css';
import HeaderNavForUser from '../HeaderNavForUser/HeaderNavForUser';
import Logo from '../Logo/Logo';

function Header() {
  return (
    <header className="header">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Logo />
              <nav className="header__auth-nav">
                <Link to="signup" className="header__signup link">
                  Регистрация
                </Link>
                <Link to="signin" className="header__signin button">
                  Войти
                </Link>
              </nav>
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Logo />
              <HeaderNavForUser />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Logo />
              <HeaderNavForUser />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Logo />
              <HeaderNavForUser />
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
