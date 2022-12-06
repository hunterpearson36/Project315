import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

import Translate from "../modules/Google/Translate";

const AddItem = () => {

    let navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [ingredients, setIngred] = useState([]);
  
    const getItems = async () => {
        await sendQuery("SELECT * from item_structures order by structure_id;")
        .then((response) => {
            console.log("received response");
            setItems(response);
        }).catch((error) => {
            console.error(error.message);
        });
    }

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
        getItems();
        getIngred();
      }, []);

      function handleAdd(name, id){

        var tableRef = document.getElementById("ingredientsTableBody");
        var newRow = tableRef.insertRow(-1);
        newRow.setAttribute("id", id);
        newRow.setAttribute("name", name);

        var newCell = newRow.insertCell(0);
        var newElem = document.createElement("td");
        newElem.setAttribute("name", name);
        newElem.setAttribute("type", "text");
        newElem.setAttribute("value", name);
        newElem.setAttribute("width","1000");
        newElem.setAttribute("height","50");
        newCell.appendChild(newElem);
        newCell.innerHTML = name;

        newCell = newRow.insertCell(1);
        newElem = document.createElement("input");
        newElem.setAttribute("type", "button");
        newElem.setAttribute("value", "Delete Item");

        newElem.setAttribute("onclick", "DeleteRowFunction(this)");
        newCell.appendChild(newElem);
    }

    window.DeleteRowFunction = function DeleteRowFunction(e) {
        var p = e.parentNode.parentNode;
        p.parentNode.removeChild(p);
    }

    function createItem(){
        var id = getID();
        var itemDetails = getDetails();
        var itemName = document.getElementById("itemName").value;
        if(itemName === ""){
            document.getElementById("message").innerHTML = "No name entered, cancelling item creation";
            return;
        }
        var itemPrice = document.getElementById("itemPrice").value;
        if(itemPrice === ""){
            document.getElementById("message").innerHTML = "No price entered, cancelling item creation";
            return;
        }
        if(itemDetails === "[["){
            document.getElementById("message").innerHTML = "No ingredients entered, cancelling item creation";
            return;
        }
        var out = id + ", '" + itemName + "', " + Number(itemPrice).toFixed(2) + ", '" + itemDetails + "'";
        var create = "INSERT INTO item_structures VALUES (" + out + ");"
        updateData(create);
        document.getElementById("message").innerHTML = "New item with name " + itemName + " has been created!";
        reset();
    }

    function reset(){
        document.getElementById("itemName").value = "";
        document.getElementById("itemPrice").value = "";
        var old_tbody = document.getElementById("ingredientsTableBody")
        var new_tbody = document.createElement('tbody');
        new_tbody.setAttribute("id", "ingredientsTableBody")
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
    }

    function getID(){
        var e = document.getElementById("itemType");
        var text = e.selectedIndex;
        if(text === 0){
            while(true){
                var id = Math.floor(Math.random() * 100) + 100;
                var final = items.length - 1;
                for(var i = 0; i < items.length; i++){
                    if(items[i].structure_id === id){
                        break;
                    }
                    if(i === final && items[final].structure_id !== id){
                        return id;
                    }
                }
            }
        }
        else if(text === 1){
            while(true){
                var id = Math.floor(Math.random() * 100) + 200;
                var final = items.length - 1;
                for(var i = 0; i < items.length; i++){
                    if(items[i].structure_id === id){
                        break;
                    }
                    if(i === final && items[final].structure_id !== id){
                        return id;
                    }
                }
            }
        }
        else if(text === 2){
            while(true){
                var id = Math.floor(Math.random() * 100) + 300;
                var final = items.length - 1;
                for(var i = 0; i < items.length; i++){
                    if(items[i].structure_id === id){
                        break;
                    }
                    if(i === final && items[final].structure_id !== id){
                        return id;
                    }
                }
            }
        }
        else{
            while(true){
                var id = Math.floor(Math.random() * 100) + 400;
                var final = items.length - 1;
                for(var i = 0; i < items.length; i++){
                    if(items[i].structure_id === id){
                        break;
                    }
                    if(i === final && items[final].structure_id !== id){
                        return id;
                    }
                }
            }
        }
    }

    function getDetails(){
        var data = "[";
        var data2 = [];
        var table = document.getElementById("ingredientsTable");
        var rows = table.childNodes[1].childNodes;
        for(var i = 0; i < rows.length; i++){
            if(data.includes(rows[i].id)){
                for(var j = 0; j < data2.length; j++){
                    if(data2[j].id === rows[i].id){
                        data2[j].count = data2[j].count + 1;
                    }
                }
            }
            else if(i !== (rows.length-1)){
                data += rows[i].id + ", ";
                const obj = {id : rows[i].id, count : 1};
                data2.push(obj);
            }
            else{
                data += rows[i].id + "]"
                const obj = {id : rows[i].id, count : 1};
                data2.push(obj);
            }
        }
        
        var ingredients = "["
        var ingredCount = "["
        for(var i = 0; i < data2.length; i++){
            if(i !== (data2.length-1)){
                ingredients += data2[i].id + ",";
                ingredCount += data2[i].count + ",";
            }
            else{
                ingredients += data2[i].id + "], ";
                ingredCount += data2[i].count + "]"
            }
        }
        var details = ingredients + ingredCount;
        return details;
    }

    return (
        <div>
            <label><Translate text="Add New Item:"/></label><br/>
            <input type = "text" id = "itemName" placeholder = "Item name"/>
            <input type = "number" id = "itemPrice" placeholder = "Item Price"/>
            <br/>
            <label><Translate text="Item type:"/></label>
            <select id = "itemType">
                <option><Translate text = "Entree"/></option>
                <option><Translate text = "Side"/></option>
                <option><Translate text = "Dessert"/></option>
                <option><Translate text = "Drink"/></option>
            </select>
            <br/>
            <select name="ingredients" id="ingredients">
                {ingredients.map(item => (
                    <option key={item.ingred_name} name = {item.ingred_name} id = {item.ingred_id}>
                        <Translate text = {item.ingred_name}/>
                    </option>
                ))}
            </select>
            <button
                onClick={() => {
                    var e = document.getElementById("ingredients");
                    var text = e.options[e.selectedIndex].text;
                    var id = e.options[e.selectedIndex].getAttribute("id");
                    handleAdd(text, id);
                }}
            >
                    <Translate text="Add Ingredient to Item"/>
                </button>
            <br/>
            <button
                onClick={() => {
                    createItem();
                }}
            >
                <Translate text="Create New Item"/>
            </button><br/>
            <label id = "message"/>
            <br/>
            <table class = "order" id = "ingredientsTable">
                <thead colspan = "2"><Translate text="Ingredients"/></thead>
                <tbody id = "ingredientsTableBody"></tbody>      
            </table>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                <Translate text="Back To Manager"/>
            </button> <br/> 
        </div>
    );
}

export default AddItem;