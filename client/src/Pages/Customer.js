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
        {name: 'Spicy Chicken Sandwich'},
        {name: 'Medium Fries'},
        {name: 'Small Iced Tea'}
      ]

    function handleAdd(name){
        data.push({name: {name}});
        // figure out how to re render order table after adding element
        // figure out how to re render total after updating 
    }

    return (
        <div> 
            <div>
                <label>Enter Your Name:</label><br/>
                <input type="text" placeholder="Name" name="Name" /><br/><br/>

                <table>
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
                        handleAdd(document.getElementById("selectEntrees").value);
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
                        handleAdd(document.getElementById("selectSides").value);
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
                        handleAdd(document.getElementById("selectDesserts").value);
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
                        handleAdd(document.getElementById("selectDrinks").value);
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