import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { loginUser } from '../api'; 
import { useNavigate } from 'react-router-dom';
import "../styles/LoginForm.css";

export default function LoginForm() {
  const signIn = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = await loginUser(email, password); 
      if (token) {
        signIn({
          token: token, 
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {email}, 
        });
        navigate("/home");
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className= "login-form">
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
