import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import ShowProducts from "./components/product/ShowProducts";
import CreateProductForm from "./components/product/CreateProductForm"; // Assuming the file path is correct
import Home from "./components/Home";
import SingleProduct from "./components/product/SingleProduct";
import Navbar from "./components/Navbar";
import Carts from "./components/product/Carts";

function App() {
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState({});


 console.log("hi cart" ,cart)
  return (
    <>
      <Router>
        <Navbar  cart={cart} setCart={setCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProductForm />} />
          <Route
            path="/product/:id"
            element={<SingleProduct setCart={setCart} 
            cart={cart} 
            addedItems={addedItems} 
            setAddedItems={ setAddedItems}
            />}
          />
           <Route path="/product/cart" element={<Carts cart={cart} />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
