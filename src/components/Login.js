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

const Login = ({ handleChangePage }) => {
  const [{ email, password }, setUser] = useState({ email: '', password: '' });
  const { wrapper, form, header, subHeader, input, button } = useStyles();
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

  const handleSignupClick = (e) => {
    e.preventDefault();
    handleChangePage('signup');
  };

  return (
    <div className={wrapper}>
      <Logo animated={true} white={true} />
      <Paper className={form}>
        <Typography className={header} variant="h4">
          Логин
        </Typography>
        <Typography className={subHeader} variant={'body1'}>
          Новый пользователь?
          <Link href="/signup" onClick={handleSignupClick} data-testid={'link'}>
            &nbsp;Зарегистрируйтесь
          </Link>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={input}
            type="email"
            name="email"
            id="email"
            label="Имя пользователя"
            fullWidth={true}
            value={email}
            onChange={handleInputChange}
            required={true}
            inputProps={{
              'data-testid': 'input-email',
            }}
          />

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
            inputProps={{
              'data-testid': 'input-password',
            }}
          />
          <Button
            className={button}
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            data-testid={'login-button'}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </div>
  );
};

Login.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
};

export default Login;
