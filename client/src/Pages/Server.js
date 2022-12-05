import React from "react";
import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../modules/Query";

function Server() {
    let navigate = useNavigate();

    const updateData = async (statement) => {
        await sendUpdate(statement)
          .then((response) => {
            console.log("received response");
          }).catch((error) => {
            console.error(error.message);
          });
      }

    var data = [];
    function handleAdd(name, price, details){
        data.push({name: name, price: price, details: details});

        var tableRef = document.getElementById("order");
        var newRow = tableRef.insertRow(-1);
        newRow.setAttribute("price", price);
        newRow.setAttribute("name", name);

        var newCell = newRow.insertCell(0);
        var newElem = document.createElement("td");
        newElem.setAttribute("name", name);
        newElem.setAttribute("type", "text");
        newElem.setAttribute("value", name);
        newElem.setAttribute("width","500");
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
    }

    window.DeleteRowFunction = function DeleteRowFunction(e) {
        var p = e.parentNode.parentNode;
        p.parentNode.removeChild(p);
        var elem = document.getElementById("total");
        var amount = parseFloat(elem.innerHTML);
        var price = (e.parentNode.parentNode.getAttribute("price"));
        elem.innerHTML = parseFloat(Number(amount) - Number(price)).toFixed(2);
        for(var i = data.length-1; i >= 0; i--){
            if(data[i].name === e.parentNode.parentNode.getAttribute("name")){
                data.splice(i,1);
                return;
            }
        }

    }

    function updateTotal(price){
        var elem = document.getElementById("total");
        var amount = parseFloat(elem.innerHTML);
        elem.innerHTML = parseFloat(Number(amount) + Number(price)).toFixed(2);
    }
    
    function getRandomInt(min, max){
        return Math.floor(Math.random() * max) + min;
    }

    function getDateTime() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length === 1) {
             month = '0'+month;
        }
        if(day.toString().length === 1) {
             day = '0'+day;
        }   
        if(hour.toString().length === 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length === 1) {
             minute = '0'+minute;
        }
        if(second.toString().length === 1) {
             second = '0'+second;
        }   
        var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;   
         return dateTime;
    }

    function idSearch(type, left, right, value){
        if(right >= left){
            var mid = left + Math.floor((right - left) / 2)
            if(type === "order"){
                if(window.orderL[mid].order_id === value){
                    return mid;
                }
                else if(window.orderL[mid].order_id > value){
                    return idSearch("order", left, mid - 1, value);
                }
                return idSearch("order", mid + 1, right, value);

            }
            else if(type === "item"){
                if(window.itemList[mid].item_id === value){
                    return mid;
                }
                else if(window.itemList[mid].item_id > value){
                    return idSearch("item", left, mid - 1, value);
                }
                return idSearch("item", mid + 1, right, value);
            }
            else{
                if(window.ingredList[mid].ingred_id === value){
                    return mid;
                }
                else if(window.ingredList[mid].ingred_id > value){
                    return idSearch("ingredient", left, mid - 1, value);
                }
                return idSearch("ingredient", mid + 1, right, value);
            }
        }
        return -1;
    }
    
    function createOrder(){
        var name = document.getElementById("Name").value;
        if(name === ""){
            document.getElementById("errorMessage").innerHTML = "No name entered, cancelling order creation";
            return;
        }
        var total = Number(document.getElementById("total").innerHTML).toFixed(2);
        if(data.length === 0){
            document.getElementById("errorMessage").innerHTML = "No items selected, cancelling order creation";
            return;
        }
        var items = createItems();
        var server = window.employeeName;
        var orderID;
        while(true){
            orderID = getRandomInt(0, 2147483647);
            if(idSearch("order", 0, window.orderL.length-1, orderID) === -1){
                break;
            }
        }
        var orderNumber = getRandomInt(0, 1000000);
        var date = getDateTime();
        var details = document.getElementById("orderDetails").value;
        var out = orderID + ", '" + name + "', " + orderNumber + ", " + total + ", '{" +items + "}', '" + server + "', '" + details + "', '"  + date + "'";
        var update = "INSERT INTO orders VALUES (" + out + ");";
        updateData(update);
        window.orderId = orderNumber;
        navigate("/order-placed");
    }

    function createItems(){
        var items = [];
        for(var i = 0; i < data.length; i++){
            var ingredients = createIngredients(data[i].details);

            var location = data[i].details.indexOf("],");
            var itemDetails = data[i].details.substring(location+4, data[i].details.length-1).split(", ");
            var itemName = data[i].name;
            var itemPrice = data[i].price;
            var itemID;
            while(true){
                itemID = getRandomInt(0, 2147483647);
                if(idSearch("item", 0, window.itemList.length-1, itemID) === -1){
                    break;
                }
            }
            items.push(itemID);
            var out = itemID + ", '" + itemName + "', " + itemPrice + ", '{" + ingredients + "}', '{" + itemDetails + "}'";
            var update = "INSERT INTO items VALUES (" + out +  ");";
            console.log(update);
            
        }
        return items;
    }


    function createIngredients(details){
        var location = details.indexOf("],");
        var itemDetails = details.substring(1, location).split(", ");
        var ingredQty = details.substring(location+4, details.length-1).split(", ");
        var ingredients = []; 
        for(var i = 0; i < itemDetails.length; i++){
            var ingredID;
            while(true){
                ingredID = getRandomInt(2001, 2147483647);
                if(idSearch("ingredients", 0, window.ingredList.length-1, ingredID) === -1){
                    break;
                }
            }
            ingredients.push(ingredID);
            var loc = idSearch("ingredients", 0, window.ingredList.length-1, Number(itemDetails[i]));
            var stock = window.ingredList[loc].ingred_qty - ingredQty[i];
            var ingredName = window.ingredList[loc].ingred_name;
            var ingredStorage = window.ingredList[loc].ingred_storage_loc;
            var ingredExpire = window.ingredList[loc].ingred_expire_date.substring(0,10);
            var ingredOrder = window.ingredList[loc].ingred_order_date.substring(0,10); 
            var updateStock = "UPDATE ingredients SET ingred_qty = " + stock + " WHERE ingred_ID = " + itemDetails[i] + ";";
            var out = ingredID + ", f, " + ingredQty[i] + ", '" + ingredName + "', '" + ingredStorage + "', '" + ingredExpire + "', '" + ingredOrder + "'";
            var update = "INSERT INTO ingredients VALUES (" + out + ");";
            console.log(updateStock);
            console.log(update);
        }
        return ingredients;
    }

    return (
        <div> 
            <div>
                <label>Enter Customer Name:</label><br/>
                <input type="text" placeholder="Name" id="Name" /><br/><br/>

                <label for = "entrees">Entrees</label><br/>
                {window.entrees.map(item => (
                    <button
                        onClick={() => {
                            handleAdd(item.structure_name, item.structure_price, item.structure_details);
                        }}
                    >
                        {item.structure_name}
                    </button>
                ))}
                <br/>

                <label for = "sides">Sides</label><br/>
                {window.sides.map(item => (
                    <button
                        onClick={() => {
                            handleAdd(item.structure_name, item.structure_price, item.structure_details);
                        }}
                    >
                        {item.structure_name}
                    </button>
                ))}
                <br/>

                <label for = "desserts">Desserts</label><br/>
                {window.desserts.map(item => (
                    <button
                        onClick={() => {
                            handleAdd(item.structure_name, item.structure_price, item.structure_details);
                        }}
                    >
                        {item.structure_name}
                    </button>
                ))}
                <br/>

                <label for = "entrees">Drinks</label><br/>
                {window.drinks.map(item => (
                    <button
                        onClick={() => {
                            handleAdd(item.structure_name, item.structure_price, item.structure_details);
                        }}
                    >
                        {item.structure_name}
                    </button>
                ))}
                <br/>
                <br/>

                <table class = "order" id = "order">
                    <th colspan = "2">Order</th>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                            <td>{val.name}</td>
                            </tr>
                        )
                    })}   
                </table>

                <br/>

                <label>TOTAL: $</label> <label id = "total">0.00</label><br/>
                <label>Additional Order Details:</label> 
                <br/>
                
                <textarea rows = "5" cols = "60" id = "orderDetails"/><br/><br/>

                <button
                onClick={() => {
                    createOrder();
                  }}
                >
                    Create Order
                </button>
                <button
                onClick={() => {
                    navigate("/home");
                  }}
                >
                    Cancel Order
                </button><br/>

                <p id = "errorMessage"></p>
                

            </div>
        </div>
    );
}

export default Server;