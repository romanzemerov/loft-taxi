import React, { Component } from 'react';
import { Header } from 'components/Header';
import { Map } from 'components/Map';
import { Profile } from 'components/Profile';
import { Login } from 'components/Login';
import { Signup } from 'components/Signup';
import './App.css';

export class App extends Component {
  state = {
    currentPage: window.location.pathname.slice(1),
  };

  getShowingComponent = () => {
    const PAGE_TO_COMPONENT = {
      map: <Map />,
      profile: <Profile />,
      login: <Login handleChangePage={this.handleChangePage} />,
      signup: <Signup handleChangePage={this.handleChangePage} />,
    };

    const { currentPage } = this.state;

    return PAGE_TO_COMPONENT[currentPage] || <Map />;
  };

  handleChangePage = (newPageName) => {
    this.setState({ currentPage: newPageName });
  };

  componentDidUpdate() {}

  render() {
    const { currentPage } = this.state;
    const showingComponent = this.getShowingComponent();

    return (
      <>
        <Header
          currentPage={currentPage}
          handleChangePage={this.handleChangePage}
        />
        {showingComponent}
      </>
    );
  }
}
