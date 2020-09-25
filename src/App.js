import React from 'react';
import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import ProfilePage from 'pages/ProfilePage';
import MapPage from 'pages/MapPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path={'/'} exact>
            <LoginPage />
          </Route>
          <Route path={'/login'}>
            <LoginPage />
          </Route>
          <Route path={'/signup'}>
            <SignupPage />
          </Route>
          <PrivateRoute path={'/map'} component={MapPage} />
          <PrivateRoute path={'/profile'} component={ProfilePage} />
          <Redirect to={'/'} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
