import React from "react";
import {useNavigate} from "react-router-dom";

function OrderPlaced() {
    let navigate = useNavigate();
    return( 
        <div>
            Your order(#{window.orderId}) has been placed. Thank You! <br/>
            <button 
                onClick={() => {
                    navigate("/");
                }}
            >         
          Return Home
        </button>
        </div>
    );
}

export default OrderPlaced;