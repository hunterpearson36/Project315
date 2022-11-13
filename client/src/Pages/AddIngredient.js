import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

const AddIngredient = () => {

    let navigate = useNavigate();

    return (
        <div>
            <label>Add New Ingredient:</label><br/>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button> <br/> 
        </div>
    );
}

export default AddIngredient;