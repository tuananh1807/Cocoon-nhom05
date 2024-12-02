import './SignupPageStyles.css';
import Video from "./video/video.mp4";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { signup } from '../../services/UserSevices';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    password: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    try {
      await signup(formData);
      alert('Account registered.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="containers">
      <div className="container">
        <div className="left">
          <video className="background-video" src={Video} autoPlay loop muted />
          <div className="text-overlay">
            <div className="headline">
              <span className="line1">Create And Sell</span>
              <span className="line2">Extraordinary</span>
              <span className="line3">Products</span>
            </div>
            <p>Adopt the peace of nature!</p>
          </div>
          <div className="footer-login">
            <p>Have an account?</p>
            <Link to="/login" className="login-button">Login</Link>
          </div>
        </div>
        <div className="right">
          <h2>Let Us Know You!</h2>
          <form onSubmit={handleRegisterClick}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" placeholder="Enter Email" required style={{ height: '40px' }} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input type="text" id="name" placeholder="Enter Name" required style={{ height: '40px' }} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <Input type="text" id="phone" placeholder="Enter Phone" required style={{ height: '40px' }} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Input type="text" id="address" placeholder="Enter Address" required style={{ height: '40px' }} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input.Password id="password" placeholder="Enter Password" required style={{ height: '40px' }} onChange={handleChange} />
            </div>
            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
