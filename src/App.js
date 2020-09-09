import React, { Component } from "react";
import { Header } from "components/Header";
import "./App.css";

const NAVIGATION = [
  { label: "Карта", href: "map", isActive: true },
  { label: "Профиль", href: "#", isActive: false },
  { label: "Логин", href: "login", isActive: false },
];

export class App extends Component {
  state = { navigation: NAVIGATION };

  render() {
    const { navigation } = this.state;

    return <Header navItems={navigation} />;
  }
}
