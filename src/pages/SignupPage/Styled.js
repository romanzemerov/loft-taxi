import styled from 'styled-components';
import { Button, Paper, Typography } from '@material-ui/core';
import backgroundImage from 'assets/background.jpg';

export const StyledSignupPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('${backgroundImage}');
`;

export const StyledFormWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin-left: 214px;
`;

export const StyledForm = styled(Paper)`
  padding: 44px 60px;
`;

export const StyledHeader = styled(Typography)`
  margin-bottom: 30px;
`;

export const StyledSubHeader = styled(Typography)`
  margin-bottom: 40px;
`;

export const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-top: 40px;
`;
