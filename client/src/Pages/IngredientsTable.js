import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../modules/Query";

import Translate from "../modules/Google/Translate";

const IngredientsTable = () => {
  let navigate = useNavigate();

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
      document.getElementById("updateMessage").innerHTML = "Please enter the ingredient name to be deleted";
      return;
    }
    var rows = document.getElementsByClassName("ingreds")
    var found = 0;
    for(var i = 0; i < rows.length; i++){
      if(found === 0){
        if(rows[i].childNodes[0].innerHTML.substring(5, rows[i].childNodes[0].innerHTML.length - 6) === ingredName){
          var name = rows[i].childNodes[0].id;
          updateData("DELETE FROM ingredients WHERE ingred_name = '" + name + "' and ingred_id < 2000;")
          updateData("DELETE FROM restock WHERE restock_name = '" + name + "';")
          rows[i].parentNode.removeChild(rows[i]);
          window.ingred.splice(i,1);
          window.restock.splice(i,1);
        }
      }
    }
    if(found === 0){
      document.getElementById("updateMessage").innerHTML = "No ingredient with name " + ingredName + " has been found";
    }
  }

  function updateIngredient(value){
    var rows = document.getElementsByClassName("ingreds");
    var quantity;
    for(var i = 0; i < rows.length; i++){
      if(Number(rows[i].id) === Number(value)){
        quantity = rows[i].childNodes[2].childNodes[0].value;
        if(quantity === ""){
          document.getElementById("updateMessage").innerHTML = "Please enter the new quantity";
          return;
        }
        if(quantity.substring(0,1) === "-"){
          document.getElementById("updateMessage").innerHTML = "Quantity cannot be a negatitve number";
          return;
        }
        rows[i].childNodes[1].innerHTML = quantity;
        window.ingred[i].ingred_qty = quantity;
        break;
      }
    }
    var out = "UPDATE ingredients SET ingred_qty = " + quantity + " WHERE ingred_ID = "+ value +";";
    document.getElementById("updateMessage").innerHTML = "";
    updateData(out);
  }

    return (
        <div>
            <button
                onClick={() => {
                    navigate("restock");
                }}
            >
                <Translate text="Restock Ingredients"/>
            </button> <br/> 
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                <Translate text="Back To Manager"/>
            </button> <br/> 
            <label><Translate text="Delete Ingredient: "/></label>
            <input type="text" placeholder="Ingredient Name" id="delete"/> 
            <button
              onClick={() => {
                deleteIngredient();
              }}
            >
              <Translate text="Delete Ingredient"/>
            </button>
            <br/><label id="updateMessage"> </label>
            <table id = "ingredTable">
              <tbody>
                {window.ingred.map(item => (
                <tr class="ingreds" id={item.ingred_id}>
                    <td width = "200" id = {item.ingred_name}><Translate text = {item.ingred_name}/></td>
                    <td width = "50">{item.ingred_qty}</td>
                    <td width = "100"><input type = "number" placeholder="" name="update"/></td>
                    <td width = "130">
                      <button id = {item.ingred_id}
                        onClick={() => {
                          updateIngredient(item.ingred_id);
                        }}
                      >
                        <Translate text="Update Quantity"/>
                      </button>
                    </td>
                    
                </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default IngredientsTable;