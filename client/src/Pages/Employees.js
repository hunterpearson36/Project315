import {useNavigate} from "react-router-dom";
import { sendUpdate } from "../modules/Query";

import Translate from "../modules/Google/Translate";

const Employee = () => {

  let navigate = useNavigate();

  const updateData = async (statement) => {
    await sendUpdate(statement)
      .then((response) => {
        console.log("received response");
      }).catch((error) => {
        console.error(error.message);
      });
  }

  function getRandomInt(min, max){
    return Math.floor(Math.random() * max) + min;
  }

  function createEmployee(){
    var name = document.getElementById("name").value;
    if(name === ""){
        return;
    }
    var e = document.getElementById("selectPerms");
    var manage = "";
    if(e.selectedIndex === 0){
        manage = true
    }
    else{
        manage = false
    }
    var employeeID;
    while(true){
        employeeID = getRandomInt(0,200);
        var found = 0;
        for(var i = 0; i < window.employee.length; i++){
            if(window.employee[i].employee_id === employeeID){
                break;
            }
            if(i === window.employee.length-1 && (window.employee[i].employee_id !== employeeID)){
                found++;
            }
        }
        if(found === 1){
            break;
        }
    }
    var out = employeeID + ", '"+ name +"', " + manage + ", '2022-12-06 10:00:00', false, 100";
    var update = "INSERT INTO employees VALUES (" + out + ");";
    updateData(update);
    window.employee.push({employee_id: employeeID, employee_name: name, employee_is_admin: manage, employee_last_checked: '2022-12-06 10:00:00',
        employee_at_work: false, employee_hours_worked: 100})
    navigate("/manager/employee");
  }

  function deleteEmployee(id){
    updateData("DELETE FROM employees WHERE employee_id = '" + id + "';")
    var p = document.getElementById(id);
    p.parentNode.removeChild(p);
  }

    return (
        <div>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                <Translate text="Back To Manager"/>
            </button> <br/> 
            <label><Translate text = "Create New Employee"/>: </label>
            <input id = "name" placeholder="Employee Name" type = "text" />
            <select id = "selectPerms">
                <option>
                    <Translate text = "Manager"/>
                </option>
                <option>
                    <Translate text = "Employee"/>
                </option>
            </select>
            <button
            onClick={() => {
                createEmployee();
            }}
            >
                <Translate text = "Create New Employee"/>
            </button>
            <table id = "employees">
              <thead>
                <tr>
                  <td><Translate text="Employee"/></td>
                  <td><Translate text="Admin?"/></td>
                  <td><Translate text="Delete Employee Button"/></td>
                </tr>
              </thead>
              <tbody>
                {window.employee.map(item => (
                <tr class="items" id={item.employee_id}>
                    <td>{item.employee_name}</td>
                    <td>{item.employee_is_admin ? <Translate text = "True"/> : <Translate text = "False"/>}</td>
                    <td>
                      <button
                        onClick={() => {
                            deleteEmployee(item.employee_id);
                        }}
                      >
                        <Translate text="Delete Employee"/>
                      </button>
                    </td>
                    
                </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
}

export default Employee;