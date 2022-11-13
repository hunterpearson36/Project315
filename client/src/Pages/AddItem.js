import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

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
        var old_tbody = document.getElementById("ingredientsTableBody")
        var new_tbody = document.createElement('tbody');
        new_tbody.setAttribute("id", "ingredientsTableBody")
        old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
    }


    return (
        <div>
            <label>Add New Item:</label><br/>
            <button
                onClick={() => {
                    createItem();
                }}
            >
                Create New Item
            </button><br/>
            <input type = "text" id = "itemName" placeholder = "Item name"/>
            <input type = "text" id = "itemPrice" placeholder = "Item price"/>
            <label>  Item type:</label>
            <select id = "itemType">
                <option>Entree</option>
                <option>Side</option>
                <option>Dessert</option>
                <option>Drink</option>
            </select>
            <br/>
            <select name="ingredients" id="ingredients">
                {ingredients.map(item => (
                    <option key={item.ingred_name} name = {item.ingred_name} id = {item.ingred_id}>
                        {item.ingred_name}
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
                    Add Ingredient to Item
                </button>
            <br/>
            <table id = "ingredientsTable">
                <thead>Item</thead>
                <tbody id = "ingredientsTableBody"></tbody>      
            </table>
            <br/>
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

export default AddItem;