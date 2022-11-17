import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { sendQuery } from "../modules/Query";

const Reports = () => {
  let navigate = useNavigate();

  const getOrders = async () => {
    await sendQuery("SELECT * from orders order by order_date;")
    .then((response) => {
      console.log("received response");
      window.orderSales = response;
    }).catch((error) => {
      console.error(error.message);
    });
  }

  const getItems = async () => {
    await sendQuery("SELECT * from items order by item_id;")
    .then((response) => {
        console.log("received response");
        window.itemSales = response;
    }).catch((error) => {
        console.error(error.message);
    });
}

  useEffect(() => {
    getOrders();
    getItems();
  }, []);

    return (
        <div>
            <label>Reports:</label>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports/sales-report");
                }}
            >
                Sales Report
            </button>
            <button
                onClick={() => {
                    navigate("/manager/reports/excess-report");
                }}
            >
                Excess Report
            </button>
            <button
                onClick={() => {
                    navigate("/manager/reports/restock-report");
                }}
            >
                Restock Report
            </button>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                Back To Manager
            </button>
            
        </div>
    );
}

export default Reports;