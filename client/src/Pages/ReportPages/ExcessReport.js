import {useNavigate} from "react-router-dom";

const ExcessReport = () => {
  let navigate = useNavigate();

    return (
        <div>
            <label>Excess Report:</label>
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

export default ExcessReport;