import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loginRequest } from 'redux/auth/actions';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, path, isLoggedIn, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
