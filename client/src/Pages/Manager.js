import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery } from "../modules/Query";

function Manager() {
    let navigate = useNavigate();
    const [ingredients, setIngred] = useState([]);

    const getIngred = async () => {
        await sendQuery("SELECT * from ingredients where ingred_id < 2000 order by ingred_id;")
          .then((response) => {
            console.log("received response");
            setIngred(response);
            window.ingred = response;
          }).catch((error) => {
            console.error(error.message);
          })
      }

      useEffect(() => {
        getIngred();
      }, []);

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
                navigate("/");
                }}
            >         
            Back to Home Page
            </button>
        </div>

          
        
    );
}

export default Manager;