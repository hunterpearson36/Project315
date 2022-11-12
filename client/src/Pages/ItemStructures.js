import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery, sendUpdate } from "../modules/Query";

const ItemStructures = () => {

  let navigate = useNavigate();
  const [isQuerying, setQuerying] = useState(false);
  const [items, setItems] = useState([]);
  
  const getItems = async () => {
    await sendQuery("SELECT * from item_structures order by structure_id;")
      .then((response) => {
        console.log("received response");
        setItems(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    if (isQuerying) {
      getItems();
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
            <p>Items:</p>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button><br/><br/>
            <tbody>
                {items.map(item => (
                <tr key={item.structure_id}>
                    <td width = "120"><button>DELETE ITEM</button></td>
                    {/* <td>{item.structure_id}</td> */}
                    <td width = "200">{item.structure_name}</td>
                    <td width = "50">{item.structure_price}</td>
                    <td width = "100"><input type = "text" placeholder="" name="update"/></td>
                    <td width = "130"><button>Update Price</button></td>
                    
                </tr>
                ))}
            </tbody>
        </div>
    );
}

export default ItemStructures;