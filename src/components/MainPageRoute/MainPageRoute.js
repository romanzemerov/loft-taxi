import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const MainPageRoute = ({ component: Component, path, isLoggedIn, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isLoggedIn ? <Redirect to={'/map'} /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps, null)(MainPageRoute);
