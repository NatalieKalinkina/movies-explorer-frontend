import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css';
import photo from '../../images/student.jpg';

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="main__section-title"> Студент </h2>
      <div className="student__container">
        <div className="student__text-column">
          <h3 className="student__name">Наталья</h3>
          <h4 className="student__job">Фронтенд-разработчица, 30 лет</h4>
          <p className="student__text">
            Живу в&nbsp;Тольятти, закончила Тольяттинскую академию управления. Воспитываю маленькую
            дочь и&nbsp;мини-пуделя. Научилась шить по&nbsp;роликам на&nbsp;YouTube, катаюсь
            на&nbsp;вейк-серфе. Хочу развиваться в&nbsp;разработке и&nbsp;приносить пользу заказчику
            и&nbsp;команде. Умею быстро и&nbsp;качественно осваивать новое и&nbsp;не&nbsp;боюсь
            сложностей.
          </p>
          <Link
            to="https://github.com/NatalieKalinkina"
            target="_blank"
            className="student__link link"
          >
            Github
          </Link>
        </div>
        <img className="student__photo" src={photo} alt="Фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;
