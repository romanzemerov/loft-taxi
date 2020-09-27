import React, { useEffect, useState } from 'react';
import { store } from 'redux/store';
import { connect } from 'react-redux';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { getUserToken } from 'redux/auth/reducers';
import { postCardRequest, getCardRequest } from 'redux/profile/actions';
import { getCard, getIsLoading } from 'redux/profile/reducers';
import {
  StyledCard,
  StyledCardContent,
  StyledFormWrapper,
  StyledIconWrapper,
  StyledProfile,
  SubmitButton,
  SubtitleTypography,
} from 'components/styledProfile';
import { MCIcon } from 'loft-taxi-mui-theme';

const Profile = ({ token, card, isLoading }) => {
  const [{ number, expireDate, name, secretCode }, setCard] = useState(() => {
    const { number, expireDate, name, secretCode } = card;

    return {
      number,
      expireDate,
      name,
      secretCode,
    };
  });

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

    store.dispatch(
      postCardRequest({
        cardNumber: number,
        expiryDate: expireDate,
        cardName: name,
        cvc: secretCode,
        token,
      }),
    );
  };

  useEffect(() => {
    store.dispatch(getCardRequest({ token }));
  }, [token]);

  useEffect(() => {
    if (card) {
      setCard(card);
    }
  }, [card]);

  return (
    <StyledProfile>
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
                  <DatePicker
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
    </StyledProfile>
  );
};

const mapStateToProps = (state) => ({
  token: getUserToken(state),
  card: getCard(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = {
  postCardRequest,
  getCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
