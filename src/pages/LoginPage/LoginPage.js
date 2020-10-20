import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoading, getError } from 'redux/auth/selectors';
import { loginRequest, clearError } from 'redux/auth/actions';
import { Link as MaterialLink, TextField, Grid } from '@material-ui/core';
import { Logo } from 'loft-taxi-mui-theme';
import PropTypes from 'prop-types';
import {
  StyledLoginPage,
  StyledFormWrapper,
  StyledForm,
  StyledHeader,
  StyledSubHeader,
  StyledButton,
} from './Styled';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from 'components/ErrorMessage';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное для заполнения поле'),
  password: yup.string().required('Обязательное для заполнения поле'),
});

const LoginPage = ({ isLoading, errorMessage, loginRequest, clearError }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email, password }) => {
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  name="email"
                  id="email"
                  label="Email"
                  fullWidth
                  required
                  inputProps={{
                    'data-testid': 'input-email',
                  }}
                  inputRef={register}
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  label="Пароль"
                  fullWidth
                  required
                  inputProps={{
                    'data-testid': 'input-password',
                  }}
                  margin={'normal'}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <StyledButton
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              data-testid={'login-button'}
              disabled={isLoading}
            >
              Войти
            </StyledButton>

            {errorMessage ? (
              <ErrorMessage text={errorMessage} cb={clearError} />
            ) : null}
          </form>
        </StyledForm>
      </StyledFormWrapper>
    </StyledLoginPage>
  );
};

LoginPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(null),
  ]),
  loginRequest: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  errorMessage: getError(state),
});

const mapDispatchToProps = {
  loginRequest,
  clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
