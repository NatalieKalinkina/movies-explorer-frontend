import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
      <div className="footer__copyright">
        <p className="footer__year">&copy; 2023</p>
        <nav className="footer__nav">
          <Link to="https://practicum.yandex.ru/" target="_blank" className="footer__link link">
            Яндекс.Практикум
          </Link>
          <Link
            to="https://github.com/NatalieKalinkina"
            target="_blank"
            className="footer__link link"
          >
            Github
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
