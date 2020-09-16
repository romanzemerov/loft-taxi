import React, { useState } from 'react';
import Map from 'components/Map';
import Profile from 'components/Profile';
import Login from 'components/Login';
import Signup from 'components/Signup';
import { AuthContext } from 'contexts/AuthContext';
import PropTypes from 'prop-types';

const PROTECTED_ROUTES = ['map', 'profile'];

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname.slice(1),
  );

  const getShowingComponent = () => {
    const PAGE_TO_COMPONENT = {
      map: (
        <Map currentPage={currentPage} handleChangePage={handleChangePage} />
      ),
      profile: (
        <Profile
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      ),
      login: <Login handleChangePage={handleChangePage} />,
      signup: <Signup handleChangePage={handleChangePage} />,
    };
    const defaultComponent = PAGE_TO_COMPONENT['login'];

    if (!isLoggedIn && PROTECTED_ROUTES.includes(currentPage)) {
      return defaultComponent;
    }

    return PAGE_TO_COMPONENT[currentPage] || defaultComponent;
  };

  const login = (email, password) => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const handleChangePage = (newPageName) => {
    setCurrentPage(newPageName);
  };

  const authContextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {getShowingComponent()}
    </AuthContext.Provider>
  );
};

AuthContext.Provider.propTypes = {
  value: PropTypes.exact({
    isLoggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }),
};

export default App;
