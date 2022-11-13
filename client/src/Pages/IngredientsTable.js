import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

const IngredientsTable = () => {
  let navigate = useNavigate();
  const [ingredients, setIngred] = useState([]);
  
  const getIngred = async () => {
    await sendQuery("SELECT * from ingredients where ingred_id < 2000 order by ingred_id;")
      .then((response) => {
        console.log("received response");
        setIngred(response);
      }).catch((error) => {
        console.error(error.message);
      })
  }

  const updateData = async (statement) => {
    await sendUpdate(statement)
      .then((response) => {
        console.log("received response");
      }).catch((error) => {
        console.error(error.message);
      });
  }

  function deleteIngredient(){
    var ingredName = document.getElementById("delete").value;
    if(ingredName.length === 0){
      document.getElementById("deleteMessage").innerHTML = "Please enter the ingredient name to be deleted";
      return;
    }
    var rows = document.getElementsByClassName("ingreds")
    var found = 0;
    for(var i = 0; i < rows.length; i++){
      if(found === 0){
        if(rows[i].id === ingredName){
          document.getElementById("deleteMessage").innerHTML = ingredName +  " has been deleted";
          rows[i].parentNode.removeChild(rows[i]);
          found++;
          //updateData("DELETE FROM ingredients WHERE ingred_name = '" + ingredName + "' and ingred_id < 2000;")
        }
      }
    }
    if(found === 0){
      document.getElementById("deleteMessage").innerHTML = "No ingredient with name " + ingredName + " has been found";
    }
  }

  useEffect(() => {
    getIngred();
  }, []);

    return (
        <div>
            <p>Ingredients:</p>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button> <br/> 
            <label>Delete Ingredient: </label>
            <input type="text" placeholder="Ingredient Name" id="delete"/> 
            <button
              onClick={() => {
                deleteIngredient();
              }}
            >
              Delete Ingredient
            </button> <p id="deleteMessage">NOTE: The code to actually delete it from the database is currently commented out but it has been verified to actually works</p>
            <br/>
            <table>
              <tbody>
                {ingredients.map(item => (
                <tr class="ingreds" id={item.ingred_name}>
                    <td width = "200">{item.ingred_name}</td>
                    <td width = "50">{item.ingred_qty}</td>
                    <td width = "100"><input type = "text" placeholder="" name="update"/></td>
                    <td width = "130"><button>Update Quantity</button></td>
                    
                </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default IngredientsTable;