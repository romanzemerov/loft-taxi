import React, { useState } from 'react';
import { loginRequest } from 'redux/auth/actions';
import { connect } from 'react-redux';

import {
  Button,
  Paper,
  TextField,
  Typography,
  Link as MaterialLink,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Redirect, Link } from 'react-router-dom';
import { getIsLoading, getIsLoggedIn } from 'redux/auth/reducers';

const useStyles = makeStyles({
  form: {
    maxWidth: '500px',
    padding: '44px 60px',
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

const Login = ({ isLoggedIn, isLoading, loginRequest }) => {
  const [{ email, password }, setUser] = useState({
    email: '',
    password: '',
  });
  const { form, header, subHeader, input, button } = useStyles();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest({ email, password });
  };

  if (isLoggedIn) return <Redirect to={'/map'} />;

  return (
    <Paper className={form}>
      <Typography className={header} variant="h4">
        Логин
      </Typography>
      <Typography className={subHeader} variant={'body1'}>
        Новый пользователь?
        <MaterialLink to="/signup" component={Link} data-testid={'link'}>
          &nbsp;Зарегистрируйтесь
        </MaterialLink>
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
          disabled={isLoading}
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
