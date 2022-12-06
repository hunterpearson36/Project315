import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../modules/Google/Translate";

function ErrorPage() {
    let navigate = useNavigate();

    return <div>
            <Translate text="ERROR! PAGE DOES NOT EXIST!"/>
            <br/>
            <button 
                onClick={() => {
                    navigate("/");
                }}
            >         
                <Translate text="Go to Home Page"/>
            </button>
        </div>
    
}

export default ErrorPage;