import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

const AddIngredient = () => {

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

    useEffect(() => {
        getIngred();
      }, []);

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
        var dateTime = month + '-' + day + '-' + year;   
         return dateTime;
    }

    function createIngredient(){
        var id = getID();
        var ingredName = document.getElementById("ingredName").value;
        if(ingredName === ""){
            document.getElementById("message").innerHTML = "No name entered, cancelling ingredient creation";
            reset();
            return;
        }
        var ingredQty = document.getElementById("ingredQty").value;
        if(ingredQty === ""){
            document.getElementById("message").innerHTML = "No ingredient quantity entered, cancelling ingredient creation";
            reset();
            return;
        }
        if(ingredQty.substring(0,1) === "-"){
            document.getElementById("message").innerHTML = "Quantity cannot be negative, cancelling ingredient creation";
            reset();
            return;
        }
        var storageLocation = document.getElementById("ingredLoc").value;
        var orderDate = getDateTime();
        var expire = document.getElementById("expire").value;
        var expireDate = expire.substring(5,expire.length) + "-" + expire.substring(0,4);
        if(expireDate === "-"){
            document.getElementById("message").innerHTML = "No expiration date entered, cancelling ingredient creation";
            reset();
            return;
        }
        var out = id + ", 't', " + ingredQty + ", '" + ingredName + "', '" + storageLocation + "', '" + expireDate + "', '";
        out += orderDate + "'";

        var create = "INSERT INTO ingredients VALUES (" + out + ");";
        var restockQty = document.getElementById("restock").value;
        if(restockQty === ""){
            document.getElementById("message").innerHTML = "No minimum stock entered, cancelling ingredient creation";
            reset();
            return;
        }
        if(restockQty.substring(0,1) === "-"){
            document.getElementById("message").innerHTML = "Minimum stock cannot be negative, cancelling ingredient creation";
            reset();
            return;
        }
        var restockOut = id + ", '" + ingredName + "', " + restockQty;
        var restockCreate = "INSERT INTO restock VALUES (" + restockOut + ");";
        updateData(create);
        updateData(restockCreate);
        document.getElementById("message").innerHTML = "New ingredient with name " + ingredName + " has been created!";
        reset();
        
    }

    function reset(){
        document.getElementById("ingredName").value = "";
        document.getElementById("ingredQty").value = "";
        document.getElementById("expire").value = "";
        document.getElementById("restock").value = "";
    }

    function getID(){
        while(true){
            var id = Math.floor(Math.random() * 2000);
            var final = ingredients.length - 1;
            for(var i = 0; i < ingredients.length; i++){
                if(ingredients[i].ingred_id === id){
                    break;
                }
                if(i === final && ingredients[final].ingred_id !== id){
                    return id;
                }
            }
        }
    }

    return (
        <div>
            <label>Add New Ingredient:</label><br/>
            
            <input type = "text" id = "ingredName" placeholder = "Ingredient name"/>
            <input type = "number" id = "ingredQty" placeholder = "Ingredient Quantity"/>
            <br/>
            <label>  Storage Location:</label>
            <select id = "ingredLoc">
                <option>cupboard</option>
                <option>refrigerator</option>
                <option>freezer</option>
            </select>
            <br/>
            <label>Expiration Date:</label><input type = "date" id = "expire"/>
            <br/>
            <label>Minimum Stock:</label><input type = "number" id = "restock"/>
            <br/>
            <button
                onClick={() => {
                    createIngredient();
                }}
            >
                Create New Ingredient
            </button><br/>
            <label id = "message"></label><br/>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button> <br/> 
        </div>
    );
}

export default AddIngredient;