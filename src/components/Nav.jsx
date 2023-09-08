
import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import defaultProfile from '../../public/images/profile .png'
// import { FaBeer } from 'react-icons/fa';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const handleLogout = () => {

    localStorage?.removeItem('user')
    window.location.reload()
  };

  const createTeamArray = () => {
    // Check if the 'teams' array doesn't exist in localStorage, then create it
    if (!localStorage.getItem('teams')) {
      localStorage.setItem('teams', JSON.stringify([]));
    }
  };
  const data = localStorage.getItem('user')
  const profileImage = JSON.parse(localStorage?.getItem('user Info')) || [];

  return (
    <div className='navbar-container'>
      <nav className="navbar">
        <div className="nav-logo"><Link to='/'>Logo</Link></div>
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to='/'>Home</Link>
            </li>
            {
              !data && (
                <li className="nav-item">
                  <Link to='/register'>Register</Link>
                </li>

              )
            }
            {
              !data && (
                <li className="nav-item">
                  <Link to='/login'>login</Link>
                </li>

              )
            }
            {
              data && (
                <li className="nav-item">
                  <Link to='/tasks'>Task</Link>
                </li>

              )
            }
            {data && (
              <li className="nav-item">
                <Link to='/teams' onClick={createTeamArray}>
                  Teams
                </Link>
              </li>
            )}
            {data && (
              <li className="nav-item">
                <Link to='/task-dashboard' >
                  Dashboard
                </Link>
              </li>
            )}
            {
              data &&
              <li className="nav-item">
                <Link to='/profile'>
                  <img src={profileImage?.length > 0 ? profileImage[0]?.profilePicture : defaultProfile}
                    alt='the profile' className='profile-img' />
                </Link>
              </li>
            }
            {
              data &&
              <li className="nav-item">
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
              </li>
            }

          </ul>
        </div>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`} />
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`} />
          <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
