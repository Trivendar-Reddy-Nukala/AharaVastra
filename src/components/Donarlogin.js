import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Donarlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userData = { email, password };
  
      // Make the POST request to backend
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
  
      // Save user data to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', 'donor');
      localStorage.setItem('userName', response.data.name); // Example: Name from backend
      localStorage.setItem('userEmail', response.data.email); // Example: Email from backend
  
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrors(error.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="w-75 container my-5 py-5">
        <h1 className="my-4">Donor Login</h1>

        {errors && <div className="alert alert-danger">{errors}</div>}

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <span className="text-center">
            If you haven't registered yet, please do
            <span><Link to="/donarregistration" className="nav-link mx-3 text-primary text-decoration-underline"> Register Here</Link></span>
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

export default Donarlogin;
