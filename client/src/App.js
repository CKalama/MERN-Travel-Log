import * as React from 'react';

//useEffect behaves as ComponentDidMount in that we can create a function that only runs once. 
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import {listLogEntries} from "./API";
import LogEntryForm from "./Components/LogEntryForm";


const App = () => {
  //creating a useState Hook, starting as an empty array. 
  const [logEntries, setLogEntries] = useState([])

  //useState Hook for Popup
  const [showPopup, setShowPopup] = useState({})

  //useState Hook for showAddMarkerPopUp
  const [addEntryLocation, setAddEntryLocation] = useState(null)

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 39.7577,
    longitude: -94.5786,
    zoom: 4
  });
  
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    //This logEntries is grabbing the const above, not the useState logEntries. 
    setLogEntries(logEntries)
  }

  //specifying an empty dependence array, this is where we will call from our backend.
  //because this is an async function, you cant call it in an effect. You need to make an "iife" an immedately invoked function expression... It will look like the function below if you write an async function elsewhere
  //(async () => {})();
  useEffect(() => {
    // (async () => {
    //   const logEntries = await listLogEntries();
    //   //This logEntries is grabbing the const above, not the useState logEntries. 
    //   setLogEntries(logEntries)
    //   //console.log(logEntries)
    // })();
    getEntries();   
  }, [])

  const showAddMarkerPopup = (event) => {
    //lngLat is coming from MapBox, we console logged it to ensure that when we double click that something will appear in the console. We have a lot of data but I targeted the long lat first.
    console.log(event);
    console.log(event.lngLat);
    const [ longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={"mapbox://styles/ckalama/cklsx5pnq1wh517o0xcovyl9q"}
      mapboxApiAccessToken = {"pk.eyJ1IjoiY2thbGFtYSIsImEiOiJja2xzdGZ6aXIwaDdrMnVsZHRnbnN6dGx5In0.V6e_7u3hYfvIVbMQ9fNDfA"}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      //Supported by MapBox GL, now whenever we double click we can actually write a function that will allow us to interact with the mapBox if we double click. 
      onDblClick={showAddMarkerPopup}
    >

    {logEntries.map(eachEntry => (
      //Because of the popup and we don't want to make another div, We can have multiple children with no Parent. Create a React Fragment, which will allow us to return it because we have two elements in the root. We could have used a div but this works just as fine.
      <React.Fragment key={eachEntry._id}>
      <Marker 
      
      latitude={eachEntry.latitude} 
      longitude={eachEntry.longitude} 
      offsetLeft={-20} offsetTop={-10}>

      
        <div 
        onClick={() => setShowPopup({
          ...showPopup, 
          [eachEntry._id] : true,
        })} >

        <img className="map-marker" src="https://i.imgur.com/y0G5YTX.png" alt='map-marker'/>
        </div>
      </Marker>


      {
        showPopup[eachEntry._id] ? (
          <Popup
          latitude={eachEntry.latitude}
          longitude={eachEntry.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          onClose={() => setShowPopup({})}
          anchor="top" >
          <h2>{eachEntry.title}</h2>
          <p>{eachEntry.comments}</p>
          {/* Date is a Javascript Method that allows us to post the date in a string if we add the right syntax */}
          <h4>Visited On: {new Date(eachEntry.visitDate).toLocaleDateString()}</h4>
          {eachEntry.image ? <img src={eachEntry.image}/> : null}
          {eachEntry.rating ? <h4>Rating: {eachEntry.rating}</h4> : null}
          </Popup>
        ) : null
      }
      </React.Fragment>
      ))}


      {/* Here we will bring in our AddPopUpMarker with a Ternary Operator. React Loves these Ternary Operators! */}
       {
         addEntryLocation ? (
           <>
        <Marker
        latitude={addEntryLocation.latitude} 
        longitude={addEntryLocation.longitude} 
        offsetLeft={-20} offsetTop={-10}>

      
          <div> 
            <img className="map-marker" src="https://i.imgur.com/y0G5YTX.png" alt='map-marker'/>
          </div>
          {/* <div>{eachEntry.title}</div> */}
      </Marker>

           <Popup
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          onClose={() => setAddEntryLocation(null)}
          anchor="top" >
          <div className="popup-form">
          <LogEntryForm 
          onClose={() => {
            setAddEntryLocation(null);
            getEntries();
          }}
          location={addEntryLocation}/>
          </div>
          </Popup>
           </>
         ) : null 
       } 
      
        
          
        
    
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