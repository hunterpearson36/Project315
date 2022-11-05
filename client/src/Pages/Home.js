import React from "react";
import {useNavigate} from "react-router-dom";

function Home() {
    let navigate = useNavigate();
    return(
      <div>
        <button 
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

export default Home;




