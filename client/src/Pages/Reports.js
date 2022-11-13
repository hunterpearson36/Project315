import {useNavigate} from "react-router-dom";

const Reports = () => {
  let navigate = useNavigate();

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