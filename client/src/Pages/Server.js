import React from "react";

function Server() {
    return (
        <div> 
            <div>
                <label>Enter Customer Name:</label><br/>
                <input type="text" placeholder="Name" name="Name" /><br/><br/>

                <label for = "entrees">Entrees</label><br/>
                <select name = "entrees" id = "entrees">
                    <option value = "">Chicken Sandwich</option>
                    <option value = "">Cobb Salad</option>
                    <option value = "">Spicy Chicken Sandwich</option>
                </select> 
                <button>Add Entree to order</button><br/>

                <label for = "sides">Sides</label><br/>
                <select name = "sides" id = "sides">
                    <option value = "">Small Fries</option>
                    <option value = "">Medium Fries</option>
                    <option value = "">Large Fries</option>
                </select> 
                <button>Add Side to order</button><br/>

                <label for = "desserts">Desserts</label><br/>
                <select name = "desserts" id = "desserts">
                    <option value = "">Small Chocolate Shake</option>
                    <option value = "">Small Vanilla Shake</option>
                    <option value = "">Small Strawberry Shake</option>
                </select> 
                <button>Add Dessert to order</button><br/>

                <label for = "drinks">Drinks</label><br/>
                <select name = "drinks" id = "drinks">
                    <option value = "">Small Iced Tea</option>
                    <option value = "">Medium Iced Tea</option>
                    <option value = "">Large Iced Tea</option>
                </select> 
                <button>Add Drink to order</button><br/><br/>

                <label>TOTAL: </label><br/><br/>

                <button>Create Order</button><button>Cancel Order</button><br/>

            </div>
        </div>
    );
}

export default Server;