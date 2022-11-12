import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

const IngredientsTable = () => {
  let navigate = useNavigate();
  const [isQuerying, setQuerying] = useState(false);
  const [ingredients, setIngred] = useState([]);
  
  const getIngred = async () => {
    await sendQuery("SELECT * from ingredients where ingred_id < 2000 order by ingred_id;")
      .then((response) => {
        console.log("received response");
        setIngred(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    if (isQuerying) {
      getIngred();
      setQuerying(false);
    }
  }, [isQuerying]);

  useEffect(() => {
    setQuerying(false);
  }, []);

  function queryHandler() {
    setQuerying(true);
  }

  useEffect(() => {
    queryHandler();
  }, []);

    return (
        <div>
            <p>Ingredients:</p>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button><br/><br/>
            <tbody>
                {ingredients.map(item => (
                <tr key={item.ingred_id}>
                    <td width = "180"><button>DELETE INGREDIENT</button></td>
                    {/* <td>{item.structure_id}</td> */}
                    <td width = "200">{item.ingred_name}</td>
                    <td width = "50">{item.ingred_qty}</td>
                    <td width = "100"><input type = "text" placeholder="" name="update"/></td>
                    <td width = "130"><button>Update Quantity</button></td>
                    
                </tr>
                ))}
            </tbody>
        </div>
    );
}

export default IngredientsTable;