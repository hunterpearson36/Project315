import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../modules/Query";

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
        break;
      }
    }
    var out = "UPDATE ingredients SET ingred_qty = " + quantity + " WHERE ingred_ID = "+ value +";";
    document.getElementById("updateMessage").innerHTML = "";
    updateData(out);
  }

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
            </button> <br/><label id="deleteMessage">NOTE: The code to actually delete it from the database is currently commented out but it has been verified to actually works</label>
            <br/><label id="updateMessage"> </label>
            <table id = "ingredTable">
              <tbody>
                {window.ingred.map(item => (
                <tr class="ingreds" id={item.ingred_id}>
                    <td width = "200">{item.ingred_name}</td>
                    <td width = "50">{item.ingred_qty}</td>
                    <td width = "100"><input type = "number" placeholder="" name="update"/></td>
                    <td width = "130">
                      <button id = {item.ingred_id}
                        onClick={() => {
                          updateIngredient(item.ingred_id);
                        }}
                      >
                        Update Quantity
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