import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoading } from 'redux/auth/reducers';
import { loginRequest } from 'redux/auth/actions';
import {
  Button,
  Link as MaterialLink,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from 'loft-taxi-mui-theme';
import backgroundImage from 'assets/background.jpg';
import PropTypes from 'prop-types';

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
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
  },
  formWrapper: {
    marginLeft: '214px',
  },
});

const LoginPage = ({ isLoading, loginRequest }) => {
  const [{ email, password }, setUser] = useState({
    email: 'testtestovich5@test.test',
    password: 'testtest',
  });

  const {
    loginPage,
    formWrapper,
    form,
    header,
    subHeader,
    input,
    button,
  } = useStyles();

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

  return (
    <div className={loginPage}>
      <Logo animated={true} white={true} />
      <div className={formWrapper}>
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
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
