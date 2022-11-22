import React from "react";
import {useNavigate} from "react-router-dom";

const SalesReport = () => {
  let navigate = useNavigate();

  window.itemsSales = window.itemsSales || [];

    return (
        
        <div>
            <label>Sales Report:</label>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                Back To Reports
            </button>
            <div>
              <table id = "salesReport">
                <tbody>
                    {window.itemsSales.map(item => (
                    <tr className="sales" id={item.name}>
                        <td width = "240" id = {item.name}>Item: {item.name}</td> 
                        <td width = "180">Amount sold: {item.amount}</td>   
                        <td width = "240">Total Sales Figure: {Number(item.price).toFixed(2)}</td>     
                    </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <br/>            
        </div>
    );
}

export default SalesReport;