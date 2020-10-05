import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/Header';

const PrivateRoute = ({ component: Component, path, isLoggedIn, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <>
            <Header {...props} />
            <Component {...props} />
          </>
        ) : (
          <Redirect to={'/'} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });

export default connect(mapStateToProps, null)(PrivateRoute);
