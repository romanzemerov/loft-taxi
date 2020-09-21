import React from 'react';
import Header from 'components/Header';

export const withHeader = (WrappedComponent) =>
  function withHeaderHOC(props) {
    return (
      <>
        <Header {...props} />
        <WrappedComponent />
      </>
    );
  };
