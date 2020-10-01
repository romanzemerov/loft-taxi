import styled from 'styled-components';
import {
  Card,
  Button,
  CardContent,
  Paper,
  Typography,
} from '@material-ui/core';
import backgroundImage from 'assets/background.jpg';

export const StyledProfilePage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 68px;
  min-height: calc(100vh - 68px);
  background-image: url('${backgroundImage}');
`;

export const StyledFormWrapper = styled(Paper)`
  width: 100%;
  max-width: 950px;
  padding: 60px 70px;
`;

export const SubtitleTypography = styled(Typography)`
  margin-bottom: 40px;
  color: rgba(0, 0, 0, 0.54);
`;

export const StyledCard = styled(Card)`
  position: relative;
  padding: 40px 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
`;

export const StyledIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 16px;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;

export const SubmitButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
`;
