import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import InfoBox from 'components/InfoBox';
import { TextField } from '@material-ui/core';
import {
  getAddresses,
  getIsLoading,
  getIsAddressesLoaded,
} from 'redux/addresses/reducers';
import { getRoute } from 'redux/route/reducers';
import { getAddressesRequest } from 'redux/addresses/actions';
import { getRouteRequest, resetRoute } from 'redux/route/actions';
import PropTypes from 'prop-types';
import { StyledWrapper, StyledAutocomplete, StyledButton } from './Styled';

const RouteChoicer = ({
  isLoading,
  addresses,
  isAddressesLoaded,
  routeCoords,
  getAddressesRequest,
  getRouteRequest,
  resetRoute,
}) => {
  const [fromAddress, setFromAddress] = useState(null);
  const [toAddress, setToAddress] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filterAutocompleteOptions = (options) => {
    return options
      ? options.filter(
          (address) => address !== toAddress && address !== fromAddress,
        )
      : options;
  };

  const handleFromAddressChange = (event, value) => {
    setFromAddress(value);
  };

  const handleToAddressChange = (event, value) => {
    setToAddress(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRouteRequest({ fromAddress, toAddress });
  };

  const resetSubmit = () => {
    resetRoute();
    setOrderPlaced(false);
    setFromAddress(null);
    setToAddress(null);
  };

  useEffect(() => {
    if (!isAddressesLoaded) {
      getAddressesRequest();
    }
  }, [isAddressesLoaded, getAddressesRequest]);

  useEffect(() => {
    if (routeCoords) {
      setOrderPlaced(true);
    }
  }, [routeCoords, setOrderPlaced]);

  return (
    <>
      {orderPlaced ? (
        <InfoBox type={'orderPlaced'} onClickButton={resetSubmit} />
      ) : (
        <StyledWrapper elevation={3}>
          <form onSubmit={handleSubmit}>
            <StyledAutocomplete
              id={'fromAddress'}
              name={'fromAddress'}
              options={addresses}
              renderInput={(params) => <TextField {...params} label="Откуда" />}
              filterOptions={filterAutocompleteOptions}
              value={fromAddress}
              onChange={handleFromAddressChange}
              disabled={isLoading}
            />
            <StyledAutocomplete
              id={'toAddress'}
              name={'toAddress'}
              options={addresses}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label="Куда" />}
              filterOptions={filterAutocompleteOptions}
              value={toAddress}
              onChange={handleToAddressChange}
              disabled={isLoading}
            />
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth
            >
              Вызвать такси
            </StyledButton>
          </form>
        </StyledWrapper>
      )}
    </>
  );
};

RouteChoicer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAddressesLoaded: PropTypes.bool.isRequired,
  routeCoords: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.array).isRequired,
    PropTypes.instanceOf(null),
  ]),
  getAddressesRequest: PropTypes.func.isRequired,
  getRouteRequest: PropTypes.func.isRequired,
  getRoute: PropTypes.func.isRequired,
  resetRoute: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  addresses: getAddresses(state),
  isAddressesLoaded: getIsAddressesLoaded(state),
  routeCoords: getRoute(state),
});

const mapDispatchToProps = {
  getAddressesRequest,
  getRouteRequest,
  getRoute,
  resetRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteChoicer);
