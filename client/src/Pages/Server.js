import React from "react";
import {useNavigate} from "react-router-dom";

function Server() {
    let navigate = useNavigate();
    const entrees = [
        {value: '', text: '--Choose an option--'},
        {value: 'Chicken Sandwich', text: 'Chicken Sandwich'},
        {value: 'Cobb Salad', text: 'Cobb Salad'},
        {value: 'Spicy Chicken Sandwich', text: 'Spicy Chicken Sandwich'},
      ];
    
    const sides = [
        {value: '', text: '--Choose an option--'},
        {value: 'Small Fries', text: 'Small Fries'},
        {value: 'Medium Fries', text: 'Medium Fries'},
        {value: 'Large Fries', text: 'Large Fries'},
      ];
    
    const desserts = [
        {value: '', text: '--Choose an option--'},
        {value: 'Small Chocolate Shake', text: 'Small Chocolate Shake'},
        {value: 'Small Vanilla Shake', text: 'Small Vanilla Shake'},
        {value: 'Small Strawberry Shake', text: 'Small Strawberry Shake'},
      ];

    const drinks = [
        {value: '', text: '--Choose an option--'},
        {value: 'Small Iced Tea', text: 'Small Iced Tea'},
        {value: 'Medium Iced Tea', text: 'Medium Iced Tea'},
        {value: 'Large Iced Tea', text: 'Large Iced Tea'},
      ];

    return (
        <div> 
            <div>
                <label>Enter Customer Name:</label><br/>
                <input type="text" placeholder="Name" name="Name" /><br/><br/>

                <label for = "entrees">Entrees</label><br/>
                <select name="entrees" id="selectEntrees">
                    {entrees.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button>Add Entree to order</button><br/>

                <label for = "sides">Sides</label><br/>
                <select name="sides" id="selectSides">
                    {sides.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button>Add Side to order</button><br/>

                <label for = "desserts">Desserts</label><br/>
                <select name="desserts" id="selectDesserts">
                    {desserts.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button>Add Dessert to order</button><br/>

                <label for = "drinks">Drinks</label><br/>
                <select name="drinks" id="selectDrinks">
                    {drinks.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                    ))}
                </select>
                <button>Add Drink to order</button><br/><br/>

                <label>TOTAL: </label><br/><br/>

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

export default Server;