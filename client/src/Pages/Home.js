import React from "react";
import { useNavigate } from "react-router-dom";


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

  function permRoutes() {
    if (isLoggedIn()) {
      if(isEmployee()){
        if(isManager()){
          return (
            <div>
              <Translate text = "Welcome"/> {getCookie("USER_GIVEN_NAME")}
              <br/>
              <button className = "customer"
                onClick={() => {
                  navigate("/customer");
                }}
              >
                <Translate text="Order As Customer"/>
              </button>
              <button
                onClick={() => {
                  navigate("/server");
                }}
              >
                <Translate text="Take Customer Order"/>
              </button>
    
              <button
                onClick={() => {
                  navigate("/manager");
                }}
              >
                <Translate text="Manager Menu"/>
              </button>
            </div>
          );
        }
        else{
          return (
            <div>
              <Translate
                text = {
                  "Welcome " + 
                  getCookie("USER_GIVEN_NAME")
                }
              />
              <button className = "customer"
                onClick={() => {
                  navigate("/customer");
                }}
              >
                <Translate text="Order As Customer"/>
              </button>
              <button
                onClick={() => {
                  navigate("/server");
                }}
              >
                <Translate text="Take Customer Order"/>
              </button>
            </div>
          );
        }
      }
      else{
        return(
          <div>
            <Translate
              text = {
                "Welcome " + 
                getCookie("USER_GIVEN_NAME")
              }
            />
            <button className = "customer"
              onClick={() => {
                navigate("/customer");
              }}
            >
              <Translate text="Start Your Order"/>
            </button>
      </div>
        );
      }
      
    }
    return (
      <div>
        <button className = "customer"
          onClick={() => {
            navigate("/customer");
          }}
        >
          <Translate text="Start Your Order"/>
        </button>
      </div>


    );
  }

  return (
    <div>
      {permRoutes()}
      <button className = "customer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Translate text="Back to Login"/>
        </button>
    </div>
  );
}

export default Home;