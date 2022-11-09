import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery } from "../modules/Query";

function Customer() {
    const [isQuerying, setQuerying] = useState(false);
    const [entrees, setEntrees] = useState([]);
    const [sides, setSides] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinks, setDrinks] = useState([]);
    

    // entrees
    const getEntrees = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 100 and structure_id < 200 order by structure_id;")
        .then((response) => {
            console.log("received response");
            setEntrees(response);
        }).catch((error) => {
            console.error(error.message);
        });
    }
    useEffect(() => {
        if (isQuerying) {
        getEntrees();
        setQuerying(false);
        }
    }, [isQuerying]);

    // sides
    const getSides = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 200 and structure_id < 300 order by structure_id;")
        .then((response) => {
            console.log("received response");
            setSides(response);
        }).catch((error) => {
            console.error(error.message);
        });
    }
    useEffect(() => {
        if (isQuerying) {
        getSides();
        setQuerying(false);
        }
    }, [isQuerying]);

    // desserts
    const getDesserts = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 300 and structure_id < 400 order by structure_id;")
        .then((response) => {
            console.log("received response");
            setDesserts(response);
        }).catch((error) => {
            console.error(error.message);
        });
    }
    useEffect(() => {
        if (isQuerying) {
        getDesserts();
        setQuerying(false);
        }
    }, [isQuerying]);

    // drinks
    const getDrinks = async () => {
        await sendQuery("SELECT * from item_structures where structure_id >= 400 and structure_id < 500 order by structure_id;")
        .then((response) => {
            console.log("received response");
            setDrinks(response);
        }).catch((error) => {
            console.error(error.message);
        });
    }
    useEffect(() => {
        if (isQuerying) {
        getDrinks();
        setQuerying(false);
        }
    }, [isQuerying]);

    useEffect(() => {
        setQuerying(false);
    }, []);

    function queryHandler() {
        setQuerying(true);
    }
    let navigate = useNavigate();

      let data = [
      ];

    function handleAdd(name, price){
        data.push({name: {name}});

        var tableRef = document.getElementById("order");
        var newRow = tableRef.insertRow(-1);
        newRow.setAttribute("price", price);

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
        updateTotal(price);
        // figure out how to re render total after updating 
    }

    window.DeleteRowFunction = function DeleteRowFunction(e) {
        var p = e.parentNode.parentNode;
        p.parentNode.removeChild(p);
        var elem = document.getElementById("total");
        var amount = parseFloat(elem.innerHTML);
        var price = (e.parentNode.parentNode.getAttribute("price"));
        elem.innerHTML = parseFloat(Number(amount) - Number(price)).toFixed(2);
    }

    function updateTotal(price){
        var elem = document.getElementById("total");
        var amount = parseFloat(elem.innerHTML);
        elem.innerHTML = parseFloat(Number(amount) + Number(price)).toFixed(2);
    }

    useEffect(() => {
        queryHandler();
      }, []);

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
                    {entrees.map(item => (
                        <option key={item.structure_id} name = {item.structure_name} price = {item.structure_price}>
                            {item.structure_name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectEntrees");
                        var text = e.options[e.selectedIndex].text;
                        var price = e.options[e.selectedIndex].getAttribute("price");
                        if(!(text === "--Choose an option--")){
                            handleAdd(text, price);
                        }
                    }}
                >
                    Add Entree to order
                </button><br/>

                <label for = "sides">Sides</label><br/>
                <select name="sides" id="selectSides">
                    {sides.map(item => (
                        <option key={item.structure_id} name = {item.structure_name} price = {item.structure_price}>
                            {item.structure_name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectSides");
                        var text = e.options[e.selectedIndex].text;
                        var price = e.options[e.selectedIndex].getAttribute("price");
                        if(!(text === "--Choose an option--")){
                            handleAdd(text, price);
                        }
                    }}
                >
                    Add Side to order
                </button><br/>

                <label for = "desserts">Desserts</label><br/>
                <select name="desserts" id="selectDesserts">
                    {desserts.map(item => (
                        <option key={item.structure_id} name = {item.structure_name} price = {item.structure_price}>
                            {item.structure_name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectDesserts");
                        var text = e.options[e.selectedIndex].text;
                        var price = e.options[e.selectedIndex].getAttribute("price");
                        if(!(text === "--Choose an option--")){
                            handleAdd(text, price);
                        }
                    }}
                >
                    Add Dessert to order
                </button><br/>

                <label for = "drinks">Drinks</label><br/>
                <select name="drinks" id="selectDrinks">
                    {drinks.map(item => (
                        <option key={item.structure_id} name = {item.structure_name} price = {item.structure_price}>
                            {item.structure_name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        var e = document.getElementById("selectDrinks");
                        var text = e.options[e.selectedIndex].text;
                        var price = e.options[e.selectedIndex].getAttribute("price");
                        if(!(text === "--Choose an option--")){
                            handleAdd(text, price);
                        }
                        // add to total
                    }}
                >
                    Add Drink to order
                </button><br/>
                <br/>

                <label>TOTAL: $</label> <label id = "total">0.00</label><br/><br/>

                <button
                onClick={() => {
                    navigate("/order-placed");
                  }}
                >
                    Create Order
                </button>
                <button
                onClick={() => {
                    navigate("/");
                  }}
                >
                    Cancel Order
                </button><br/>

                

            </div>
        </div>
    );
}

export default Customer;