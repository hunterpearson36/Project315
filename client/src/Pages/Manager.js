import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery } from "../modules/Query";

function Manager() {
    let navigate = useNavigate();


    const getIngred = async () => {
        await sendQuery("SELECT * from ingredients where ingred_id < 2000 order by ingred_id;")
          .then((response) => {
            console.log("received response");
            window.ingred = response;
          }).catch((error) => {
            console.error(error.message);
          })
      }

    const getItems = async () => {
        await sendQuery("SELECT * from item_structures order by structure_id;")
        .then((response) => {
            console.log("received response");
            window.itm = response;
        }).catch((error) => {
            console.error(error.message);
        });
    }

    const getRestock = async () => {
        await sendQuery("SELECT * from restock order by restock_id;")
        .then((response) => {
            console.log("received response");
            window.restock = response;
        }).catch((error) => {
            console.error(error.message);
        });
    }

      useEffect(() => {
        getIngred();
        getItems();
        getRestock();
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