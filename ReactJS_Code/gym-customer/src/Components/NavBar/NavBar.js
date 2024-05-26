import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default function Navigation() {
  return (
    <div className="navbar">
      <Link to="/" className='text-bold fs-5'>Customers</Link>
      <Link to="/classes" className='text-bold fs-5'>Classes</Link>
      <Link to="/trainers" className='text-bold fs-5'>Trainers</Link>
      <Link to="/price" className='text-bold fs-5'>Price</Link>
      <Link to="/about" className='text-bold fs-5'>About</Link>
    </div>
  );
}