import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import ShowProducts from "./components/product/ShowProducts";
import CreateProductForm from "./components/product/CreateProductForm"; // Assuming the file path is correct
import Home from "./components/Home";
import SingleProduct from "./components/product/SingleProduct";
import Navbar from "./components/Navbar";

function App() {
  const [cart, setCart] = React.useState([]);
 console.log("hi cart" ,cart)
  return (
    <>
      <Router>
        <Navbar  cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProductForm />} />
          <Route
            path="/product/:id"
            element={<SingleProduct setCart={setCart} cart={cart}/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
