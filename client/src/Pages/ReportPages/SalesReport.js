import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../../modules/Google/Translate";

const SalesReport = () => {
  let navigate = useNavigate();

  window.itemsSales = window.itemsSales || [];

    return (
        
        <div>
            <button class = "gui"
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                <Translate text="Back To Reports"/>
            </button>
            <div>
              <table id = "salesReport">
                <tbody>
                    {window.itemsSales.map(item => (
                    <tr className="sales" id={item.name}>
                        <td width = "240" id = {item.name}><Translate text="Item: "/><br/><Translate text = {item.name}/></td> 
                        <td width = "180"><Translate text="Amount sold: "/><br/>{item.amount}</td>   
                        <td width = "240"><Translate text="Total Sales Figure: "/><br/>${Number(item.price).toFixed(2)}</td>     
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