import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checkedCheckbox, changeCheckbox }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          checked={checkedCheckbox || false}
          onChange={changeCheckbox}
        />
        <span className="filter-checkbox__switch"></span>
      </label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
