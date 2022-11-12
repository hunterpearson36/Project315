import React from "react";
import Home from "./Pages/Home";
import Customer from "./Pages/Customer";
import Server from "./Pages/Server";
import Manager from "./Pages/Manager";
import ErrorPage from "./Pages/ErrorPage";
import OrderPlaced from "./Pages/OrderPlaced";
import ItemStructures from "./Pages/ItemStructures";
import IngredientsTable from "./Pages/IngredientsTable";
import Extra from "./Pages/Extra";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return ( 
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/server" element={<Server />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/manager/item_structures-table" element={<ItemStructures />} />
        <Route path="/manager/ingredients-table" element={<IngredientsTable />} />
        <Route path="/extra" element={<Extra />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
  );
}

export default App;
