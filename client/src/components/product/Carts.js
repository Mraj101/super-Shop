import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Carts = ({ cart,removeFromCart,singleProduct,setQuantity,setStockErrorMessage,quantity }) => {
  // Create a map to store quantities for each product
  

  // Count the occurrences of each product ID in the cart
  // const countQuantity = () => {
  //   let qtyCount = new Map();
  //   for (let c of cart) {
  //     qtyCount.set(c._id, (qtyCount.get(c._id) || 0) + 1);
  //   }
  //   return qtyCount;
  // };

  // const qtyCount = countQuantity();
  const handleChange = (e) => {
    const enteredQuantity = Number(e.target.value);

    if (enteredQuantity <= Number(singleProduct.stock)) {
      setQuantity(enteredQuantity);
      setStockErrorMessage("");
     
    } else {
      setStockErrorMessage(
        `you only have ${singleProduct.stock} products in stock`
      );
    }
  };

 

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Cart Items</h2>
      {cart.length !== 0 ? (
        cart.map((product) => (
          <Card
            key={product._id}
            style={{
              marginBottom: 10,
              width: "70%",
              boxShadow: "1px 1px 5px black",
              backgroundColor: "aliceblue",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {product.productName}
              </Typography>

              <CardMedia
                component="img"
                alt={product.productName}
                height="200"
                image={product.imageUrl}
                sx={{ width: "50%", objectFit: "contain" }}
              />

              <Typography color="text.secondary">
              <span>Description:</span>{product.description}
              </Typography>
              
              <Typography color="text.secondary">
                <span>price</span>:{product.price}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Total Quantity: {(product.quantity>Number(product.stock))? (product.stock): product.quantity}
              </Typography>

              <TextField
                style={{ width: "90%" }}
                label="Quantity"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeFromCart(product._id)}
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h1">No items in the cart</Typography>
      )}
    </div>
  );
};

export default Carts;
