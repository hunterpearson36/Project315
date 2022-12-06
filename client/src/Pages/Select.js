import React from "react";
import { useNavigate } from "react-router-dom";
import { getButton } from "../modules/Google/Status";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

import Translate from "../modules/Google/Translate";

function Home() {
  const [selected, setSelected] = React.useState(null);
  let navigate = useNavigate();

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  if(loadError) return "Error loading"
  if(!isLoaded) return "Loading Map"

  const mapContainerStyle = {
    width: '100vw',
    height: '75vh'
  }
  
  const center = {
    lat:30.6123082604976,
    lng:-96.34130764536478,
  }

  const options = {
    disableDefaultUI: true,
    zoomControl: true, 
  }


  function map(){
    return <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={17} center = {center} options = {options}>
        <Marker 
          position={center}
          onClick={() => {
              setSelected(true);
          }}
        />
        {selected ? (
          <InfoWindow position={center} 
            onCloseClick={() => {
                setSelected(null);
            }}
          >
            <div>
              <h2 class = "infowindow">Chick-fil-A</h2>
              <p class = "infowindow">275 Joe Routt Blvd, College Station, TX 77843</p>
            </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </div>;
  }

  return (
    <div>
      
      <center><img src = "https://logo.clearbit.com/cfabristol.com" alt = "Chick-fil-A"/></center>
      <h3><center><Translate text="Welcome to Chick-fil-A Online!"/></center></h3>
      <center><button
        onClick={() => {
            navigate("/home");
        }}
      >
        <Translate text="Proceed to Home Page"/>
      </button>
      <br/>
      {getButton()}
      </center>
      {map()}
    </div>
  );
}

export default Home;