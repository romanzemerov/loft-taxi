import React, {Component} from "react";

export class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    surname: '',
  }

  handleInputChange = ({target}) => {
    const {name, value} = target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {handleChangePathname} = this.props;
    handleChangePathname('/map')
  }

  handleLoginClick = (e) => {
    e.preventDefault();
    const {handleChangePathname} = this.props;
    handleChangePathname('/login')
  }

  render () {
    const {name, surname, email, password} = this.state;

    return (
      <div>
        <h2>Регистрация</h2>
        <div>Уже зарегистрированы?<a href="/login" onClick={this.handleLoginClick}>Войти</a></div>
        <br/>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Адрес электронной почты *</label>
          <br/>
          <input type="email" name="email" id="email" value={email} onChange={this.handleInputChange}/>
          <br/>
          <br/>
          <label htmlFor="name">Имя *</label>
          <br/>
          <input type="text" name="name" id="name" value={name} onChange={this.handleInputChange}/>
          <br/>
          <label htmlFor="surname">Фамилия *</label>
          <br/>
          <input type="text" name="surname" id="surname" value={surname} onChange={this.handleInputChange}/>
          <br/>
          <br/>
          <label htmlFor="password">Пароль *</label>
          <br/>
          <input type="password" name="password" id="password" value={password} onChange={this.handleInputChange}/>
          <br/>
          <button>Войти</button>
        </form>
      </div>
    )
  }
}
