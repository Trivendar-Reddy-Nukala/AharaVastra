import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function Charityregistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/charity/addcharity', {
        name, email, password, address, description, contactNumber
      });
      setSuccessMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/charitylogin'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="w-75 container my-5 py-5">
        <h1 className="my-4">Charity Register</h1>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Description</label>
            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Number</label>
            <input type="text" className="form-control" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
        <span className="text-center">Already registered? 
          <Link to="/charitylogin" className="nav-link mx-3 text-primary text-decoration-underline">Login Here</Link>
        </span>
      </div>
      <Footer />
    </>
  );
}

export default Charityregistration;
