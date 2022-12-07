import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../modules/Google/Translate";

function Manager() {
    let navigate = useNavigate();

    return (
        <div>
            <center>
                <img src = "https://logo.clearbit.com/cfabristol.com" alt = "Chick-fil-A"/>
                <br/>
                <label class = "welcome"><Translate text = "Manager Menu"/></label>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/items-table");
                    }}
                >         
                <Translate text="Go to Items Table"/>
                </button>

                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/ingredients-table");
                    }}
                >         
                <Translate text="Go to Ingredients Table"/>
                </button>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/add-item");
                    }}
                >         
                <Translate text="Add New Item"/>
                </button>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/add-ingredient");
                    }}
                >         
                <Translate text="Add New Ingredient"/>
                </button>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/reports");
                    }}
                >         
                <Translate text="Go To Reports Section"/>
                </button>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/employee");
                    }}
                >         
                <Translate text="Go To Employee Table"/>
                </button>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/home");
                    }}
                >         
                <Translate text="Back to Home Page"/>
                </button>
            </center>
        </div>

          
        
    );
}

export default Manager;