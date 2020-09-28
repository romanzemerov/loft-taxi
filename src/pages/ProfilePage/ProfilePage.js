import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUserToken } from 'redux/auth/reducers';
import { getCard, getIsCardLoaded, getIsLoading } from 'redux/profile/reducers';
import { getCardRequest, postCardRequest } from 'redux/profile/actions';
import { Grid, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  StyledCard,
  StyledCardContent,
  StyledFormWrapper,
  StyledIconWrapper,
  StyledProfilePage,
  SubmitButton,
  SubtitleTypography,
} from './StyledProfilePage';
import { MCIcon } from 'loft-taxi-mui-theme';

const ProfilePage = memo(function ProfilePage({
  token,
  creditCard,
  isLoading,
  isCardLoaded,
  postCardRequest,
  getCardRequest,
}) {
  const [card, setCard] = useState(creditCard);
  const { number, expireDate, name, secretCode } = card;

  const handleInputChange = ({ target }) => {
    const { value, name } = target;

    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setCard((prevState) => ({
      ...prevState,
      expireDate: e,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postCardRequest({
      cardNumber: number,
      expiryDate: expireDate,
      cardName: name,
      cvc: secretCode,
      token,
    });
  };

  useEffect(() => {
    if (!isCardLoaded && !isLoading) {
      getCardRequest({ token });
    }
  }, [token, isCardLoaded, isLoading, getCardRequest]);

  useEffect(() => {
    setCard(creditCard);
  }, [creditCard]);
  return (
    <StyledProfilePage>
      <StyledFormWrapper elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Профиль
        </Typography>
        <SubtitleTypography variant="subtitle1" align="center">
          Способ оплаты
        </SubtitleTypography>

        <form onSubmit={handleSubmit}>
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
                    value={number}
                    onChange={handleInputChange}
                  />
                  <KeyboardDatePicker
                    placeholder="ММ/ГГ"
                    label="Срок действия:"
                    format="MM/yy"
                    views={['month', 'year']}
                    clearable
                    required
                    onChange={handleDateChange}
                    name={'expireDate'}
                    value={expireDate}
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
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    label="CVC"
                    name={'secretCode'}
                    value={secretCode}
                    onChange={handleInputChange}
                    required
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
            disabled={isLoading}
          >
            Сохранить
          </SubmitButton>
        </form>
      </StyledFormWrapper>
    </StyledProfilePage>
  );
});

const mapStateToProps = (state) => ({
  token: getUserToken(state),
  creditCard: getCard(state),
  isLoading: getIsLoading(state),
  isCardLoaded: getIsCardLoaded(state),
});

const mapDispatchToProps = {
  postCardRequest,
  getCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
