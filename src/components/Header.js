import React from 'react';
import { Logo } from 'loft-taxi-mui-theme';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

const styles = () => ({
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
  { label: 'Логин', linkTo: 'login' },
];

const Header = ({ currentPage, handleChangePage, classes }) => {
  const { appBar, appBarInner, nav, navList, navItem } = classes;

  const handleClick = (e) => {
    handleChangePage(e.currentTarget.dataset.linkTo);
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

export default withStyles(styles)(Header);
