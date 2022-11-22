import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    let navigate = useNavigate();

    return(
      <div>
        <button class = "customer"
          onClick={() => {
            navigate("/customer");
          }}
        >         
          Change to Customer GUI
        </button>

        <button class = "other"
          onClick={() => {
            navigate("/server");
          }}
        >         
          Change to Server GUI
        </button>

        <button class = "other"
          onClick={() => {
            navigate("/manager");
          }}
        >         
          Change to Manager GUI
        </button>
      </div>
    );
}

export default Home;




