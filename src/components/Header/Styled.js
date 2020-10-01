import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

export const StyledAppBar = styled(AppBar)`
  background-color: #fff;
`;

export const StyledAppBarInner = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const StyledNav = styled.nav`
  margin-left: auto;
`;

export const StyledNavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;
