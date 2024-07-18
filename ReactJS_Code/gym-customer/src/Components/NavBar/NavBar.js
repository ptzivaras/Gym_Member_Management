import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function Navigation() {
  return (
    <div className="navbar">
      <NavLink to="/" exact className='nav-link' activeClassName='active'>Customers</NavLink>
      <NavLink to="/classes" className='nav-link' activeClassName='active'>Classes</NavLink>
      <NavLink to="/trainers" className='nav-link' activeClassName='active'>Trainers</NavLink>
      <NavLink to="/price" className='nav-link' activeClassName='active'>Price</NavLink>
      <NavLink to="/about" className='nav-link' activeClassName='active'>Dashboard</NavLink>
    </div>
  );
}
