import React, { useState } from 'react';
import axios from 'axios';

import "./Login.css";
// import { Container } from './styles';

export default function Login({ history }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();


    const res = await axios.get('http://192.168.2.153:8080/api/people/', {
      // Axios looks for the `auth` option, and, if it is set, formats a
      // basic auth header for you automatically.
      auth: {
        username: 'user',
        password: 'b1c369c9-3b16-4a66-98f3-28b7f7abe324'
      }
    });


    console.log(res.status)

  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginTop: 150 }}
          placeholder="Digite Login da API"
          name="Login"
          required
          type="text"
          autoComplete="email"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <input
          placeholder="Digite Senha da API"
          name="password"
          type="password"
          autoComplete="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Logar</button>
      </form>
    </div>
  );
}
