import React from 'react';
import { Link, useLocation } from 'react-router-dom';






const Nav: React.FC = () => {
  const { pathname: currentPage } = useLocation();

  return (
    <div>
      <h2>Nav</h2> {}
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link 
              to="/" 
              className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/About" 
              className={currentPage === '/About' ? 'nav-link active' : 'nav-link'}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/Blog" 
              className={currentPage === '/Blog' ? 'nav-link active' : 'nav-link'}
            >
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/Contact" 
              className={currentPage === '/Contact' ? 'nav-link active' : 'nav-link'}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
