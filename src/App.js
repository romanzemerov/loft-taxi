import React, { useContext, useState } from 'react';
import { MapWithHeader } from 'components/Map';
import { ProfileWithHeader } from 'components/Profile';
import Login from 'components/Login';
import Signup from 'components/Signup';
import { AuthContext } from 'contexts/AuthContext';

const PROTECTED_ROUTES = ['map', 'profile'];

const App = () => {
  const [currentPage, setCurrentPage] = useState(
    window.location.pathname.slice(1),
  );
  const { isLoggedIn } = useContext(AuthContext);

  const getShowingComponent = () => {
    const PAGE_TO_COMPONENT = {
      map: (
        <MapWithHeader
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      ),
      profile: (
        <ProfileWithHeader
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

  const handleChangePage = (newPageName) => {
    setCurrentPage(newPageName);
  };

  return getShowingComponent();
};

export default App;
