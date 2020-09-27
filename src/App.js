import React from 'react';
import PrivateRoute from 'components/PrivateRoute';
import MainPageRoute from 'components/MainPageRoute';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import ProfilePage from 'pages/ProfilePage';
import MapPage from 'pages/MapPage';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <MainPageRoute path={'/'} component={LoginPage} exact />
          <MainPageRoute path={'/login'} component={LoginPage} />
          <MainPageRoute path={'/signup'} component={SignupPage} />
          <PrivateRoute path={'/map'} component={MapPage} />
          <PrivateRoute path={'/profile'} component={ProfilePage} />
          <Redirect to={'/'} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
