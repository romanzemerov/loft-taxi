import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import InfoBox from 'components/InfoBox';
import {
  getAddresses,
  getIsAddressesLoaded,
  getIsLoading,
} from 'redux/addresses/selectors';
import { getRoute } from 'redux/route/selectors';
import { getAddressesRequest } from 'redux/addresses/actions';
import { getRouteRequest, resetRoute } from 'redux/route/actions';
import PropTypes from 'prop-types';
import { StyledButton, StyledWrapper } from './Styled';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RouteAutocomplete from './components/RouteAutocomplete';

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
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { handleSubmit, errors, control, trigger, getValues, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

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
            <RouteAutocomplete
              options={{
                name: 'fromAddress',
                label: 'Откуда',
                isLoading,
                addresses,
              }}
              formData={{
                control,
                error: errors.fromAddress,
                trigger,
                getValues,
              }}
            />

            <RouteAutocomplete
              options={{
                name: 'toAddress',
                label: 'Куда',
                isLoading,
                addresses,
              }}
              formData={{
                control,
                error: errors.toAddress,
                trigger,
                getValues,
              }}
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
