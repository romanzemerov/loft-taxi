import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import InfoBox from 'components/InfoBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Paper, TextField, Button } from '@material-ui/core';
import { getAddresses, getIsLoading } from 'redux/addresses/reducers';
import { getRoute } from 'redux/route/reducers';
import { getAddressesRequest } from 'redux/addresses/actions';
import { getRouteRequest, resetRoute } from 'redux/route/actions';
import s from './RouteChoicer.module.sass';

const RouteChoicer = ({
  isLoading,
  addresses,
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
    getAddressesRequest();
  }, [getAddressesRequest]);

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
        <Paper elevation={3} className={s.wrapper}>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id={'fromAddress'}
              name={'fromAddress'}
              className={s.input}
              options={addresses}
              renderInput={(params) => <TextField {...params} label="Откуда" />}
              filterOptions={filterAutocompleteOptions}
              value={fromAddress}
              onChange={handleFromAddressChange}
              disabled={isLoading}
            />
            <Autocomplete
              id={'toAddress'}
              name={'toAddress'}
              className={s.input}
              options={addresses}
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label="Куда" />}
              filterOptions={filterAutocompleteOptions}
              value={toAddress}
              onChange={handleToAddressChange}
              disabled={isLoading}
            />
            <Button
              className={s.button}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Вызвать такси
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  addresses: getAddresses(state),
  routeCoords: getRoute(state),
});

const mapDispatchToProps = {
  getAddressesRequest,
  getRouteRequest,
  getRoute,
  resetRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteChoicer);