import React from "react";
import { useNavigate } from "react-router-dom";
import { getButton } from "../modules/Google/Status";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

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
    height: '80vh'
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
              <h2>Chick-fil-A</h2>
              <p>275 Joe Routt Blvd, College Station, TX 77843</p>
            </div>
        </InfoWindow>) : null}
      </GoogleMap>
    </div>;
  }

  return (
    <div>
      <label>Temporary Select Language Screen / Login Screen</label>
      <br/>
      {getButton()}
      <br/>
      <button
        onClick={() => {
            navigate("/home");
        }}
      >
        Go to Home Page
      </button>
      {map()}
    </div>
  );
}

export default Home;