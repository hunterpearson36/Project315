import React from "react";
import { useNavigate } from "react-router-dom";


import { getCookie } from "../modules/Cookies/CookieFunctions"
import { getButton, isLoggedIn } from "../modules/Google/Status";

function Home() {
  let navigate = useNavigate();

  function permRoutes() {
    if (isLoggedIn()) {
      return (
        <div>
          <p>
            Welcome {getCookie("USER_GIVEN_NAME") /*user cookies are safe if this returns true*/}!
          </p>
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
    return (
      <div>
<<<<<<< HEAD
        <button className = "customer"
=======
        <button
>>>>>>> 8704c278 (Started some extremely simple OAUTH)
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
      {getButton()}
      {permRoutes()}
    </div>
  );
}

export default Home;




