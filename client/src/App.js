import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken = { process.env.REACT_APP_MAPBOX_TOKEN }
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}


export default App;