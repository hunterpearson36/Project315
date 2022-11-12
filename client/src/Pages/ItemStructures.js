import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

const ItemStructures = () => {

  let navigate = useNavigate();
  const [items, setItems] = useState([]);
  
  const getItems = async () => {
    await sendQuery("SELECT * from item_structures order by structure_id;")
      .then((response) => {
        console.log("received response");
        setItems(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }

  const updateData = async (statement) => {
    await sendUpdate(statement)
      .then((response) => {
        console.log("received response");
      }).catch((error) => {
        console.error(error.message);
      });
  }

  function deleteItem(){
    var itemName = document.getElementById("delete").value;
    var rows = document.getElementsByClassName("items")
    var found = 0;
    for(var i = 0; i < rows.length; i++){
      if(found === 0){
        if(rows[i].id === itemName){
          document.getElementById("deleteMessage").innerHTML = itemName +  " has been deleted";
          rows[i].parentNode.removeChild(rows[i]);
          found++;
          //updateData("DELETE FROM item_structures WHERE structure_name = '" + itemName + "';")
        }
      }
    }
    if(found === 0){
      document.getElementById("deleteMessage").innerHTML = "No item with name " + itemName + " has been found";
    }
  }

  useEffect(() => {
    getItems();
  }, []);

    return (
        <div>
            <p>Item:</p>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button> <br/> 
            <label>Delete Item: </label>
            <input type="text" placeholder="Item Name" id="delete"/> 
            <button
              onClick={() => {
                deleteItem();
              }}
            >
              Delete Item
            </button> <p id="deleteMessage">NOTE: The code to actually delete it from the database is currently commented out but it has been verified to actually works</p>
            <br/>
            <table>
              <tbody>
                {items.map(item => (
                <tr class="items" id={item.structure_name}>
                    <td width = "200">{item.structure_name}</td>
                    <td width = "50">{item.structure_price}</td>
                    <td width = "100"><input type = "text" placeholder="" name="update"/></td>
                    <td width = "130"><button>Update Price</button></td>
                    
                </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default ItemStructures;