import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../modules/Google/Translate";

function OrderPlaced() {
    let navigate = useNavigate();
    return( 
        <div>
            <Translate text={`You order ${window.orderId} has been placed. Thank you!`}/>
            <br/>
            <button 
                onClick={() => {
                    navigate("/");
                }}
            >         
                <Translate text="Return Home"/>
            </button>
        </div>
    );
}

export default OrderPlaced;