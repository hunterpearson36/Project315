import React from "react";
import {useNavigate} from "react-router-dom";

const SalesReport = () => {
  let navigate = useNavigate();

  function idSearch(left, right, value){
    if(right >= left){
        var mid = left + Math.floor((right - left) / 2)
        if(window.itemSales[mid].item_id === value){
            return mid;
        }
        else if(window.itemSales[mid].item_id > value){
            return idSearch(left, mid - 1, value);
        }
        return idSearch(mid + 1, right, value);
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

    function salesReport(){
        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;
        var items = [];
        window.itemsSales = items;
        if(start === ""){
          document.getElementById("errorMessage").innerHTML = "No start date entered, cancelling sales report";
          return;
        }
        if(end === ""){
          document.getElementById("errorMessage").innerHTML = "No end date entered, cancelling sales report";
          return;
        }
        if(start > end){
          document.getElementById("errorMessage").innerHTML = "Start date is later than the end date, cancelling sales report";
          return;
        }
        var start_str = changeDate(start);
        var end_str = changeDate(end);
        var startIndex = 0;
        var endIndex = window.orderSales.length - 1;
        for(var m = 0, n = window.orderSales.length-1; m < window.orderSales.length; m++, n--){
          if(start_str > changeDate(window.orderSales[m].order_date)){
            startIndex++;
          }
          if(end_str < changeDate(window.orderSales[n].order_date)){
            endIndex--;
          }
        }
        for(;startIndex <= endIndex; startIndex++){
          for(var i = 0; i < window.orderSales[startIndex].order_items.length; i++){
            var j = idSearch(0, window.itemSales.length, window.orderSales[startIndex].order_items[i]);
            var len = items.length;
            if(j === -1){
              continue;
            }
            for(var k = 0; k < len; k++){
              if(items[k].name === window.itemSales[j].item_name){
                items[k].amount = items[k].amount + 1;
                items[k].price = Number(items[k].price) + Number(window.itemSales[j].item_price);
                break;
              }
              else if(k === len - 1){
                items.push({name: window.itemSales[j].item_name, amount: 1, price: Number(window.itemSales[j].item_price)})
              }
            }
            if(items.length === 0){
              items.push({name: window.itemSales[j].item_name, amount: 1, price: Number(window.itemSales[j].item_price)})
            }
          }
        }
        window.itemsSales = items;
        navigate("report");
    }

    return (
        
        <div>
            <label>Start Time:</label>
            <input type = "datetime-local" id = "start"/>
            <br/>
            <label>End Time:</label>
            <input type = "datetime-local" id = "end"/>
            <br/>
            <button
                onClick={() => {
                    salesReport();
                }}
            >
                Get Sales Report
            </button>
            <br/>
            <button
                onClick={() => {
                    navigate("/manager/reports");
                }}
            >
                Back To Reports
            </button>
            <br/>
            <label id = "errorMessage"></label>
        </div>
    );
}

export default SalesReport;