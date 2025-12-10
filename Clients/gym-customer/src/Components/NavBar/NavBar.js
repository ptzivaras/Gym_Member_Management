import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function Navigation() {
  return (
    <div className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Customers</NavLink>
      <NavLink to="/classes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Classes</NavLink>
      <NavLink to="/trainers" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Trainers</NavLink>
      <NavLink to="/price" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Price</NavLink>
      <NavLink to="/payment-history" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Payments</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
    </div>
  );
}
