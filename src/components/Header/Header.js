import React from 'react';
import { Button, Container, Toolbar } from '@material-ui/core';
import { Logo } from 'loft-taxi-mui-theme';
import { logout } from 'redux/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  StyledAppBar,
  StyledAppBarInner,
  StyledNav,
  StyledNavList,
} from './Styled';

const NAV_LIST = [
  { id: 'map', label: 'Карта', linkTo: 'map' },
  { id: 'profile', label: 'Профиль', linkTo: 'profile' },
  { id: 'logout', label: 'Выйти', linkTo: 'login' },
];

const Header = ({ location, history, logout }) => {
  const activePage = location.pathname.slice(1);

  const handleClick = (e) => {
    const linkTo = e.currentTarget.dataset.linkTo;

    if (linkTo === 'login') {
      logout();
    }

    history.push(`/${linkTo}`);
  };

  return (
    <StyledAppBar>
      <Container>
        <Toolbar>
          <StyledAppBarInner>
            <Logo />
            <StyledNav>
              <StyledNavList>
                {NAV_LIST.map(({ id, label, linkTo }) => {
                  const isActive = id === activePage;

                  return (
                    <li key={id}>
                      <Button
                        style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                        data-link-to={linkTo}
                        data-testid={id}
                        type={'button'}
                        onClick={handleClick}
                      >
                        {label}
                      </Button>
                    </li>
                  );
                })}
              </StyledNavList>
            </StyledNav>
          </StyledAppBarInner>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Header);
