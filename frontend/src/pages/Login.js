import React, { useState } from 'react';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import "./Login.css";
import api from "../services/api";
// import { Container } from './styles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 30px;
`;

export default function Login({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //FUNÇÃO PARA CHAMADA DA API
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();

    await api.get('/api/people/', {
      auth: { username, password }
    }).then(function (response) {
      // handle success
      console.log(response);
    }).catch(function (error) {
      setLoading(false);
      //VALIDAR RETORNO DO ERRO DO BACKEND
      if (!error.status) {
        if (error.response.status === 401) {
          alert('Aviso !!! Credenciais ruins.')
        } else {
          alert(error.response)
        }
      }
    }).then(function () {
      setLoading(false)
    });

  }

  function renderButton() {
    if (loading === true) {
      return (
        <BounceLoader
          css={override}
          size={30}
          color={"#123abc"}
          loading={true}
        />
      )
    } else {
      return (
        <button
          style={{ marginTop: 25 }}
          type="submit"
        >
          Logar
        </button>
      )
    }
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
          value={username}
          onChange={e => setUsername(e.target.value)}
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
        {renderButton()}
      </form>
    </div>
  );
}
