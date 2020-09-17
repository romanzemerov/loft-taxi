import React from 'react';
import { render } from '@testing-library/react';
import Map from 'components/Map';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));

describe('Map', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <Map currentPage={'map'} handleChangePage={() => {}} />,
    );

    expect(getByTestId('mapSection')).toBeInTheDocument();
  });
});
