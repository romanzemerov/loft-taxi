import React, { PureComponent } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import RouteChoicer from './components/RouteChoicer';
import InfoBox from 'components/InfoBox';
import { getIsCardExist } from 'redux/profile/reducers';
import { getRoute } from 'redux/route/reducers';
import { drawRoute } from 'pages/MapPage/helpers/drawRoute';
import s from './MapPage.module.sass';

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9tYW56ZW1lcm92IiwiYSI6ImNrZjRlcGdhcDBjY3IyeHA5Mzl3aHk4NncifQ.CVAivYa4dl9DMVGJUoqMTg';

class MapPage extends PureComponent {
  map = null;
  mapContainer = React.createRef();

  componentDidMount() {
    const { routeCoords } = this.props;

    this.map = new mapboxgl.Map({
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
    let { isCardExist } = this.props;

    return (
      <div className={s.page} data-testid={'mapSection'}>
        <div className={s.panel}>
          {isCardExist ? <RouteChoicer /> : <InfoBox type={'noCard'} />}
        </div>
        <div className={s.map} ref={this.mapContainer}>
          Карта
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isCardExist: getIsCardExist(state),
  routeCoords: getRoute(state),
});

export default connect(mapStateToProps, null)(MapPage);
