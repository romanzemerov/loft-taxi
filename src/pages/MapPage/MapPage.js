import React, { PureComponent } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import RouteChoicer from './components/RouteChoicer';
import InfoBox from 'components/InfoBox';
import { getCardRequest } from 'redux/profile/actions';
import { getUserToken } from 'redux/auth/selectors';
import {
  getIsCardExist,
  getIsCardLoaded,
  getIsCardLoading,
} from 'redux/profile/selectors';
import { getRoute } from 'redux/route/selectors';
import { drawRoute } from 'pages/MapPage/helpers/drawRoute';
import PropTypes from 'prop-types';
import { StyledPage, StyledMap, StyledPanel } from './Styled';

class MapPage extends PureComponent {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    const { token, routeCoords, getCardRequest, isCardLoaded } = this.props;

    if (!isCardLoaded) {
      getCardRequest({ token });
    }

    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1Ijoicm9tYW56ZW1lcm92IiwiYSI6ImNrZjRlcGdhcDBjY3IyeHA5Mzl3aHk4NncifQ.CVAivYa4dl9DMVGJUoqMTg',
      container: this.mapContainer.current,
      style: 'mapbox://styles/romanzemerov/ckf4es8aq1l3j19n5iz5mhxkm',
      center: [30.2656504, 59.8029126],
      zoom: 10,
    });

    this.map.on('load', () => {
      if (routeCoords) {
        drawRoute(this.map, this.props.routeCoords);
      }
    });
  }

  componentDidUpdate() {
    const { routeCoords } = this.props;

    if (this.map.getLayer('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }

    if (routeCoords) {
      drawRoute(this.map, routeCoords);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const { isCardExist, isCardLoading } = this.props;

    const getInfoPanel = () => {
      if (isCardLoading) {
        return null;
      }

      return (
        <StyledPanel>
          {isCardExist ? <RouteChoicer /> : <InfoBox type={'noCard'} />}
        </StyledPanel>
      );
    };

    return (
      <StyledPage data-testid={'mapSection'}>
        {getInfoPanel()}
        <StyledMap ref={this.mapContainer} />
      </StyledPage>
    );
  }
}

MapPage.propTypes = {
  token: PropTypes.string.isRequired,
  isCardLoading: PropTypes.bool.isRequired,
  isCardLoaded: PropTypes.bool.isRequired,
  isCardExist: PropTypes.bool.isRequired,
  routeCoords: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.array).isRequired,
    PropTypes.instanceOf(null),
  ]),
  getCardRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: getUserToken(state),
  isCardLoading: getIsCardLoading(state),
  isCardLoaded: getIsCardLoaded(state),
  isCardExist: getIsCardExist(state),
  routeCoords: getRoute(state),
});

const mapDispatchToProps = {
  getCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
