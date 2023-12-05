import React from 'react';
import './NavTab.css';

function NavTab() {
  return (
    <div className="navtab">
      <a href="#project" className="navtab__item button">
        О проекте
      </a>
      <a href="#techs" className="navtab__item button">
        Технологии
      </a>
      <a href="#student" className="navtab__item button">
        Студент
      </a>
    </div>
  );
}

export default NavTab;
