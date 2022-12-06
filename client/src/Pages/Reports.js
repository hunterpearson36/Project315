import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../modules/Google/Translate";

const Reports = () => {
  let navigate = useNavigate();

    return (
        <div>
            <label><Translate text="Reports:"/></label>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports/sales-report");
                }}
            >
                <Translate text="Sales Report"/>
            </button>
            <button
                onClick={() => {
                    navigate("/manager/reports/excess-report");
                }}
            >
                <Translate text="Excess Report"/>
            </button>
            <button
                onClick={() => {
                    navigate("/manager/reports/restock-report");
                }}
            >
                <Translate text="Restock Report"/>
            </button>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager");
                }}
            >
                <Translate text="Back To Manager"/>
            </button>
            
        </div>
    );
}

export default Reports;