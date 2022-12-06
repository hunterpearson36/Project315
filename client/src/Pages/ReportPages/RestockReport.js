import {useNavigate} from "react-router-dom";

import Translate from "../../modules/Google/Translate";

function RestockReport() {
    let navigate = useNavigate();

    window.data = window.data || [];

    return (
        <div>
            <button class = "gui"
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                Back To Reports
            </button>
            <table id = "restockReport">
              <tbody>
                {window.data.map(item => (
                <tr class="restockTable" id={item.name}>
                    <td width = "700" id = {item.name}><Translate text="Ingredient: "/><br/><Translate text = {item.name}/></td> 
                    <td width = "300"><Translate text="Current Quantity: "/><br/>{item.qty}</td>          
                    <td><Translate text="Minimum Quantity: "/><br/>{item.min}</td>
                </tr>
                ))}
              </tbody>
            </table>
            
        </div>
    );
}

export default RestockReport;