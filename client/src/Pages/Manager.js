import React from "react";
import {useNavigate} from "react-router-dom";

function Manager() {
    let navigate = useNavigate();
    return (
        <div>
            Manager GUI
            <br/>
            <button 
                onClick={() => {
                navigate("/manager/item_structures-table");
                }}
            >         
            Go to Items Table
            </button>

            <button 
                onClick={() => {
                navigate("/manager/ingredients-table");
                }}
            >         
            Go to Ingredients Table
            </button>
            <br/>
            <button 
                onClick={() => {
                navigate("/");
                }}
            >         
            Back to Home Page
            </button>
        </div>

          
        
    );
}

export default Manager;