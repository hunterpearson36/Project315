import React from "react";
import {useNavigate} from "react-router-dom";

const SalesReport = () => {
  let navigate = useNavigate();

  window.excess = window.excess || [];

    return (
        
        <div>
            <label>Excess Report:</label>
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
                    {window.excess.map(item => (
                    <tr className="sales" id={item.name}>
                        <td width = "240" id = {item.name}>Item: {item.name}</td> 
                        <td width = "300">Percentage of inventory sold: {item.percent}</td>        
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