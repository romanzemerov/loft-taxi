import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { makeStyles } from '@material-ui/core/styles';
import { withHeader } from 'HOCs/withHeader';

const useStyles = makeStyles({
  map: {
    minHeight: 'calc(100vh - 68px)',
  },
});

mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9tYW56ZW1lcm92IiwiYSI6ImNrZjRlcGdhcDBjY3IyeHA5Mzl3aHk4NncifQ.CVAivYa4dl9DMVGJUoqMTg';

const Map = () => {
  const classes = useStyles();
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
    <>
      <div
        className={classes.map}
        ref={mapContainerRef}
        data-testid={'mapSection'}
      >
        Карта
      </div>
    </>
  );
};

export default withHeader(Map);
