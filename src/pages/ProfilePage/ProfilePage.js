import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserToken } from 'redux/auth/selectors';
import {
  getCard,
  getCardLoadingError,
  getIsCardLoaded,
  getIsCardLoading,
} from 'redux/profile/selectors';
import { getCardRequest, postCardRequest } from 'redux/profile/actions';
import { Grid, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  StyledPage,
  StyledCard,
  StyledCardContent,
  StyledFormWrapper,
  StyledIconWrapper,
  SubmitButton,
  SubtitleTypography,
} from './Styled';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MCIcon } from 'loft-taxi-mui-theme';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

const schema = yup.object().shape({
  number: yup
    .string()
    .length(19, 'Номер кредитной карты должен содержать 16 символов ')
    .required('Обязательное для заполнения поле'),
  expireDate: yup
    .date()
    .min(
      `${DateTime.local().minus({ month: 1 }).endOf('month')}`,
      'Срок действия карты истек',
    )
    .required('Обязательное для заполнения поле'),
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Имя владельца карты не должно содержать цифры')
    .required('Обязательное для заполнения поле'),
  secretCode: yup
    .string()
    .length(3, 'CVC-код состоять из трех символов')
    .required('Обязательное для заполнения поле'),
});

const normalizeCardNumber = (value) => {
  return (
    value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substr(0, 19) || ''
  );
};

const ProfilePage = memo(function ProfilePage({
  token,
  creditCard,
  isCardLoading,
  isCardLoaded,
  loadingError,
  postCardRequest,
  getCardRequest,
}) {
  const { register, handleSubmit, errors, control, trigger } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { number, expireDate, name, secretCode } = data;

    postCardRequest({
      cardNumber: number,
      expiryDate: expireDate.toJSON(),
      cardName: name,
      cvc: secretCode,
      token,
    });
  };

  useEffect(() => {
    if (!loadingError && !isCardLoaded && !isCardLoading) {
      getCardRequest({ token });
    }
  }, [token, isCardLoaded, isCardLoading, loadingError, getCardRequest]);

  return (
    <StyledPage>
      <StyledFormWrapper elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Профиль
        </Typography>
        <SubtitleTypography variant="subtitle1" align="center">
          Способ оплаты
        </SubtitleTypography>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container justify="center" spacing={4}>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <StyledCardContent>
                  <StyledIconWrapper>
                    <MCIcon />
                  </StyledIconWrapper>
                  <TextField
                    name={'number'}
                    label="Номер карты"
                    placeholder={'0000 0000 0000 0000'}
                    inputRef={register}
                    error={!!errors.number}
                    helperText={errors?.number?.message}
                    defaultValue={creditCard.number}
                    onChange={({ target }) => {
                      const { value } = target;
                      target.value = normalizeCardNumber(value);
                    }}
                  />
                  <Controller
                    control={control}
                    name={'expireDate'}
                    defaultValue={creditCard.expireDate}
                    render={({ onChange, value, name }) => {
                      return (
                        <KeyboardDatePicker
                          name={name}
                          id={name}
                          placeholder="ММ/ГГ"
                          label="Срок действия:"
                          format="MM/yy"
                          views={['month', 'year']}
                          clearable
                          onChange={(e) => {
                            onChange(e);
                            trigger(name);
                          }}
                          value={value}
                          error={!!errors.expireDate}
                          helperText={errors?.expireDate?.message}
                          required
                        />
                      );
                    }}
                  />
                </StyledCardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <StyledCardContent>
                  <TextField
                    label="Имя владельца"
                    name={'name'}
                    required
                    inputRef={register}
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    defaultValue={creditCard.name}
                    onChange={({ target }) => {
                      const { value } = target;
                      target.value = value.toUpperCase();
                    }}
                  />
                  <TextField
                    label="CVC"
                    type={'password'}
                    name={'secretCode'}
                    required
                    inputRef={register}
                    error={!!errors.secretCode}
                    helperText={errors?.secretCode?.message}
                    defaultValue={creditCard.secretCode}
                  />
                </StyledCardContent>
              </StyledCard>
            </Grid>
          </Grid>

          <SubmitButton
            type={'submit'}
            size="medium"
            variant="contained"
            color="primary"
            disabled={isCardLoading}
          >
            Сохранить
          </SubmitButton>
        </form>
      </StyledFormWrapper>
    </StyledPage>
  );
});

ProfilePage.propTypes = {
  token: PropTypes.string.isRequired,
  creditCard: PropTypes.exact({
    number: PropTypes.string.isRequired,
    expireDate: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.instanceOf(null),
    ]),
    name: PropTypes.string.isRequired,
    secretCode: PropTypes.string.isRequired,
  }),
  isCardLoading: PropTypes.bool.isRequired,
  isCardLoaded: PropTypes.bool.isRequired,
  loadingError: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.instanceOf(null),
  ]),
  postCardRequest: PropTypes.func.isRequired,
  getCardRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: getUserToken(state),
  creditCard: getCard(state),
  isCardLoading: getIsCardLoading(state),
  isCardLoaded: getIsCardLoaded(state),
  loadingError: getCardLoadingError(state),
});

const mapDispatchToProps = {
  postCardRequest,
  getCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
