import React from 'react';
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
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное для заполнения поле'),
  name: yup.string().required('Обязательное для заполнения поле'),
  surname: yup.string().required('Обязательное для заполнения поле'),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать минимиум 8 симоволов')
    .required('Обязательное для заполнения поле'),
});

const SignupPage = ({ isLoading, registerRequest }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerRequest(data);
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <StyledInput
              type="email"
              name="email"
              id="email"
              label="Адрес электронной почты"
              fullWidth
              required
              error={!!errors.email}
              helperText={errors?.email?.message}
              inputRef={register}
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
                required
                fullWidth
                error={!!errors.name}
                helperText={errors?.name?.message}
                inputRef={register}
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
                required
                error={!!errors.surname}
                helperText={errors?.surname?.message}
                inputRef={register}
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
              required
              error={!!errors.password}
              helperText={errors?.password?.message}
              inputRef={register}
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
