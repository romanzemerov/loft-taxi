import React, {Component} from "react";

export class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleInputChange = ({target}) => {
    const {name, value} = target;
    this.setState({[name]: value})
  }

  render () {
    const {email, password} = this.state;
    const {handleFormSubmit} = this.props;


    return (
      <div>
        <h2>Логин</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">Имя пользователя *</label>
          <br/>
          <input type="email" name="email" id="email" value={email} onChange={this.handleInputChange}/>
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
