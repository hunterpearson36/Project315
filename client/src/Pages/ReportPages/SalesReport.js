import {useNavigate} from "react-router-dom";

const SalesReport = () => {
  let navigate = useNavigate();

    return (
        <div>
            <label>Sales Report:</label>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                Back To Reports
            </button>
            
        </div>
    );
}

export default SalesReport;