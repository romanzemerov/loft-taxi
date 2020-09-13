import React, { Component } from 'react';

export class Login extends Component {
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

    return (
      <div>
        <h2>Логин</h2>
        <div>
          Новый пользователь?
          <a href="/signup" onClick={this.handleSignupClick}>
            Зарегистрируйтесь
          </a>
        </div>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Имя пользователя *</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <label htmlFor="password">Пароль *</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <br />
          <button>Войти</button>
        </form>
      </div>
    );
  }
}
