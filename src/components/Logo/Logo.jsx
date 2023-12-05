import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to="/">
      <img src={logo} className="logo button" alt="логотип проекта" />
    </Link>
  );
}

export default Logo;
