import React from 'react';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Logo } from 'loft-taxi-mui-theme';
import { logout } from 'redux/auth/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

const Header = ({ location, history, logout }) => {
  const { appBar, appBarInner, nav, navList, navItem } = useStyles();
  const activePage = location.pathname.slice(1);

  const handleClick = (e) => {
    const linkTo = e.currentTarget.dataset.linkTo;

    if (linkTo === 'login') {
      logout();
    }

    history.push(`/${linkTo}`);
  };

  return (
    <AppBar className={appBar}>
      <Container>
        <Toolbar>
          <div className={appBarInner}>
            <Logo />
            <nav className={nav}>
              <ul className={navList}>
                {NAV_LIST.map(({ id, label, linkTo }) => {
                  const isActive = id === activePage;

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
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(Header);
