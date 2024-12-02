import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function Charitylogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/charity/login', { email, password });
      setSuccessMessage('Login successful! Redirecting to donation data...');
      localStorage.setItem('token', response.data.authToken); // Store the auth token
      localStorage.setItem('userType', 'charity'); // Store user type as 'charity'
  
      // Redirect to donation data page
      setTimeout(() => navigate('/donationdata'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Invalid credentials. Please try again.');
    }
  };
  

  return (
    <>
      <Header />
      <div className="w-75 container my-5 py-5">
        <h1 className="my-4">Charity Login</h1>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <span className="text-center">if you haven't registered yet , please do
            <span>

              <Link to="/charityregistration" className="nav-link mx-3 text-primary text-decoration-underline">Register Here</Link>
            </span>
          </span>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>

      </div>
      <Footer />
    </>
  );
}

export default Charitylogin;
