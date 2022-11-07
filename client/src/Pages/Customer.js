import React from "react";
import {useNavigate} from "react-router-dom";

function Customer() {
    let navigate = useNavigate();
    let total = 0;
    let entrees = [
        {value: '', text: '--Choose an option--'},
        {value: 'Chicken Sandwich', text: 'Chicken Sandwich'},
        {value: 'Cobb Salad', text: 'Cobb Salad'},
        {value: 'Spicy Chicken Sandwich', text: 'Spicy Chicken Sandwich'},
      ];
    
    let sides = [
        {value: '', text: '--Choose an option--'},
        {value: 'Small Fries', text: 'Small Fries'},
        {value: 'Medium Fries', text: 'Medium Fries'},
        {value: 'Large Fries', text: 'Large Fries'},
      ];
    
    let desserts = [
        {value: '', text: '--Choose an option--'},
        {value: 'Small Chocolate Shake', text: 'Small Chocolate Shake'},
        {value: 'Small Vanilla Shake', text: 'Small Vanilla Shake'},
        {value: 'Small Strawberry Shake', text: 'Small Strawberry Shake'},
      ];

    let drinks = [
        {value: '', text: '--Choose an option--'},
        {value: 'Small Iced Tea', text: 'Small Iced Tea'},
        {value: 'Medium Iced Tea', text: 'Medium Iced Tea'},
        {value: 'Large Iced Tea', text: 'Large Iced Tea'},
      ];

      let data = [
      ];

    function handleAdd(name){
        data.push({name: {name}});

        var tableRef = document.getElementById("order");
        var newRow = tableRef.insertRow(-1);

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
        
        // figure out how to re render total after updating 
    }

    window.DeleteRowFunction = function DeleteRowFunction(e) {
        var p = e.parentNode.parentNode;
        p.parentNode.removeChild(p);
    }

    return (
        <div> 
            <div>
                <label>Enter Your Name:</label><br/>
                <input type="text" placeholder="Name" name="Name" /><br/><br/>

                <table id = "order">
                    <tr>
                        <th>Order</th>
                        </tr>
                        {data.map((val, key) => {
                            return (
                                <tr key={key}>
                                <td>{val.name}</td>
                                </tr>
                            )
                        })}
                    
                </table><br/>

                <label for = "entrees">Entrees</label><br/>
                <select name="entrees" id="selectEntrees">
                    {entrees.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectEntrees");
                        var text = e.options[e.selectedIndex].text;
                        if(!(text === "--Choose an option--")){
                            handleAdd(text);
                        }
                    }}
                >
                    Add Entree to order
                </button><br/>

                <label for = "sides">Sides</label><br/>
                <select name="sides" id="selectSides">
                    {sides.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectSides");
                        var text = e.options[e.selectedIndex].text;
                        if(!(text === "--Choose an option--")){
                            handleAdd(text);
                        }
                    }}
                >
                    Add Side to order
                </button><br/>

                <label for = "desserts">Desserts</label><br/>
                <select name="desserts" id="selectDesserts">
                    {desserts.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectDesserts");
                        var text = e.options[e.selectedIndex].text;
                        if(!(text === "--Choose an option--")){
                            handleAdd(text);
                        }
                    }}
                >
                    Add Dessert to order
                </button><br/>

                <label for = "drinks">Drinks</label><br/>
                <select name="drinks" id="selectDrinks">
                    {drinks.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectDrinks");
                        var text = e.options[e.selectedIndex].text;
                        if(!(text === "--Choose an option--")){
                            handleAdd(text);
                        }
                        // add to total
                    }}
                >
                    Add Drink to order
                </button><br/>
                <br/>

                <label>TOTAL: ${parseFloat(total).toFixed(2)}</label><br/><br/>

                <button
                onClick={() => {
                    navigate("/order-placed");
                    total = 0;
                  }}
                >
                    Create Order
                </button>
                <button
                onClick={() => {
                    navigate("/");
                    total = 0;
                  }}
                >
                    Cancel Order
                </button><br/>

                

            </div>
        </div>
    );
}

export default Customer;