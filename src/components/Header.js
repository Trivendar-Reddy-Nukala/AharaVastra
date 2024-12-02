import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import name from '../assessts/appname.png'; // Correct the path if needed

function Header() {
  const [userType, setUserType] = useState(localStorage.getItem('userType')); // "donor", "charity", or null
  const navigate = useNavigate();

  // Update state when localStorage changes
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage items
    setUserType(null); // Reset state
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <img src={name} width="180rem" alt="App Name" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link mx-3"><span className="text-secondary-emphasis">Home</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link mx-3"><span className="text-secondary-emphasis">About</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/donationform" className="nav-link mx-3"><span className="text-secondary-emphasis">Want to Donate</span></Link>
            </li>

            {/* Donor Login/Logout */}
            <li className="nav-item">
              {userType === 'charity' ? (
                <span className="nav-link mx-3 text-muted disabled">Donor Login</span>
              ) : userType === 'donor' ? (
                <button onClick={handleLogout} className="btn btn-danger mx-3">Donor Logout</button>
              ) : (
                <Link to="/donarlogin" className="nav-link mx-3"><span className="text-secondary-emphasis">Donor Login</span></Link>
              )}
            </li>

            {/* Charity Login/Logout */}
            <li className="nav-item">
              {userType === 'donor' ? (
                <span className="nav-link mx-3 text-muted disabled">Charity Login</span>
              ) : userType === 'charity' ? (
                <>
                  <Link to="/donation-data" className="nav-link mx-3"><span className="text-secondary-emphasis">View Donations</span></Link>
                  <button onClick={handleLogout} className="btn btn-danger mx-3">Charity Logout</button>
                </>
              ) : (
                <Link to="/charitylogin" className="nav-link mx-3"><span className="text-secondary-emphasis">Charity Login</span></Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
