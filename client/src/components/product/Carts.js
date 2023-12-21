import React from "react";

const Carts = ({ cart }) => {
  console.log("my cart", cart);
  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cart.map((item) => {
          console.log("car of item" ,item);
          return <li key={item._id}>{item.productName}</li>;
        })}
      </ul>
    </div>
  );
};

export default Carts
