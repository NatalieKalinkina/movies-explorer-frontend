import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title main__section-title"> О проекте </h2>
      <div className="about-project__info">
        <div className="about-project__block">
          <p className="about-project__subtitle">Дипломный проект включал&nbsp; 5 этапов</p>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__block">
          <p className="about-project__subtitle">На&nbsp;выполнение диплома ушло&nbsp; 5 недель</p>
          <p className="about-project__text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было
            соблюдать,&nbsp; чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline-container">
        <p className="about-project__timeline about-project__timeline-1">1 неделя</p>
        <p className="about-project__timeline">4 недели</p>
        <p className="about-project__timeline-caption">Back-end</p>
        <p className="about-project__timeline-caption">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
