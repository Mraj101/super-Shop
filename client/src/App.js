import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import ShowProducts from "./components/product/ShowProducts";
import CreateProductForm from "./components/product/CreateProductForm"; // Assuming the file path is correct
import Home from "./components/Home";
import SingleProduct from "./components/product/SingleProduct";
import Navbar from "./components/Navbar";
import Carts from "./components/product/Carts";
import UpdateStock from "./components/stocks/UpdateStock";
import Reciepts from "./components/Reciepts/Reciepts";
import DailyReport from "./components/saleReport/DailyReport";
import Invoice from "./components/Reciepts/Invoice";

function App() {
  const [cart, setCart] = useState([]);
  // const [remove,setRemove]=useState([])
  const [addedItems, setAddedItems] = useState({});

  const handleRemove = (id) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedData = storedCart.filter((dt) => dt._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    setCart(updatedData);
  };

  return (
    <>
      <Router>
        <Navbar cart={cart} setCart={setCart} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreateProductForm />} />
          <Route
            path="/product/:id"
            element={
              <SingleProduct
                setCart={setCart}
                cart={cart}
                addedItems={addedItems}
                setAddedItems={setAddedItems}
              />
            }
          />
          <Route
            path="/singleProduct/cart"
            element={<Carts cart={cart} setCart={setCart} removeFromCart={handleRemove} />}
          />
          <Route path={"/stocks/:id"} element={<UpdateStock
           setCart={setCart}
           cart={cart}
           addedItems={addedItems}
           setAddedItems={setAddedItems}
          />} />

          <Route path={"/reciepts"} element={<Reciepts
           setCart={setCart}
           cart={cart}
           addedItems={addedItems}
           setAddedItems={setAddedItems}
          />} />
          
          <Route path={"/daily-sales-report"} element={<DailyReport
          />} />

          <Route path={'/invoice'} element={<Invoice/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
