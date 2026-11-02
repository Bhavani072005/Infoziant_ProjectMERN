import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import useLoginBackNavigation from '../../hooks/useLoginBackNavigation';
import { apiUrl } from '../../api';
import './PatientLogin.css';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const PatientLogin = () => {
  useLoginBackNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        console.error('Google login error:', err);
        setError('Google sign-in is unavailable. Check that VITE_API_URL is set on Vercel and the Render backend is running.');
      } finally {
        setIsSubmitting(false);
      }
    };

    const initializeGoogle = () => {
      if (!window.google || !window.google.accounts) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });

      window.google.accounts.id.renderButton(document.getElementById('google-signin-button'), {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'left'
      });
    };

    const timer = setInterval(() => {
      if (window.google && window.google.accounts) {
        initializeGoogle();
        clearInterval(timer);
      }
    }, 200);

    return () => clearInterval(timer);
  }, [GOOGLE_CLIENT_ID, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl('/api/patient/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('userPhone', data.phone);
        navigate('/patient/home');
      } else {
        setError(data.message || 'Login failed. Check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to the login service. Please try again when the server is available.');
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
          <p>Patient Portal</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/patient/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? <LoadingIndicator label="Signing in..." /> : 'Sign In'}
          </button>

          {GOOGLE_CLIENT_ID && (
            <div className="google-signin-wrap">
              <div className="google-divider"><span>or continue with</span></div>
              <div id="google-signin-button" aria-label="Continue with Google" />
            </div>
          )}
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/patient/register">Register as Patient</a></p>
          <button type="button" className="login-home-button" onClick={() => navigate('/', { replace: true })}>
            ← Back to landing page
          </button>
          <div className="role-buttons">
            <button className={`role-btn ${location.pathname === '/patient/login' || location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/patient/login')}>
              Patient
            </button>
            <button className={`role-btn ${location.pathname === '/doctor/login' ? 'active' : ''}`} onClick={() => navigate('/doctor/login')}>
              Doctor
            </button>
            <button className={`role-btn ${location.pathname === '/admin/login' ? 'active' : ''}`} onClick={() => navigate('/admin/login')}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
