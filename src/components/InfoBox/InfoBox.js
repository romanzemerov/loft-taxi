import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';
import s from 'components/InfoBox/InfoBox.module.sass';

const typeToContent = {
  noCard: {
    headerText: 'Нет карты',
    description:
      'Чтобы начать пользоваться сервисом нужно добавить кредитную карту к вашему профилю.',
    buttonLabel: 'Добавить карту',
    linkTo: '/profile',
  },
  orderPlaced: {
    headerText: 'Заказ размещён',
    description:
      'Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.',
    buttonLabel: 'Сделать новый заказ',
    linkTo: '/map',
  },
};

const InfoBox = ({ type, onClickButton }) => {
  const { headerText, description, buttonLabel, linkTo } = typeToContent[type];

  return (
    <Paper elevation={3} className={s.wrapper}>
      <Typography variant="h4" gutterBottom>
        {headerText}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Button
        className={s.button}
        component={Link}
        type="button"
        variant="contained"
        color="primary"
        to={linkTo}
        onClick={onClickButton ? onClickButton : null}
      >
        {buttonLabel}
      </Button>
    </Paper>
  );
};

export default InfoBox;
