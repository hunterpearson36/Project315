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
                    navigate("/manager/items-table");
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
                    navigate("/manager/add-item");
                }}
            >         
            Add New Item
            </button>
            <button 
                onClick={() => {
                    navigate("/manager/add-ingredient");
                }}
            >         
            Add New Ingredient
            </button>
            <br/>
            <button 
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >         
            Go To Reports Section
            </button>
            <br/>
            <button 
                onClick={() => {
                    navigate("/home");
                }}
            >         
            Back to Home Page
            </button>
        </div>

          
        
    );
}

export default Manager;