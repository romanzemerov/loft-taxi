import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import RouteChoicer from './components/RouteChoicer';
import s from './MapPage.module.sass';
import InfoBox from 'components/InfoBox';
import { getIsCardExist } from 'redux/profile/reducers';

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9tYW56ZW1lcm92IiwiYSI6ImNrZjRlcGdhcDBjY3IyeHA5Mzl3aHk4NncifQ.CVAivYa4dl9DMVGJUoqMTg';

const MapPage = ({ isCardExist }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/romanzemerov/ckf4es8aq1l3j19n5iz5mhxkm',
      center: [36.58, 50.59],
      zoom: 9,
    });

    return () => map.remove();
  }, []);

  return (
    <div className={s.page} data-testid={'mapSection'}>
      <div className={s.panel}>
        {isCardExist ? <RouteChoicer /> : <InfoBox type={'noCard'} />}
      </div>
      <div className={s.map} ref={mapContainerRef}>
        Карта
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isCardExist: getIsCardExist(state),
});

export default connect(mapStateToProps, null)(MapPage);
