import React, { Component } from 'react';
import {
  Button,
  Paper,
  TextField,
  Typography,
  withStyles,
  Link,
} from '@material-ui/core';
import { Logo } from 'loft-taxi-mui-theme';
import backgroundImage from 'assets/background.jpg';

const styles = () => ({
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

class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    surname: '',
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { handleChangePage } = this.props;
    handleChangePage('map');
  };

  handleLoginClick = (e) => {
    e.preventDefault();
    const { handleChangePage } = this.props;
    handleChangePage('login');
  };

  render() {
    const { name, surname, email, password } = this.state;
    const { classes } = this.props;
    const {
      wrapper,
      form,
      header,
      subHeader,
      section,
      input,
      button,
    } = classes;

    return (
      <div className={wrapper}>
        <Logo animated={true} white={true} />
        <Paper className={form}>
          <Typography className={header} variant="h4">
            Регистрация
          </Typography>
          <Typography className={subHeader} variant={'body1'}>
            Уже зарегистрированы?
            <Link href="/login" onClick={this.handleLoginClick}>
              &nbsp;Войти
            </Link>
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <TextField
              className={input}
              type="email"
              name="email"
              id="email"
              label="Адрес электронной почты"
              fullWidth={true}
              value={email}
              onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
              onChange={this.handleInputChange}
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
  }
}

export default withStyles(styles)(Signup);
