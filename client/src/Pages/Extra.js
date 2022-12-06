import React, { useState, useEffect } from "react";
import { sendQuery, sendUpdate } from "../modules/Query";

const Extra = () => {

  const [isQuerying, setQuerying] = useState(false);
  const [entres, setEntres] = useState([]);
  const [sides, setSides] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  

  // entres
  const getEntres = async () => {
    await sendQuery("SELECT * from item_structures where structure_id >= 100 and structure_id < 200 order by structure_id;")
      .then((response) => {
        console.log("received response");
        setEntres(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    if (isQuerying) {
      getEntres();
      setQuerying(false);
    }
  }, [isQuerying]);

  // sides
  const getSides = async () => {
    await sendQuery("SELECT * from item_structures where structure_id >= 200 and structure_id < 300 order by structure_id;")
      .then((response) => {
        console.log("received response");
        setSides(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    if (isQuerying) {
      getSides();
      setQuerying(false);
    }
  }, [isQuerying]);

  // desserts
  const getDesserts = async () => {
    await sendQuery("SELECT * from item_structures where structure_id >= 300 and structure_id < 400 order by structure_id;")
      .then((response) => {
        console.log("received response");
        setDesserts(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    if (isQuerying) {
      getDesserts();
      setQuerying(false);
    }
  }, [isQuerying]);

  // drinks
  const getDrinks = async () => {
    await sendQuery("SELECT * from item_structures where structure_id >= 400 and structure_id < 500 order by structure_id;")
      .then((response) => {
        console.log("received response");
        setDrinks(response);
      }).catch((error) => {
        console.error(error.message);
      });
  }
  useEffect(() => {
    if (isQuerying) {
      getDrinks();
      setQuerying(false);
    }
  }, [isQuerying]);

  useEffect(() => {
    setQuerying(false);
  }, []);

  function queryHandler() {
    setQuerying(true);
  }

  function checkExistsHandler(){
    var id = 101
    var question = "select exists(select structure_id from item_structures where structure_id = " + id + ");";
    checkExists(question);
  }

  const checkExists = async (question) => {
    await sendQuery(question)
      .then((response) => {
        console.log("received response");
        document.getElementById("test").innerHTML = response[0].exists;
      }).catch((error) => {
        console.error(error.message);
      });
  }

  const getResponse = async () => {
    await sendUpdate("UPDATE item_structures SET structure_price = " + 7.10 + " WHERE structure_name = 'pumpkin s item';")
      .then((respons) => {
        console.log("received response");
      }).catch((error) => {
        console.error(error.message);
      });
  }

  return ( 
    <div>
      <button onClick={queryHandler}>
        query
      </button>
      <p>entrees:</p>
      <tbody>
        {entres.map(item => (
          <tr key={item.structure_id}>
            {/* <td>{item.structure_id}</td> */}
            <td>{item.structure_name}</td>
            <td>{item.structure_price}</td>
          </tr>
        ))}
      </tbody>
      
      <p>sides:</p>
      <tbody>
        {sides.map(item => (
          <tr key={item.structure_id}>
            {/* <td>{item.structure_id}</td> */}
            <td>{item.structure_name}</td>
            <td>{item.structure_price}</td>
          </tr>
        ))}
      </tbody>
      
      <p>desserts:</p>
      <tbody>
        {desserts.map(item => (
          <tr key={item.structure_id}>
            {/* <td>{item.structure_id}</td> */}
            <td>{item.structure_name}</td>
            <td>{item.structure_price}</td>
          </tr>
        ))}
      </tbody>
      
      <p>drinks:</p>
      <tbody>
        {drinks.map(item => (
          <tr key={item.structure_id} name = {item.structure_name} price = {item.structure_price}>
            {/* <td>{item.structure_id}</td> */}
            <td>{item.structure_name}</td>
            <td>{item.structure_price}</td>
          </tr>
        ))}
      </tbody>
      <button onClick={checkExistsHandler}>
        Check exists
      </button>
      <button onClick={getResponse}>
        Get Response
      </button>
      <p id = "test"></p>
    </div>
    
  );

  
}

export default Extra;