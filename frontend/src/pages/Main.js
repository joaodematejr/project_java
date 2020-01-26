import React, { useState } from 'react';
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/core";
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MaskedInput from 'react-text-mask'
import Moment from 'moment/min/moment-with-locales';

import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function Main() {
  const classes = useStyles();
  //STATES LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //VALIDAR SE TA LOGADO
  const [isLogout, setIsLogout] = useState(false);
  //STATES LISTA PESSOAS
  const [peoples, setPeople] = useState([]);
  //STATES CADASTRO PESSOA
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [sexPerson, setSexPerson] = useState(false);
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [naturalness, setNaturalness] = useState("");
  const [nationality, setNationality] = useState("");
  const [cpf, setCpf] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  const [loadingSave, setLoadingSave] = useState(false);
  //MENSAGENS DE CONFIRMAÇÃO 
  const [modalDelete, setModalDelete] = useState(false);
  //ATUALIZANDO
  const [isUpdatePeople, setIsUpdatePeople] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);


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
    setLoadingSave(true)
    e.preventDefault();
    Moment.locale('pt-br');
    //VALIDAR SE JÁ POSSUI UM CPF
    let validate = false

    if (peoples.length !== 0) {
      //VALIDAR SE JÁ POSSUI CPF CADASTRADO SISTEMA
      peoples.forEach(people => {
        if (people.cpf === cpf) {
          alert('Aviso !!!, Já Possui um cadastro com esse CPF.')
          setLoadingSave(false)
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
          birthDate,
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
        setLoadingSave(false)
        alert('Aviso !!! Pessoa cadastrada com Sucesso !!!');
      }).catch(function (error) {
        setLoadingSave(false)
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

  //FUNÇÃO PARA DELETAR PESSOA
  async function handleDelete(idPeople) {
    await api.delete(`/api/people/${idPeople}`, {
      auth: { username, password }
    }).then(function (response) {
      setName('')
      setSex('')
      setSexPerson(false)
      setEmail('')
      setBirthDate(new Date())
      setNaturalness('')
      setNationality('')
      setCpf('')
      setModalDelete(false);
      updateListPeople()
    }).catch(function (error) {
      alert(error.response)
    })
  }

  //ATUALIZAÇÃO DA LISTA
  async function updateListPeople() {
    await api.get('/api/people/', {
      auth: { username, password }
    }).then(function (response) {
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

  //VALIDAR A ENTRADA DE TEXTO SEXO DA PESSOA
  function inputSex(e) {
    if (e.target.value === 'Personalizado') {
      setSexPerson(true)
    } else {
      setSex(e.target.value)
    }
  }

  //RENDERIZAR BOTAO DE SALVAR OU ACAO DE CARREGAR
  function renderButtonSave() {
    if (loadingSave === true) {
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
        <button type="submit">
          Salvar
        </button>
      )
    }
  }

  //FUNÇÃO ATUALIZAR CADASTRO PESSOA
  function handleEditPeople(people) {
    setIsUpdatePeople(true)
    setId(people.id)
    setName(people.name)
    setCpf(people.cpf)
    setSex(people.sex)
    setEmail(people.email)
    setBirthDate(people.birthDate)
    setNaturalness(people.naturalness)
    setNationality(people.nationality)
    setRegistrationDate(people.registrationDate)
  }

  //RENDER BOTAO ATUALIZAR PESSOA
  function renderButtonUpdate() {
    if (loadingUpdate === true) {
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
        <button type="submit">
          Atualizar
        </button>
      )
    }
  }

  //ATUALIZAR PESSOA
  async function handleUpdate(e) {
    setLoadingUpdate(true)
    e.preventDefault();
    Moment.locale('pt-br');
    await api.put(`/api/people/${id}`,
      {
        name,
        sex,
        email,
        naturalness,
        nationality,
        cpf,
        birthDate,
        registrationDate,
        updateData: Moment(new Date()).format('llll')
      }, {
      auth: {
        username,
        password
      }
    }).then(async function (response) {
      updateListPeople()
      setId('')
      setName('')
      setSex('')
      setSexPerson(false)
      setEmail('')
      setBirthDate(new Date())
      setNaturalness('')
      setNationality('')
      setCpf('')
      setLoadingUpdate(false)
      alert('Aviso !!! Pessoa Atualizada com Sucesso !!!');
      setIsUpdatePeople(false)
    }).catch(function (error) {
      setLoadingUpdate(false)
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



  //RENDERIZAR COMPONENTE DE CADASTRO E LISTAGEM DE PESSOAS
  function renderScreenPeople() {
    Moment.locale('pt-br');
    return (
      <div id="app">
        <aside>
          <strong>{isUpdatePeople === true ? 'Atualização' : 'Cadastro'}</strong>
          <form onSubmit={isUpdatePeople === true ? handleUpdate : handleRegister}>
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
            {isUpdatePeople === true ? renderButtonUpdate() : renderButtonSave()}
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
                  {Moment(people.birthDate).format('LL')}
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
                <div className={classes.root}>
                  <Fab color="secondary" aria-label="add" onClick={() => setModalDelete(true)}>
                    <Icon />
                  </Fab>
                  <Fab color="primary" aria-label="edit" onClick={() => handleEditPeople(people)}>
                    <EditIcon />
                  </Fab>
                </div>
                <Dialog
                  open={modalDelete}
                  onClose={() => setModalDelete(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title">{`Aviso !!! Você tem certeza que desja excluir ${people.name} da listagem ?`}</DialogTitle>
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
                      Sim, Desejo excluir mesmo assim
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
