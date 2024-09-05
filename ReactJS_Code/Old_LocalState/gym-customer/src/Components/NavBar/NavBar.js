import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function Navigation() {
  return (
    <div className="navbar">
      {/* 
       Warning: React does not recognize the `activeClassName` prop on a DOM element.
       If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `activeclassname` instead.
       If you accidentally passed it from a parent component, remove it from the DOM element. */}
      <NavLink to="/" exact className='nav-link' activeClassName='active'>Customers</NavLink>
      <NavLink to="/classes" className='nav-link' activeClassName='active'>Classes</NavLink>
      <NavLink to="/trainers" className='nav-link' activeClassName='active'>Trainers</NavLink>
      <NavLink to="/price" className='nav-link' activeClassName='active'>Price</NavLink>
      <NavLink to="/about" className='nav-link' activeClassName='active'>Dashboard</NavLink>
    </div>
  );
}
