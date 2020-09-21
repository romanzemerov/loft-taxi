import React, { useContext, useState } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Link as MaterialLink,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const Signup = () => {
  const [{ email, password, name, surname }, setUser] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
  });
  const { form, header, subHeader, section, input, button } = useStyles();
  const { login } = useContext(AuthContext);

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
  };

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
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default Signup;
