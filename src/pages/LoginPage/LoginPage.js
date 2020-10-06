import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsLoading } from 'redux/auth/reducers';
import { loginRequest } from 'redux/auth/actions';
import { Link as MaterialLink } from '@material-ui/core';
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
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное для заполнения поле'),
  password: yup.string().required('Обязательное для заполнения поле'),
});

const LoginPage = ({ isLoading, loginRequest }) => {
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
            <StyledInput
              type="email"
              name="email"
              id="email"
              label="Email"
              fullWidth
              required
              inputProps={{
                'data-testid': 'input-email',
              }}
              defaultValue={'testtestovich5@test.test'}
              inputRef={register}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <StyledInput
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
              defaultValue={'testtest'}
              error={!!errors.password}
              helperText={errors?.password?.message}
              inputRef={register}
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
