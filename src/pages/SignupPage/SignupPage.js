import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoading } from 'redux/auth/reducers';
import { registerRequest } from 'redux/auth/actions';
import { Link as MaterialLink } from '@material-ui/core';
import { Logo } from 'loft-taxi-mui-theme';
import PropTypes from 'prop-types';
import {
  StyledSignupPage,
  StyledFormWrapper,
  StyledForm,
  StyledHeader,
  StyledSubHeader,
  StyledSection,
  StyledInput,
  StyledButton,
} from './Styled';

const SignupPage = ({ isLoading, registerRequest }) => {
  const [{ email, password, name, surname }, setUser] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
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
    registerRequest({ email, password, name, surname });
  };

  return (
    <StyledSignupPage>
      <Logo animated white />
      <StyledFormWrapper>
        <StyledForm>
          <StyledHeader variant="h4">Регистрация</StyledHeader>
          <StyledSubHeader variant={'body1'}>
            <MaterialLink to="/login" component={Link} data-testid={'link'}>
              &nbsp;Уже зарегистрированы?
            </MaterialLink>
          </StyledSubHeader>
          <form onSubmit={handleSubmit}>
            <StyledInput
              type="email"
              name="email"
              id="email"
              label="Адрес электронной почты"
              fullWidth
              value={email}
              onChange={handleInputChange}
              required
              inputProps={{
                'data-testid': 'input-email',
              }}
            />
            <StyledSection>
              <StyledInput
                type="text"
                name="name"
                id="name"
                label="Имя"
                fullWidth
                value={name}
                onChange={handleInputChange}
                required
                inputProps={{
                  'data-testid': 'input-name',
                }}
              />
              <StyledInput
                type="text"
                name="surname"
                id="surname"
                label="Фамилия"
                fullWidth
                value={surname}
                onChange={handleInputChange}
                required
                inputProps={{
                  'data-testid': 'input-surname',
                }}
              />
            </StyledSection>
            <StyledInput
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
              data-testid={'signup-button'}
              disabled={isLoading}
            >
              Зарегистрироваться
            </StyledButton>
          </form>
        </StyledForm>
      </StyledFormWrapper>
    </StyledSignupPage>
  );
};

SignupPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  registerRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  registerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
