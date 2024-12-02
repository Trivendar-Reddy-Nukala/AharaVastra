import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Donarregistration() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors('');
    setSuccessMessage('');

    const userData = {
      name,
      address,
      email,
      password,
      description,
      contact
    };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/createuser', userData);
      
      // Show success message and navigate after a delay
      setSuccessMessage('Registration successful! You will be redirected to the login page.');
      setTimeout(() => {
        navigate('/donarlogin');
      }, 2000); // 2-second delay before redirect

    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setErrors(error.response.data.error || 'Registration failed');
      } else {
        setErrors('Something went wrong, please try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-75 container my-5 py-5">
        <h1 className="my-4">Donar Register</h1>

        {/* Show success message if registration was successful */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* Show error message if any */}
        {errors && <div className="alert alert-danger">{errors}</div>}

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="inputName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputDescription" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputContact" className="form-label">Contact Number</label>
            <input
              type="number"
              className="form-control"
              id="inputContact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                Check Terms and Conditions
              </label>
            </div>
          </div>

          <span className="text-center">
            If you have registered, please do
            <Link to="/donarlogin" className="nav-link mx-3 text-primary text-decoration-underline">
              Login Here
            </Link>
          </span>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Donarregistration;
