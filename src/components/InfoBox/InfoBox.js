import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { StyledWrapper, StyledButton } from './Styled';

const typeToContent = {
  noCard: {
    headerText: 'Нет карты',
    description:
      'Чтобы начать пользоваться сервисом нужно добавить кредитную карту к вашему профилю.',
    buttonLabel: 'Добавить карту',
    linkTo: '/profile',
  },
  successAddedCard: {
    headerText: 'Профиль',
    description:
      'Платёжные данные обновлены. Теперь вы можете заказывать такси.',
    buttonLabel: 'Заказать такси',
    linkTo: '/map',
  },
  orderPlaced: {
    headerText: 'Заказ размещён',
    description:
      'Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.',
    buttonLabel: 'Сделать новый заказ',
    linkTo: '/map',
  },
};

const InfoBox = ({ type, onClickButton = null }) => {
  const { headerText, description, buttonLabel, linkTo } = typeToContent[type];

  return (
    <StyledWrapper elevation={3}>
      <Typography variant="h4" gutterBottom>
        {headerText}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <StyledButton
        component={Link}
        type="button"
        variant="contained"
        color="primary"
        fullWidth
        to={linkTo}
        onClick={onClickButton}
      >
        {buttonLabel}
      </StyledButton>
    </StyledWrapper>
  );
};

InfoBox.propTypes = {
  type: PropTypes.string.isRequired,
  onClickButton: PropTypes.func,
};

export default InfoBox;
