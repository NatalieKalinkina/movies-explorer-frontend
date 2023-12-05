import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title section-title"> О проекте </h2>
      <div className="about-project__info about-project__info-1">
        <p className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</p>
        <p className="about-project__text">
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности
          и&nbsp;финальные доработки.
        </p>
      </div>
      <div className="about-project__info about-project__info-2">
        <p className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</p>
        <p className="about-project__text">
          У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было
          соблюдать,&nbsp; чтобы успешно защититься.
        </p>
      </div>
      <p className="about-project__timeline about-project__timeline-1">1 неделя</p>
      <p className="about-project__timeline about-project__timeline-2">4 недели</p>
      <p className="about-project__timeline-caption about-project__timeline-caption-1">Back-end</p>
      <p className="about-project__timeline-caption about-project__timeline-caption-2">Front-end</p>
    </section>
  );
}

export default AboutProject;
