import React, { useState } from 'react';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MaskedInput from 'react-text-mask'
import Moment from 'moment/min/moment-with-locales';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import api from "../services/api";
import "./Main.css";


// import { Container } from './styles';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 30px;
`;

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#1B5E20',
    },
  },
});


export default function Main() {
  //STATES LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //VALIDAR SE TA LOGADO
  const [isLogout, setIsLogout] = useState(false);
  //STATES LISTA PESSOAS
  const [peoples, setPeople] = useState([]);
  //STATES CADASTRO PESSOA
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [sexPerson, setSexPerson] = useState(false);
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [naturalness, setNaturalness] = useState("");
  const [nationality, setNationality] = useState("");
  const [cpf, setCpf] = useState("");
  //MENSAGENS DE CONFIRMAÇÃO 
  const [modalDelete, setModalDelete] = useState(false);

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

  //CADASTRAR PESSOAS NO SISTEMA

  async function handleRegister(e) {
    e.preventDefault();
    Moment.locale('pt-br');
    //VALIDAR SE JÁ POSSUI UM CPF
    let validate = false

    if (peoples.length !== 0) {
      //VALIDAR SE JÁ POSSUI CPF CADASTRADO SISTEMA
      peoples.forEach(people => {
        if (people.cpf === cpf) {
          alert('Aviso !!!, Já Possui um cadastro com esse CPF.')
        } else {
          validate = true
        }
      });
    } else {
      validate = true
    }

    //ENVIAR OS DADOS
    if (validate === true) {
      await api.post('/api/people/',
        {
          name,
          sex,
          email,
          naturalness,
          nationality,
          cpf,
          birthDate: Moment(birthDate).format('LL'),
          registrationDate: Moment(new Date()).format('llll')
        }, {
        auth: {
          username,
          password
        }
      }).then(function (response) {
        setPeople([...peoples, response.data.data]);
        setName('')
        setSex('')
        setSexPerson(false)
        setEmail('')
        setBirthDate(new Date())
        setNaturalness('')
        setNationality('')
        setCpf('')
      }).catch(function (error) {
        if (!error.response) {
          alert('Aviso !!! Problema com API');
        } else {
          if (error.response.status === 400) {
            error.response.data.errs.forEach(erro => {
              alert(erro)
            });
          }
        }
      });
    }
  }

  async function handleDelete(idPeople) {
    await api.delete(`/api/people/${idPeople}`, {
      auth: { username, password }
    }).then(function (response) {
      setModalDelete(false);
      handleSubmit()
    }).catch(function (error) {
      console.log(error.response)
    })
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
          type="submit">
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

  function inputSex(e) {
    if (e.target.value === 'Personalizado') {
      setSexPerson(true)
    } else {
      setSex(e.target.value)
    }
  }

  //RENDERIZAR COMPONENTE DE CADASTRO E LISTAGEM DE PESSOAS
  function renderScreenPeople() {
    return (
      <div id="app">
        <aside>
          <strong>Cadastro</strong>
          <form onSubmit={handleRegister}>
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
              <MaskedInput
                placeholder="CPF"
                name="cpf"
                required
                value={cpf}
                onChange={e => setCpf(e.target.value)}
                mask={[/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              />
            </div>

            <div className="input-block">
              {sexPerson === true ? (
                <>
                  <select
                    placeholder="Gênero"
                    name="sex"
                    type="text"
                    autoComplete="sex"
                    value={sex}
                    onChange={inputSex}>
                    <option value="">Gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Personalizado">Personalizado</option>
                  </select>
                  <input
                    placeholder="Gênero"
                    name="sex"
                    type="text"
                    autoComplete="sex"
                    value={sex}
                    onChange={e => setSex(e.target.value)}
                  />
                </>
              ) :
                (
                  <select
                    placeholder="Gênero"
                    name="sex"
                    type="text"
                    autoComplete="sex"
                    value={sex}
                    onChange={inputSex}
                  >
                    <option value="">Gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Personalizado">Personalizado</option>
                  </select>
                )}

            </div>

            <div className="input-block">
              <input
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR} >
                  <KeyboardDatePicker
                    animateYearScrolling
                    orientation="portrait"
                    autoOk
                    required
                    color="secondary"
                    style={{ width: '100%', marginTop: 20 }}
                    variant="inline"
                    inputVariant="outlined"
                    id="birthDate"
                    placeholder="Data de Nascimento"
                    format="dd/MM/yyyy"
                    value={birthDate}
                    onChange={date => setBirthDate(date)}
                    InputAdornmentProps={{ position: "start" }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </ThemeProvider>

            </div>

            <div className="input-block">
              <input
                placeholder="Naturalidade"
                name="naturalness"
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
                type="text"
                autoComplete="nationality"
                value={nationality}
                onChange={e => setNationality(e.target.value)}
              />
            </div>

            <button type="submit">
              Salvar
            </button>
          </form>
        </aside>
        <main>
          <ul>
            {peoples.map(people => (
              <li className="dev-item" key={people.id}>
                <header>
                  <div className="user-info">
                    <strong>
                      {people.name}
                    </strong>
                    <span>
                      {people.email}
                    </span>
                  </div>
                </header>
                <p>
                  <strong>
                    Gênero:
                  </strong>
                  {people.sex}
                </p>
                <p>
                  <strong>
                    Data de Nascimento:
                  </strong>
                  {people.birthDate}
                </p>
                <p>
                  <strong>
                    Naturalidade:
                  </strong>
                  {people.naturalness}
                </p>
                <p>
                  <strong>
                    Nacionalidade:
                  </strong>
                  {people.nationality}
                </p>
                <p>
                  <strong>
                    CPF:
                  </strong>
                  {people.cpf}
                </p>
                <p>
                  <strong>
                    Cadastro realizado em:
                  </strong>
                  {people.registrationDate}
                </p>
                <p>
                  <strong>
                    Atualizado pela ultima vez em:
                  </strong>
                  {people.updateData}
                </p>
                <Button variant="contained" color="secondary" onClick={() => setModalDelete(true)}>
                  Deletar
                </Button>
                <Dialog
                  open={modalDelete}
                  onClose={() => setModalDelete(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title">{"Aviso !!! Você tem Certeza que desja excluir esse Registro"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Não será possivel recuperar o registro apos a exclusão.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setModalDelete(false)} color="primary">
                      Não, Desejo manter o usuario
                    </Button>
                    <Button onClick={() => handleDelete(people.id)} color="primary" autoFocus>
                      Sim, Desejo Excluir mesmo Assim
                    </Button>
                  </DialogActions>
                </Dialog>
              </li>
            ))}
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
