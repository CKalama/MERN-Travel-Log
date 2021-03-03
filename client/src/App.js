import * as React from 'react';
//useEffect behaves as ComponentDidMount in that we can create a function that only runs once. 
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 39.7577,
    longitude: -94.5786,
    zoom: 4
  });
  
  //specifying an empty dependence array, this is where we will call from our backend.
  useEffect(() => {

  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={"mapbox://styles/ckalama/cklsx5pnq1wh517o0xcovyl9q"}
      mapboxApiAccessToken = {"pk.eyJ1IjoiY2thbGFtYSIsImEiOiJja2xzdGZ6aXIwaDdrMnVsZHRnbnN6dGx5In0.V6e_7u3hYfvIVbMQ9fNDfA"}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}


export default App;