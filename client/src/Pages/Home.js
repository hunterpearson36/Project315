import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

import { getCookie } from "../modules/Cookies/CookieFunctions"
import { isLoggedIn } from "../modules/Google/Status";

import Translate from "../modules/Google/Translate";

function Home() {
  let navigate = useNavigate();

  function isEmployee(){
    var name = getCookie("USER_NAME");
    for(var i = 0; i < window.employee.length; i++){
        if(window.employee[i].employee_name === name){
            window.employeeName = name;
            return true;
        }
    }
    return false;
}

function isManager(){
    for(var i = 0; i < window.employee.length; i++){
        if(window.employee[i].employee_is_admin === true){
            return true;
        }
    }
    return false;
}

  const [selected, setSelected] = React.useState(null);

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

  function permRoutes() {
    if (isLoggedIn()) {
      if(isEmployee()){
        if(isManager()){
          return (
            <div>
              <center>
                <label class = "welcome"><Translate text = "Welcome"/> {getCookie("USER_GIVEN_NAME")}!</label>
                <br/>
                <button class = "gui"
                  onClick={() => {
                    navigate("/customer");
                  }}
                >
                  <Translate text="Order As Customer"/>
                </button>
                <button class = "gui"
                  onClick={() => {
                    navigate("/server");
                  }}
                >
                  <Translate text="Take Customer Order"/>
                </button>
      
                <button class = "gui"
                  onClick={() => {
                    navigate("/manager");
                  }}
                >
                  <Translate text="Manager Menu"/>
                </button>
              </center>
            </div>
          );
        }
        else{
          return (
            <div>
              <center>
                <label class = "welcome"><Translate text = "Welcome"/> {getCookie("USER_GIVEN_NAME")}!</label>
                <br/>
                <button class = "gui"
                  onClick={() => {
                    navigate("/customer");
                  }}
                >
                  <Translate text="Order As Customer"/>
                </button>
                <button class = "gui"
                  onClick={() => {
                    navigate("/server");
                  }}
                >
                  <Translate text="Take Customer Order"/>
                </button>
              </center>
            </div>
          );
        }
      }
      else{
        return(
          <div>
            <center>
              <label class = "welcome"><Translate text = "Welcome"/> {getCookie("USER_GIVEN_NAME")}!</label>
              <br/>
              <button class = "gui"
                onClick={() => {
                  navigate("/customer");
                }}
              >
                <Translate text="Start Your Order"/>
              </button>
            </center>
          </div>
        );
      }
      
    }
    return (
      <div>
        <center>
          <button class = "gui"
            onClick={() => {
              navigate("/customer");
            }}
          >
            <Translate text="Start Your Order"/>
          </button>
        </center>
      </div>


    );
  }

  return (
    <div>
      <center><img src = "https://logo.clearbit.com/cfabristol.com" alt = "Chick-fil-A"/></center>
      {permRoutes()}
      <center>
        <button class = "gui"
          onClick={() => {
            navigate("/");
          }}
        >
            <Translate text="Back to Login"/>
        </button>
      </center>
      {map()}
    </div>
  );
}

export default Home;