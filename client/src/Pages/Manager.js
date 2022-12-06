import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../modules/Google/Translate";

function Manager() {
    let navigate = useNavigate();

    return (
        <div>
            <Translate text="Manager Menu"/>
            <br/>
            <button 
                onClick={() => {
                    navigate("/manager/items-table");
                }}
            >         
            <Translate text="Go to Items Table"/>
            </button>

            <button 
                onClick={() => {
                    navigate("/manager/ingredients-table");
                }}
            >         
            <Translate text="Go to Ingredients Table"/>
            </button>
            <br/>
            <button 
                onClick={() => {
                    navigate("/manager/add-item");
                }}
            >         
            <Translate text="Add New Item"/>
            </button>
            <button 
                onClick={() => {
                    navigate("/manager/add-ingredient");
                }}
            >         
            <Translate text="Add New Ingredient"/>
            </button>
            <br/>
            <button 
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >         
            <Translate text="Go To Reports Section"/>
            </button>
            <br/>
            <button 
                onClick={() => {
                    navigate("/home");
                }}
            >         
            <Translate text="Back to Home Page"/>
            </button>
        </div>

          
        
    );
}

export default Manager;