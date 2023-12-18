import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import ShowProducts from "./components/product/ShowProducts";
import CreateProductForm from "./components/product/CreateProductForm"; // Assuming the file path is correct
import Home from "./components/Home";
import SingleProduct from "./components/product/SingleProduct";
import Navbar from "./components/Navbar";

function App() {
  const [cart, setCart] = React.useState(0);

  return (
    <>
      <Router>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProductForm />} />
          <Route
            path="/product/:id"
            element={<SingleProduct cart={cart} setCart={setCart} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
