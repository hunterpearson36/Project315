import {useNavigate} from "react-router-dom";

const Excess = () => {
    let navigate = useNavigate();

    function itemIdSearch(left, right, value){
        if(right >= left){
            var mid = left + Math.floor((right - left) / 2)
            if(window.itemSales[mid].item_id === value){
                return mid;
            }
            else if(window.itemSales[mid].item_id > value){
                return itemIdSearch(left, mid - 1, value);
            }
            return itemIdSearch(mid + 1, right, value);
        }
        return -1;
    }

    function ingredIdSearch(left, right, value){
        if(right >= left){
            var mid = left + Math.floor((right - left) / 2)
            if(window.ingredSales[mid].ingred_id === value){
                return mid;
            }
            else if(window.ingredSales[mid].ingred_id > value){
                return ingredIdSearch(left, mid - 1, value);
            }
            return ingredIdSearch(mid + 1, right, value);
        }
        return -1;
    }

    function changeDate(orderDate){
          const date = new Date(orderDate)
          date.setHours(date.getHours()-5)
          var year    = date.getFullYear();
          var month   = date.getMonth()+1; 
          var day     = date.getDate();
          var hour    = date.getHours();
          var minute  = date.getMinutes();
          var second  = date.getSeconds(); 
          if(month.toString().length === 1) {
              month = '0'+month;
          }
          if(day.toString().length === 1) {
              day = '0'+day;
          }   
          if(hour.toString().length === 1) {
              hour = '0'+hour;
          }
          if(minute.toString().length === 1) {
              minute = '0'+minute;
          }
          if(second.toString().length === 1) {
              second = '0'+second;
          }   
          var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
          return dateTime;
    }

    function getExcess(){
        var start = document.getElementById("start").value;
        var percent = document.getElementById("percent").value;
        var ingred = [];
        if(start === ""){
          document.getElementById("errorMessage").innerHTML = "No start date entered, cancelling excess report";
          return;
        }
        if(percent === ""){
            document.getElementById("errorMessage").innerHTML = "No percentage entered, cancelling excess report";
            return;
        }
        var start_str = changeDate(start);
        var startIndex = 0;
        for(var m = 0; m < window.orderSales.length; m++){
          if(start_str > changeDate(window.orderSales[m].order_date)){
            startIndex++;
          }
        }
        for(;startIndex < window.orderSales.length; startIndex++){
          for(var i = 0; i < window.orderSales[startIndex].order_items.length; i++){
            var j = itemIdSearch(0, window.itemSales.length, window.orderSales[startIndex].order_items[i]);
            if(j === -1){
                continue;
            }
            for(var q = 0; q < window.itemSales[j].item_ingred_ids.length; q++){
                var l = ingredIdSearch(0,window.ingredSales.length, window.itemSales[j].item_ingred_ids[q]);
                if(l === -1){
                    continue;
                }
                var len = ingred.length;
                for(var k = 0; k < len; k++){
                    if(ingred[k].name === window.ingredSales[l].ingred_name){
                        ingred[k].amount = ingred[k].amount + 1;
                        break;
                    }
                    else if(k === len - 1){
                        ingred.push({name: window.ingredSales[l].ingred_name, amount: 1})
                    }
                }
                if(ingred.length === 0){
                    ingred.push({name: window.ingredSales[l].ingred_name, amount: 1})
                }
            }
          }
        }
        var excess = [];
        for(var i = 0; i < ingred.length; i++){
            for(var j = 0; j < window.ingred.length; j++){
                if(ingred[i].name === window.ingred[j].ingred_name){
                    var total = ingred[i].amount + window.ingred[j].ingred_qty;
                    if(total > 0){
                        if(ingred[i].amount/total*100 <= percent){
                            excess.push({name: ingred[i].name, percent: (ingred[i].amount/total*100).toFixed(2)});
                        }
                    }
                }
            }
        }
        window.excess = excess;
        navigate("report");
    }

    return (
        <div>
            <label>Excess Report:</label>
            <br/>
            <label id="errorMessage"> </label>
            <br/>
            <label>Start Time:</label>
            <input type = "datetime-local" id = "start"/>
            <br/>
            <label>Percentage:</label>
            <input type = "number" id = "percent"/>
            <br/>
            <button
                onClick={() => {
                    getExcess();
                }}
            >
                Get Excess Report
            </button>
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

export default Excess;