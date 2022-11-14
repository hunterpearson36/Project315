import {useNavigate} from "react-router-dom";

function RestockReport() {
    let navigate = useNavigate();

    return (
        <div>
            <label>Restock Report:</label>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                Back To Reports
            </button>
            <table id = "restockReport">
              <tbody>
                {window.data.map(item => (
                <tr class="restock" id={item.name}>
                    <td width = "240" id = {item.name}>Ingredient: {item.name}</td> 
                    <td width = "180">Current Quantity: {item.qty}</td>          
                    <td>Minimum Quantity: {item.min}</td>
                </tr>
                ))}
              </tbody>
            </table>
            
        </div>
    );
}

export default RestockReport;