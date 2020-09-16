import React, { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { Button, Paper, TextField, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Logo } from 'loft-taxi-mui-theme';
import backgroundImage from 'assets/background.jpg';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
  },
  form: {
    maxWidth: '500px',
    padding: '44px 60px',
    marginLeft: '214px',
  },
  header: {
    marginBottom: '30px',
  },
  subHeader: {
    marginBottom: '40px',
  },
  section: {
    display: 'flex',
    '& > *': {
      marginRight: '16px',
    },
  },
  input: {
    marginBottom: '32px',
    '&:last-of-type': {
      marginBottom: '0',
    },
  },
  button: {
    display: 'block',
    marginLeft: 'auto',
    marginTop: '40px',
  },
});

const Signup = ({ handleChangePage }) => {
  const [{ email, password, name, surname }, setUser] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
  });
  const {
    wrapper,
    form,
    header,
    subHeader,
    section,
    input,
    button,
  } = useStyles();
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    handleChangePage('map');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    handleChangePage('login');
  };

  return (
    <div className={wrapper}>
      <Logo animated={true} white={true} />
      <Paper className={form}>
        <Typography className={header} variant="h4">
          Регистрация
        </Typography>
        <Typography className={subHeader} variant={'body1'}>
          Уже зарегистрированы?
          <Link href="/login" onClick={handleLoginClick}>
            &nbsp;Войти
          </Link>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            className={input}
            type="email"
            name="email"
            id="email"
            label="Адрес электронной почты"
            fullWidth={true}
            value={email}
            onChange={handleInputChange}
            required={true}
          />
          <div className={section}>
            <TextField
              className={input}
              type="text"
              name="name"
              id="name"
              label="Имя"
              fullWidth={true}
              value={name}
              onChange={handleInputChange}
              required={true}
            />
            <TextField
              className={input}
              type="text"
              name="surname"
              id="surname"
              label="Фамилия"
              fullWidth={true}
              value={surname}
              onChange={handleInputChange}
              required={true}
            />
          </div>
          <TextField
            className={input}
            type="password"
            name="password"
            id="password"
            label="Пароль"
            fullWidth={true}
            value={password}
            onChange={handleInputChange}
            required={true}
          />
          <Button
            className={button}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};

Signup.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

export default Signup;
