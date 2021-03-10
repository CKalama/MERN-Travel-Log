import * as React from 'react';
//useEffect behaves as ComponentDidMount in that we can create a function that only runs once. 
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import {listLogEntries} from "./API";

const App = () => {
  //creating a useState Hook, starting as an empty array. 
  const [logEntries, setLogEntries] = useState([])

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 39.7577,
    longitude: -94.5786,
    zoom: 4
  });
  
  //specifying an empty dependence array, this is where we will call from our backend.
  //because this is an async function, you cant call it in an effect. You need to make an "iife" an immedately invoked function expression... It will look like the function below if you write an async function elsewhere
  //(async () => {})();
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      //This logEntries is grabbing the const above, not the useState logEntries. 
      setLogEntries(logEntries)
      //console.log(logEntries)
    })();   
  }, [])

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={"mapbox://styles/ckalama/cklsx5pnq1wh517o0xcovyl9q"}
      mapboxApiAccessToken = {"pk.eyJ1IjoiY2thbGFtYSIsImEiOiJja2xzdGZ6aXIwaDdrMnVsZHRnbnN6dGx5In0.V6e_7u3hYfvIVbMQ9fNDfA"}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >

    {logEntries.map(eachEntry => (
      <Marker 
      key={eachEntry._id}
      latitude={eachEntry.latitude} 
      longitude={eachEntry.longitude} 
      offsetLeft={-20} offsetTop={-10}>

        <div>{eachEntry.title}</div>

      </Marker>
      
      ))}
    
    </ReactMapGL>
  );
}


export default App;