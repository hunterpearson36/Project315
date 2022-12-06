import React from "react";
import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../modules/Query";

import Translate from "../modules/Google/Translate";

function RestockIngredients() {
    let navigate = useNavigate();

    const updateData = async (statement) => {
        await sendUpdate(statement)
          .then((response) => {
            console.log("received response");
          }).catch((error) => {
            console.error(error.message);
          });
      }

    function getDateTime() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        if(month.toString().length === 1) {
             month = '0'+month;
        }
        if(day.toString().length === 1) {
             day = '0'+day;
        }     
        var dateTime = year + '-' + month + '-' + day;   
        return dateTime;
    }

    function compareDates(date, expire){
        var first = new Date(date);
        var second = new Date(expire);
        if(second.getFullYear() > first.getFullYear()){
            return false;
        }
        else if(second.getMonth()+1 > first.getMonth()+1){
            return false;
        }
        else if(second.getDate() > first.getDate()){
            return false;
        }
        return true;
    }

    function updateIngredient(value){
        var rows = document.getElementsByClassName("ingreds");
        var quantity;
        var expire;
        var date = getDateTime();
        for(var i = 0; i < rows.length; i++){
          if(Number(rows[i].id) === Number(value)){
            quantity = rows[i].childNodes[2].childNodes[0].value;
            expire = rows[i].childNodes[3].childNodes[0].value
            if(compareDates(date,expire)){
                document.getElementById("updateMessage").innerHTML = "Expire date is earlier than the current date, cancelling restock";
                return;
            }
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
        document.getElementById("updateMessage").innerHTML = "";
        var out = "UPDATE ingredients SET ingred_qty = " + quantity + " WHERE ingred_ID = "+ value +";";
        var out2 = "UPDATE ingredients SET ingred_expire_date = '" + expire + "' WHERE ingred_ID = "+ value +";";
        var out3 = "UPDATE ingredients SET ingred_order_date = '" + date + "' WHERE ingred_ID = "+ value +";";
        updateData(out);
        updateData(out2);
        updateData(out3);
      }

    return(
      <div>
        <label><Translate text="Restock Ingredients:"/></label><br/>
        <button
                onClick={() => {
                    navigate("/manager/ingredients-table");
                }}
            >
                <Translate text="Back To Ingredients Table"/>
        </button> <br/>
        <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                <Translate text="Back To Manager"/>
        </button> <br/>
        <label id="updateMessage"> </label>
        <table id = "ingredTable">
            <tbody>
                {window.ingred.map(item => (
                    <tr class="ingreds" id={item.ingred_id}>
                        <td width = "200" id = {item.ingred_name}><Translate text = {item.ingred_name}/></td>
                        <td width = "50">{item.ingred_qty}</td>
                        <td width = "100"><input type = "number" placeholder="" name="update"/></td>
                        <td width = "100"><input type = "date" id="expireDate"/></td>
                        <td width = "130">
                            <button id = {item.ingred_id}
                                onClick={() => {
                                    updateIngredient(item.ingred_id);
                                }}
                            >
                                <Translate text="Restock"/>
                            </button>
                        </td>
                    
                    </tr>
                ))}
              </tbody>
            </table>
      </div>
    );
}

export default RestockIngredients;




