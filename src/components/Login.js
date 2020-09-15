import React, { Component } from 'react';
import {
  Button,
  Paper,
  TextField,
  Typography,
  withStyles,
  Link,
} from '@material-ui/core';

const styles = () => ({
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

class Login extends Component {
  state = {
    email: '',
    password: '',
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

  handleSignupClick = (e) => {
    e.preventDefault();
    const { handleChangePage } = this.props;
    handleChangePage('signup');
  };

  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    const { form, header, subHeader, input, button } = classes;

    return (
      <Paper className={form}>
        <Typography className={header} variant="h4">
          Логин
        </Typography>
        <Typography className={subHeader} variant={'body1'}>
          Новый пользователь?
          <Link href="/signup" onClick={this.handleSignupClick}>
            &nbsp;Зарегистрируйтесь
          </Link>
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            className={input}
            type="email"
            name="email"
            id="email"
            label="Имя пользователя"
            fullWidth={true}
            value={email}
            onChange={this.handleInputChange}
            required={true}
          />

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
          <br />
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
    );
  }
}

export default withStyles(styles)(Login);
