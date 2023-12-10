import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ShowProducts from "./components/product/ShowProducts";
import CreateProductForm from "./components/product/CreateProductForm"; // Assuming the file path is correct

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowProducts />} />
        <Route path="/create" element={<CreateProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
