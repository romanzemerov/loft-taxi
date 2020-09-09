import React, { Component } from "react";
import { Header } from "components/Header";
import { Map } from "components/Map";
import { Profile } from "components/Profile";
import { Login } from "components/Login";
import "./App.css";

const NAVIGATION = [
  { label: "Карта", href: "map", isActive: true },
  { label: "Профиль", href: "profile", isActive: false },
  { label: "Логин", href: "login", isActive: false },
];


export class App extends Component {
  state = {
    navigation: NAVIGATION,
    pathname: window.location.pathname,
  };

  getShowingComponent = () => {
    const LINK_TO_COMPONENT = {
      map: <Map />,
      profile: <Profile />,
      login: <Login handleFormSubmit={this.handleFormSubmit} />,
    };

    const { pathname } = this.state;

    return LINK_TO_COMPONENT[pathname.slice(1)] || <Map />;
  };

  handleChangePathname = (pathname) => {
    this.setState({ pathname });

    this.setState(({ navigation }) => {
      const href = pathname.slice(1);

      const newNavigation = navigation.reduce((acc, item) => {
        item.isActive = item.href === href;
        return [...acc, item];
      }, []);

      return { navigation: newNavigation };
    });
  };

  handleFormSubmit = () => {
    this.handleChangePathname('/map')
  }

  componentDidUpdate() {
    const { pathname } = this.state;
    window.history.pushState({}, null, pathname);
  }

  render() {
    const { navigation } = this.state;
    const component = this.getShowingComponent();

    return (
      <>
        <Header navItems={navigation} handleChangePathname={this.handleChangePathname} />
        {component}
      </>
    );
  }
}
