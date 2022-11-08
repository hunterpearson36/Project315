import React from "react";
import {useNavigate} from "react-router-dom";

function Manager() {
    let navigate = useNavigate();
    return (
        <div>
            Manager GUI
            <button 
                onClick={() => {
                navigate("/manager/item_structures-table");
                }}
            >         
            Go to item structures list
            </button>

            <button 
                onClick={() => {
                navigate("/manager/ingredients-table");
                }}
            >         
            Go to ingredients list
            </button>
        </div>

          
        
    );
}

export default Manager;