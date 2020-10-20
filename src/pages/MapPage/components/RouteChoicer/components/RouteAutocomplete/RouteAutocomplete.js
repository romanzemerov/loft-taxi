import React from 'react';
import { StyledAutocomplete } from './Styled';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const RouteAutocomplete = ({ options, formData }) => {
  const { name, label, isLoading, addresses } = options;
  const { control, error, trigger, getValues } = formData;

  const filterOptions = (options) => {
    return options
      ? options.filter(
          (address) =>
            address !== getValues('toAddress') &&
            address !== getValues('fromAddress'),
        )
      : options;
  };

  return (
    <Controller
      name={name}
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
              label={label}
              error={!!error}
              helperText={error?.message}
              required
            />
          )}
          filterOptions={filterOptions}
          value={value}
          onChange={(_, value) => {
            onChange(value);
            trigger(name);
          }}
          disabled={isLoading}
        />
      )}
    />
  );
};

RouteAutocomplete.propTypes = {
  options: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addresses: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  formData: PropTypes.shape({
    control: PropTypes.object.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.instanceOf(undefined),
    ]),
    trigger: PropTypes.func.isRequired,
    getValues: PropTypes.func.isRequired,
  }),
};

export default RouteAutocomplete;
