import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoading } from 'redux/auth/reducers';
import { loginRequest } from 'redux/auth/actions';
import { Link as MaterialLink, TextField } from '@material-ui/core';
import { Logo } from 'loft-taxi-mui-theme';
import PropTypes from 'prop-types';
import {
  StyledLoginPage,
  StyledFormWrapper,
  StyledForm,
  StyledHeader,
  StyledSubHeader,
  StyledInput,
  StyledButton,
} from './Styled';

const LoginPage = ({ isLoading, loginRequest }) => {
  const [{ email, password }, setUser] = useState({
    email: 'testtestovich5@test.test',
    password: 'testtest',
  });

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
    <StyledLoginPage>
      <Logo animated white />
      <StyledFormWrapper>
        <StyledForm>
          <StyledHeader variant="h4">Логин</StyledHeader>
          <StyledSubHeader variant={'body1'}>
            Новый пользователь?
            <MaterialLink to="/signup" component={Link} data-testid={'link'}>
              &nbsp;Зарегистрируйтесь
            </MaterialLink>
          </StyledSubHeader>
          <form onSubmit={handleSubmit}>
            <StyledInput
              type="email"
              name="email"
              id="email"
              label="Имя пользователя"
              fullWidth
              value={email}
              onChange={handleInputChange}
              required
              inputProps={{
                'data-testid': 'input-email',
              }}
            />
            <TextField
              type="password"
              name="password"
              id="password"
              label="Пароль"
              fullWidth
              value={password}
              onChange={handleInputChange}
              required
              inputProps={{
                'data-testid': 'input-password',
              }}
            />
            <StyledButton
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              data-testid={'login-button'}
              disabled={isLoading}
            >
              Войти
            </StyledButton>
          </form>
        </StyledForm>
      </StyledFormWrapper>
    </StyledLoginPage>
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
