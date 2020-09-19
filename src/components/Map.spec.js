import React from 'react';
import { render } from '@testing-library/react';
import { Map } from 'components/Map';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe('Map', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Map />);

    expect(getByTestId('mapSection')).toBeInTheDocument();
  });
});
