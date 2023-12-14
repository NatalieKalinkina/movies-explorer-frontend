import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
      <button className="not-found__go-back link" onClick={goBack}>
        Назад
      </button>
    </main>
  );
}

export default PageNotFound;
