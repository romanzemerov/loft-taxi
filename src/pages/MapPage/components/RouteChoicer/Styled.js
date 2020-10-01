import styled from 'styled-components';
import { Paper, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const StyledWrapper = styled(Paper)`
  padding: 42px 48px;
`;

export const StyledAutocomplete = styled(Autocomplete)`
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 32px;
`;
