import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="section-title"> Технологии </h2>
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__subtitle">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили
          в&nbsp;дипломном проекте.
        </p>
        <ul className="navtab techs__list">
          <li className="navtab__item techs__list-item">HTML</li>
          <li className="navtab__item techs__list-item">CSS</li>
          <li className="navtab__item techs__list-item">JS</li>
          <li className="navtab__item techs__list-item">React</li>
          <li className="navtab__item techs__list-item">Git</li>
          <li className="navtab__item techs__list-item">Express.js</li>
          <li className="navtab__item techs__list-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
