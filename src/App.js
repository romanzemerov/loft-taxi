import React, { Component } from 'react';
import Map from 'components/Map';
import Profile from 'components/Profile';
import Login from 'components/Login';
import Signup from 'components/Signup';
import { AuthContext } from 'contexts/AuthContext';

const PROTECTED_ROUTES = ['map', 'profile'];

class App extends Component {
  state = {
    isLoggedIn: false,
    currentPage: window.location.pathname.slice(1),
  };

  getShowingComponent = () => {
    const { isLoggedIn, currentPage } = this.state;

    if (!isLoggedIn && PROTECTED_ROUTES.includes(currentPage)) {
      return <Login />;
    }

    const PAGE_TO_COMPONENT = {
      map: (
        <Map
          currentPage={currentPage}
          handleChangePage={this.handleChangePage}
        />
      ),
      profile: (
        <Profile
          currentPage={currentPage}
          handleChangePage={this.handleChangePage}
        />
      ),
      login: <Login handleChangePage={this.handleChangePage} />,
      signup: <Signup handleChangePage={this.handleChangePage} />,
    };

    return PAGE_TO_COMPONENT[currentPage] || <Login />;
  };

  login = (email, password) => {
    if (email && password) {
      this.setState({ isLoggedIn: true });
    }
  };

  logout = () => {
    this.setState({ isLoggedIn: false });
  };

  handleChangePage = (newPageName) => {
    this.setState({ currentPage: newPageName });
  };

  render() {
    const isLoggedIn = this.state;
    const showingComponent = this.getShowingComponent();
    const authContextValue = {
      isLoggedIn,
      login: this.login,
      logout: this.logout,
    };

    return (
      <AuthContext.Provider value={authContextValue}>
        {showingComponent}
      </AuthContext.Provider>
    );
  }
}

export default App;
