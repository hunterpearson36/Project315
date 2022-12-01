import React from "react";
import { useNavigate } from "react-router-dom";


import { getCookie } from "../modules/Cookies/CookieFunctions"
import { isLoggedIn } from "../modules/Google/Status";

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
              <p>
                Welcome {getCookie("USER_NAME") /*user cookies are safe if this returns true*/}!
              </p>
              <button className = "customer"
                onClick={() => {
                  navigate("/customer");
                }}
              >
                Change to Customer GUI
              </button>
              <button
                onClick={() => {
                  navigate("/server");
                }}
              >
                Change to Server GUI
              </button>
    
              <button
                onClick={() => {
                  navigate("/manager");
                }}
              >
                Change to Manager GUI
              </button>
            </div>
          );
        }
        else{
          return (
            <div>
              <p>
                Welcome {getCookie("USER_NAME") /*user cookies are safe if this returns true*/}!
              </p>
              <button className = "customer"
                onClick={() => {
                  navigate("/customer");
                }}
              >
                Change to Customer GUI
              </button>
              <button
                onClick={() => {
                  navigate("/server");
                }}
              >
                Change to Server GUI
              </button>
            </div>
          );
        }
      }
      else{
        return(
          <div>
            <button className = "customer"
              onClick={() => {
                navigate("/customer");
              }}
            >
              Change to Customer GUI
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
          Change to Customer GUI
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
          Back to Login
        </button>
    </div>
  );
}

export default Home;