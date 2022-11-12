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
      }).then((response) => {
        buttonFunctionality();
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
  
  // functionality is running before the buttons are actually being generated.
  // Need to change it so that everything gets generated, then functionality is added
  function buttonFunctionality(){
    console.log("here")
    var buttons = document.getElementsByClassName("deleteButton");
    var buttonsCount = buttons.length;
    for (var i = 0 ; i < buttonsCount; i++){
      buttons[i].setAttribute("onclick", "DeleteRowFunction(this)");
      console.log(buttons[i]) 
    }
  }

  // this works
  window.DeleteRowFunction = function DeleteRowFunction(e) {
    var p = e.parentNode.parentNode;
    p.parentNode.removeChild(p); 
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
            </button><br/><br/>
            <table>
              <tbody>
                {ingredients.map(item => (
                <tr key={item.ingred_id}>
                    <td width = "180">
                        <button id = {item.ingred_id} className = "deleteButton">
                            DELETE INGREDIENT
                        </button>
                    </td>
                    {/* <td>{item.structure_id}</td> */}
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