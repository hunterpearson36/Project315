import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../modules/Query";

import Translate from "../modules/Google/Translate";

const ItemStructures = () => {

  let navigate = useNavigate();

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
    if(itemName.length === 0){
      document.getElementById("updateMessage").innerHTML = "Please enter the item name to be deleted";
      return;
    }
    var rows = document.getElementsByClassName("items")
    var found = 0;
    for(var i = 0; i < rows.length; i++){
      if(found === 0){
        if(rows[i].childNodes[0].innerHTML.substring(5, rows[i].childNodes[0].innerHTML.length - 6) === itemName){
          var name = rows[i].childNodes[0].id;
          document.getElementById("updateMessage").innerHTML = itemName +  " has been deleted";
          rows[i].parentNode.removeChild(rows[i]);
          found++;
          window.itm.splice(i,1);
          updateData("DELETE FROM item_structures WHERE structure_name = '" + name + "';")
        }
      }
    }
    if(found === 0){
      document.getElementById("updateMessage").innerHTML = "No item with name " + itemName + " has been found";
    }
  }

  function updateIngredient(value){
    var rows = document.getElementsByClassName("items");
    var quantity;
    for(var i = 0; i < rows.length; i++){
      if(Number(rows[i].id) === Number(value)){
        quantity = rows[i].childNodes[2].childNodes[0].value;
        if(quantity === ""){
          document.getElementById("updateMessage").innerHTML = "Please enter the new price";
          return;
        }
        if(quantity.substring(0,1) === "-"){
          document.getElementById("updateMessage").innerHTML = "Price cannot be a negatitve number";
          return;
        }
        rows[i].childNodes[1].innerHTML = quantity;
        window.itm[i].structure_price = quantity;
        break;
      }
    }
    var out = "UPDATE item_structures SET structure_price = " + quantity + " WHERE structure_id = "+ value +";";
    document.getElementById("updateMessage").innerHTML = "";
    updateData(out);
  }

    return (
        <div>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                <Translate text="Back To Manager"/>
            </button> <br/> 
            <label><Translate text="Delete Item:"/></label>
            <input type="text" placeholder="Item Name" id="delete"/> 
            <button
              onClick={() => {
                deleteItem();
              }}
            >
              <Translate text="Delete Item"/>
            </button>
            <br/>
            <label id="updateMessage"></label>
            <br/>
            <table>
              <thead>
                <tr>
                  <td><Translate text="Item"/></td>
                  <td><Translate text="Price"/></td>
                  <td><Translate text="Update Price Field"/></td>
                  <td><Translate text="Update Price Button"/></td>
                </tr>
              </thead>
              <tbody>
                {window.itm.map(item => (
                <tr class="items" id={item.structure_id}>
                    <td id ={item.structure_name}><Translate text={item.structure_name}/></td>
                    <td>${item.structure_price}</td>
                    <td><input type = "number" style={{width: "75%"}} placeholder="" name="update"/></td>
                    <td>
                      <button
                        onClick={() => {
                          updateIngredient(item.structure_id);
                        }}
                      >
                        <Translate text="Update Price"/>
                      </button>
                    </td>
                    
                </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default ItemStructures;