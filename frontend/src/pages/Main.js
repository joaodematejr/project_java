import React, { useState } from 'react';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";

import "./Main.css";
import api from "../services/api";
// import { Container } from './styles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 30px;
`;

export default function Main({ }) {
  //STATES LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  //STATES LISTA PESSOAS
  const [people, setPeople] = useState([]);
  //STATES CADASTRO PESSOA
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [naturalness, setNaturalness] = useState("");
  const [nationality, setNationality] = useState("");
  const [cpf, setCpf] = useState("");


  //FUNÇÃO PARA CHAMADA DA API
  async function handleSubmit(e) {
    setLoading(true)

    e.preventDefault();

    await api.get('/api/people/', {
      auth: { username, password }
    }).then(function (response) {
      setIsLogout(true);
      setPeople(response.data.data);
    }).catch(function (error) {
      setLoading(false);
      //VALIDAR RETORNO DO ERRO DO BACKEND
      if (!error.status) {
        if (error) {
          alert('Aviso !!! Problema com API OU suas credenciais não estão corretas;')
        } else {
          if (error.response.status === 401) {
            alert('Aviso !!! Suas credenciais não estão corretas;')
          } else {
            alert(error.response)
          }
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
          color={"#1B5E20"}
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

  //RENDERIZAR COMPONENTE DE LOGIN
  function renderFormLogin() {
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <input
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
    )
  }

  //RENDERIZAR COMPONENTE DE CADASTRO E LISTAGEM DE PESSOAS
  function renderScreenPeople() {
    return (
      <div id="app">
        <aside>
          <strong>Cadastro</strong>
          <form >
            <div className="input-block">
              <input
                placeholder="Nome"
                name="nome"
                required
                type="text"
                autoComplete="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <input
                placeholder="CPF"
                name="cpf"
                required
                type="number"
                autoComplete="cpf"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
            </div>

            <div className="input-block">
              <input
                placeholder="Gênero"
                name="sex"
                required
                type="text"
                autoComplete="sex"
                value={sex}
                onChange={e => setSex(e.target.value)}
              />
            </div>

            <div className="input-block">
              <input
                placeholder="Email"
                name="email"
                required
                type="text"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="input-block">
              <input
                placeholder="Data de Nascimento"
                name="birthDate"
                required
                type="text"
                autoComplete="birthDate"
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
              />
            </div>

            <div className="input-block">
              <input
                placeholder="Naturalidade"
                name="naturalness"
                required
                type="text"
                autoComplete="naturalness"
                value={naturalness}
                onChange={e => setNaturalness(e.target.value)}
              />
            </div>

            <div className="input-block">
              <input
                placeholder="Nacionalidade"
                name="nationality"
                required
                type="text"
                autoComplete="nationality"
                value={nationality}
                onChange={e => setNationality(e.target.value)}
              />
            </div>

            <button type="submit">
              Savar
            </button>
          </form>
        </aside>
        <main>
          <ul>
            <li className="dev-item">
              <header>
                <div className="user-info">
                  <strong>
                    João Dematé JR 1
                </strong>
                  <span>
                    Masculino {" "}
                  </span>
                  <span>
                    joaodematejr@gmail.com {" "}
                  </span>
                </div>
              </header>
              <p>
                blablablabla
            </p>
            </li>


            <li className="dev-item">
              <header>
                <div className="user-info">
                  <strong>
                    João Dematé JR 1
                </strong>
                  <span>
                    Masculino {" "}
                  </span>
                  <span>
                    joaodematejr@gmail.com {" "}
                  </span>
                </div>
              </header>
              <p>
                blablablabla
            </p>
            </li>

            <li className="dev-item">
              <header>
                <div className="user-info">
                  <strong>
                    João Dematé JR 1
                </strong>
                  <span>
                    Masculino {" "}
                  </span>
                  <span>
                    joaodematejr@gmail.com {" "}
                  </span>
                </div>
              </header>
              <p>
                blablablabla
            </p>
            </li>

            <li className="dev-item">
              <header>
                <div className="user-info">
                  <strong>
                    João Dematé JR 1
                </strong>
                  <span>
                    Masculino {" "}
                  </span>
                  <span>
                    joaodematejr@gmail.com {" "}
                  </span>
                </div>
              </header>
              <p>
                blablablabla
            </p>
            </li>
          </ul>
        </main>
      </div>
    )
  }

  return (
    <>
      {isLogout === true ? renderScreenPeople() : renderFormLogin()}
    </>
  );
}
