import {useNavigate} from "react-router-dom";

const RestockReport = () => {
  let navigate = useNavigate();

    return (
        <div>
            <label>Restock Report:</label>
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

export default RestockReport;