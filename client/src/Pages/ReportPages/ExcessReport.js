import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../../modules/Google/Translate";

const SalesReport = () => {
  let navigate = useNavigate();

  window.excess = window.excess || [];

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
                    {window.excess.map(item => (
                    <tr className="sales" id={item.name}>
                        <td width = "240" id = {item.name}><Translate text="Item:"/><br/><Translate text = {item.name}/></td> 
                        <td width = "300"><Translate text="Percentage of inventory sold:"/><br/>{item.percent}</td>        
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