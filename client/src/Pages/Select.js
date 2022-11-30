import React from "react";
import { useNavigate } from "react-router-dom";
import { getButton } from "../modules/Google/Status";

function Home() {
  let navigate = useNavigate();
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
    </div>
  );
}

export default Home;