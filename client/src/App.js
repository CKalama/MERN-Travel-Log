import * as React from 'react';

//useEffect behaves as ComponentDidMount in that we can create a function that only runs once. 
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import {listLogEntries} from "./API";

const App = () => {
  //creating a useState Hook, starting as an empty array. 
  const [logEntries, setLogEntries] = useState([])

  //useState Hook for Popup
  const [showPopup, setShowPopup] = useState({})

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
      //Because of the popup and we don't want to make another div, we will create a React Fragment, which will allow us to return it because we have two elements in the root. We could have used a div but this works just as fine.
      <>
      <Marker 
      key={eachEntry._id}
      latitude={eachEntry.latitude} 
      longitude={eachEntry.longitude} 
      offsetLeft={-20} offsetTop={-10}>

      
        <div 
        onClick={() => setShowPopup({
          ...showPopup, 
          [eachEntry._id] : true,
        })}
        >
        <img className="map-marker" src="https://i.imgur.com/y0G5YTX.png" alt='map-marker'/>

        </div>
          {/* <div>{eachEntry.title}</div> */}
      </Marker>
      {
        showPopup[eachEntry._id] ? (
          <Popup
          latitude={eachEntry.latitude}
          longitude={eachEntry.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup({showPopup: false})}
          anchor="top" >
          <h2>{eachEntry.title}</h2>
          <p>{eachEntry.comments}</p>
          </Popup>
        ) : null
      }
      {/* Ending of Reach Fragment below */}
      </>
      ))}
        
      
        
          
        
    
    </ReactMapGL>
  );
}


export default App;










///Original icon that I used for Map marker 
{/* <svg 
      className="map-marker" 
      viewBox="0 0 24 24"
      stroke-width="2" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      ><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> */}