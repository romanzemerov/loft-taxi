import React, { Component } from 'react';
import Map from 'components/Map';
import Profile from 'components/Profile';
import Login from 'components/Login';
import Signup from 'components/Signup';
import './App.css';

class App extends Component {
  state = {
    currentPage: window.location.pathname.slice(1),
  };

  getShowingComponent = () => {
    const { currentPage } = this.state;

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
      login: (
        <Login
          currentPage={currentPage}
          handleChangePage={this.handleChangePage}
        />
      ),
      signup: (
        <Signup
          currentPage={currentPage}
          handleChangePage={this.handleChangePage}
        />
      ),
    };

    return PAGE_TO_COMPONENT[currentPage] || <Login />;
  };

  handleChangePage = (newPageName) => {
    this.setState({ currentPage: newPageName });
  };

  render() {
    const showingComponent = this.getShowingComponent();
    return <>{showingComponent}</>;
  }
}

export default App;
