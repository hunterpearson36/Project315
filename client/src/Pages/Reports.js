import React from "react";
import {useNavigate} from "react-router-dom";

import Translate from "../modules/Google/Translate";

const Reports = () => {
  let navigate = useNavigate();

    return (
        <div>
            <center>
                <img src = "https://logo.clearbit.com/cfabristol.com" alt = "Chick-fil-A"/>
                <br/>
                <label class = "welcome"><Translate text = "Reports"/></label>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/reports/sales-report");
                    }}
                >
                    <Translate text="Sales Report"/>
                </button>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/reports/excess-report");
                    }}
                >
                    <Translate text="Excess Report"/>
                </button>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager/reports/restock-report");
                    }}
                >
                    <Translate text="Restock Report"/>
                </button>
                <br/>
                <button class = "gui"
                    onClick={() => {
                        navigate("/manager");
                    }}
                >
                    <Translate text="Back To Manager"/>
                </button>
            </center>
        </div>
    );
}

export default Reports;