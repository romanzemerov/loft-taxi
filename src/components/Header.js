import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  { label: 'Карта', linkTo: 'map' },
  { label: 'Профиль', linkTo: 'profile' },
  { label: 'Выйти', linkTo: 'login' },
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
                {NAV_LIST.map(({ label, linkTo }) => {
                  const isActive = currentPage === linkTo;

                  return (
                    <li className={navItem} key={label}>
                      <Button
                        style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                        data-link-to={linkTo}
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

export default Header;
