import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Link as MaterialLink,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { registerRequest } from 'redux/auth/actions';
import { connect } from 'react-redux';
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

const Signup = ({ isLoggedIn, isLoading, registerRequest }) => {
  const [{ email, password, name, surname }, setUser] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
  });
  const { form, header, subHeader, section, input, button } = useStyles();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerRequest({ email, password, name, surname });
  };

  if (isLoggedIn) return <Redirect to={'/map'} />;

  return (
    <Paper className={form}>
      <Typography className={header} variant="h4">
        Регистрация
      </Typography>
      <Typography className={subHeader} variant={'body1'}>
        Уже зарегистрированы?
        <MaterialLink to="/login" component={Link} data-testid={'link'}>
          &nbsp;Уже зарегистрированы?
        </MaterialLink>
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
          inputProps={{
            'data-testid': 'input-email',
          }}
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
            inputProps={{
              'data-testid': 'input-name',
            }}
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
            inputProps={{
              'data-testid': 'input-surname',
            }}
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
          inputProps={{
            'data-testid': 'input-password',
          }}
        />
        <Button
          className={button}
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          data-testid={'signup-button'}
          disabled={isLoading}
        >
          Зарегистрироваться
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
  registerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
