import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from '../../providers/auth';
import axios from 'axios';

function Login() {
  const auth = useAuth()
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username, password }
    axios
      .post('http://apialfa.apoint.uz/v1/hr/user/sign-in?include=token', data)
      .then(res => {
        if (res.data?.token) {
          auth.login(res?.data?.token?.token)
          navigate('/');
        }
      })
      .catch((error) => console.error(error))
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">Kirish</button>
      </form>
    </div>
  );
}

export default Login;
