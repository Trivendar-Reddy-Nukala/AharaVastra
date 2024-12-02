import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import emailjs from '@emailjs/browser';

emailjs.init("UWBOOnHLge52NnA8l");

async function Sendmail(formData) {
  try {
    const params = {
      name: formData.name,
      email: formData.email,
      subject: formData.description,
      message: formData.description,
    };

    console.log("Sending email with params:", params);

    const response = await emailjs.send("service_l4lujpc", "template_rkguxg5", params);

    console.log("Email sent successfully:", response.status, response.text);
    alert("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    alert(`Error sending email: ${error.text || "Unknown error"}`);
  }
}

function Donationform() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    description: '',
    contactNumber: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Send food donation data without validation
      const foodResponse = await axios.post('http://localhost:5000/api/food/addfood', formData);

      // Send donor information to increment the donor count (optional)
      await axios.post('http://localhost:5000/api/donors/adddonor', { donationAmount: 100 }); // Example donation amount

      // Update success message
      setSuccess("🎉 Thank you for your donation! 🙏 Your generosity is greatly appreciated! 🎉");

      // Send email notification
      await Sendmail(formData);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <div className="w-75 container my-5 py-5">
        {/* Notification - Success or Error Message */}
        {error && <div className="alert alert-danger my-4">{error}</div>}
        {success && <div className="alert alert-success my-4">{success}</div>}

        <h1 className="my-4">Donation Form</h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="description" className="form-label">Description of Food</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="contactNumber" className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                required
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check Terms and Conditions
              </label>
            </div>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">Donate</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Donationform;
