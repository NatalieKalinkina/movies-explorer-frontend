import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title"> Портфолио </h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link
            to="https://nataliekalinkina.github.io/how-to-learn/"
            target="_blank"
            className="portfolio__link link"
          >
            <p className="portfolio__project-name"> Статичный сайт </p>
            <p className="portfolio__icon">↗</p>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link
            to="https://nataliekalinkina.github.io/russian-travel/"
            target="_blank"
            className="portfolio__link link"
          >
            <p className="portfolio__project-name"> Адаптивный сайт </p>
            <p className="portfolio__icon">↗</p>
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link
            to="https://nk.mesto.nomoredomainsmonster.ru/"
            target="_blank"
            className="portfolio__link link"
          >
            <p className="portfolio__project-name"> Одностраничное приложение </p>
            <p className="portfolio__icon">↗</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
