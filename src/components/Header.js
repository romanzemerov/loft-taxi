import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Logo } from 'loft-taxi-mui-theme';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#fff',
  },
  appBarInner: {
    display: 'flex',
    width: '100%',
  },
  nav: { marginLeft: 'auto' },
  navList: { display: 'flex' },
  navItem: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
});

const NAV_LIST = [
  { id: 'map', label: 'Карта', linkTo: 'map' },
  { id: 'profile', label: 'Профиль', linkTo: 'profile' },
  { id: 'logout', label: 'Выйти', linkTo: 'login' },
];

const Header = ({ currentPage, handleChangePage }) => {
  const { appBar, appBarInner, nav, navList, navItem } = useStyles();
  const { logout } = useContext(AuthContext);

  const handleClick = (e) => {
    const linkTo = e.currentTarget.dataset.linkTo;

    if (linkTo === 'login') {
      logout();
    }

    handleChangePage(linkTo);
  };

  return (
    <AppBar className={appBar} position={'static'}>
      <Container>
        <Toolbar>
          <div className={appBarInner}>
            <Logo />
            <nav className={nav}>
              <ul className={navList}>
                {NAV_LIST.map(({ id, label, linkTo }) => {
                  const isActive = currentPage === linkTo;

                  return (
                    <li className={navItem} key={id}>
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
              </ul>
            </nav>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};

export default Header;
