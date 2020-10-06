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
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  fromAddress: yup
    .string()
    .default(null)
    .required('Обязательное для заполнения поле')
    .nullable(),
  toAddress: yup
    .string()
    .default(null)
    .required('Обязательное для заполнения поле')
    .nullable(),
});

const RouteChoicer = ({
  isLoading,
  addresses,
  isAddressesLoaded,
  routeCoords,
  getAddressesRequest,
  getRouteRequest,
  resetRoute,
}) => {
  const { handleSubmit, errors, control, trigger, getValues, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filterAutocompleteOptions = (options) => {
    return options
      ? options.filter(
          (address) =>
            address !== getValues('toAddress') &&
            address !== getValues('fromAddress'),
        )
      : options;
  };

  const onSubmit = (data) => {
    getRouteRequest(data);
  };

  const resetSubmit = () => {
    resetRoute();
    setOrderPlaced(false);
    reset({
      fromAddress: null,
      toAddress: null,
    });
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
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={'fromAddress'}
              control={control}
              defaultValue={null}
              render={({ onChange, value, name }) => (
                <StyledAutocomplete
                  id={name}
                  name={name}
                  options={addresses}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Откуда"
                      error={!!errors.fromAddress}
                      helperText={errors?.fromAddress?.message}
                      required
                    />
                  )}
                  filterOptions={filterAutocompleteOptions}
                  value={value}
                  onChange={(_, value) => {
                    onChange(value);
                    trigger(name);
                  }}
                  disabled={isLoading}
                />
              )}
            />
            <Controller
              name={'toAddress'}
              control={control}
              defaultValue={null}
              render={({ onChange, value, name }) => (
                <StyledAutocomplete
                  id={name}
                  name={name}
                  options={addresses}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Куда"
                      error={!!errors.toAddress}
                      helperText={errors?.toAddress?.message}
                      required
                    />
                  )}
                  filterOptions={filterAutocompleteOptions}
                  value={value}
                  onChange={(_, value) => {
                    onChange(value);
                    trigger(name);
                  }}
                  disabled={isLoading}
                />
              )}
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
