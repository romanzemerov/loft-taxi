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

const LINK_TO_COMPONENT = {
  map: <Map />,
  profile: <Profile />,
  login: <Login />,
};

export class App extends Component {
  state = {
    navigation: NAVIGATION,
    pathname: window.location.pathname,
  };

  getShowingComponent = () => {
    const { pathname } = this.state;

    return LINK_TO_COMPONENT[pathname.slice(1)] || <Map />;
  };

  handleChangePathname = (e) => {
    e.preventDefault();
    const pathname = e.target.pathname;

    this.setState({ pathname });

    this.setState(({ navigation }) => {
      const href = pathname.slice(1);

      const newNavigation = navigation.reduce((acc, item) => {
        if (item.href === href) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }

        return [...acc, item];
      }, []);

      return { navigation: newNavigation };
    });
  };

  componentDidUpdate() {
    const { pathname } = this.state;
    window.history.pushState({}, null, pathname);
  }

  render() {
    const { navigation } = this.state;
    const component = this.getShowingComponent();

    return (
      <>
        <Header navItems={navigation} handleClick={this.handleChangePathname} />
        {component}
      </>
    );
  }
}
