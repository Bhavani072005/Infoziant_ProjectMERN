import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import { apiUrl } from '../../api';
import './PatientLogin.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const PatientRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { name, email, password, phone } = formData;

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const scriptId = 'google-one-tap-script';
    const existing = document.getElementById(scriptId);

    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const handleGoogleCredential = async (response) => {
      try {
        setError('');
        setIsSubmitting(true);

        const res = await fetch(apiUrl('/api/patient/google'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ credential: response.credential })
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Google sign-in failed.');
          return;
        }

        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('userPhone', data.phone);
        navigate('/patient/home');
      } catch (err) {
        console.error('Google signup error:', err);
        setError('Google sign-in is unavailable right now. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const initGoogle = () => {
      if (!window.google || !window.google.accounts) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });

      window.google.accounts.id.renderButton(document.getElementById('google-signup-button'), {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'left'
      });
    };

    const timer = setInterval(() => {
      if (window.google && window.google.accounts) {
        initGoogle();
        clearInterval(timer);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [GOOGLE_CLIENT_ID, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl('/api/patient/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('userPhone', data.phone);
        navigate('/patient/home');
      } else {
        setError(data.message || 'Registration failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Unable to connect to the registration service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>DocConnect</h1>
          <p>Patient Registration</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? <LoadingIndicator label="Creating account..." /> : 'Register'}
          </button>

          {GOOGLE_CLIENT_ID && (
            <div className="google-signin-wrap">
              <div className="google-divider"><span>or continue with</span></div>
              <div id="google-signup-button" aria-label="Continue with Google" />
            </div>
          )}
        </form>

        <div className="login-footer">
          <p>Already have an account? <a href="/patient/login">Login as Patient</a></p>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
