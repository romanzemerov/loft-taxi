import React, { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route path={path} {...rest}>
      {isLoggedIn ? <Component /> : <Redirect to={'/'} />}
    </Route>
  );
};

export default PrivateRoute;
