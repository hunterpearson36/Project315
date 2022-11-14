import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../../modules/Query";

const Restock = () => {
  let navigate = useNavigate();

  const updateData = async (statement) => {
    await sendUpdate(statement)
      .then((response) => {
        console.log("received response");
      }).catch((error) => {
        console.error(error.message);
      });
  }

  function updateRestock(value){
    var rows = document.getElementsByClassName("restock");
    var quantity;
    var name;
    for(var i = 0; i < rows.length; i++){
      if(Number(rows[i].id) === Number(value)){
        quantity = rows[i].childNodes[2].childNodes[0].value;
        if(quantity === ""){
          document.getElementById("updateMessage").innerHTML = "Please enter the new quantity";
          return;
        }
        if(quantity.substring(0,1) === "-"){
          document.getElementById("updateMessage").innerHTML = "Quantity cannot be a negatitve number";
          return;
        }
        rows[i].childNodes[1].innerHTML = quantity;
        window.restock[i].restock_qty = quantity;
        name = window.restock[i].restock_name;
        break;
      }
    }
    var out = "UPDATE restock SET restock_qty = " + quantity + " WHERE restock_id = "+ value +";";
    document.getElementById("updateMessage").innerHTML = "Successfully updated minimum quantity for " + name;
    updateData(out);
  }

  var data = [];

  function getRestockReport(){
    for(var i = 0; i < window.restock.length; i++){
      if(window.ingred[i].ingred_qty < window.restock[i].restock_qty){
        data.push({name: window.ingred[i].ingred_name, qty: window.ingred[i].ingred_qty, min: window.restock[i].restock_qty})
      }
    }
    window.data = data;
    navigate("/manager/reports/restock-report/report");
  }


    return (
        <div>
            <label>Restock:</label>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                Back To Reports
            </button><br/>
            <button
                onClick={() => {
                    getRestockReport();
                }}
            >
                Get Restock Report
            </button>
            <br/>
            <label id="updateMessage"> </label>
            <table id = "restockTable">
              <tbody>
                {window.restock.map(item => (
                <tr class="restock" id={item.restock_id}>
                    <td width = "200">{item.restock_name}</td>
                    <td width = "50">{item.restock_qty}</td>
                    <td width = "100"><input type = "number" placeholder="" name="update"/></td>
                    <td width = "130">
                      <button id = {item.restock_id}
                        onClick={() => {
                          updateRestock(item.restock_id);
                        }}
                      >
                        Update Quantity
                      </button>
                    </td>
                    
                </tr>
                ))}
              </tbody>
            </table>
            
        </div>
    );
}

export default Restock;