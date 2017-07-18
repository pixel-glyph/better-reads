import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="app-logo">
      <h1><Link to="/">BetterReads</Link></h1>
    </div>
  )
};

export default Logo;
