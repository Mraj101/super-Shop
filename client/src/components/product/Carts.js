import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  TextField,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Carts = ({
  cart,
  removeFromCart,
  singleProduct,
  setQuantity,
  setStockErrorMessage,
  quantity,
}) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      return total + product.price * Math.min(product.quantity, product.stock);
    }, 0);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;

    if (newQuantity >= 1 && newQuantity <= singleProduct.stock) {
      setQuantity(newQuantity);
      setStockErrorMessage("");
    }
  };

  const handleInputChange = (e) => {
    const enteredQuantity = Number(e.target.value);

    if (enteredQuantity >= 1 && enteredQuantity <= singleProduct.stock) {
      setQuantity(enteredQuantity);
      setStockErrorMessage("");
    }
  };

  const handleChange = (e) => {
    const enteredQuantity = Number(e.target.value);

    if (enteredQuantity <= Number(singleProduct.stock)) {
      setQuantity(enteredQuantity);
      setStockErrorMessage("");
    } else {
      setStockErrorMessage(
        `You only have ${singleProduct.stock} products in stock`
      );
    }
  };

  const handleCheckout = () => {
    // Add logic for handling the checkout process
    // This can include navigating to a checkout page or sending the order to the server
    console.log("Checkout clicked!");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <div>
          <h2>Cart Items</h2>
          {cart.length !== 0 ? (
            cart.map((product) => (
              <Card
                key={product._id}
                style={{
                  marginBottom: 10,
                  marginLeft: 20,
                  position: "relative",
                  width: "70%", // Adjust the width to make it less wide
                  boxShadow: "1px 1px 5px black",
                  backgroundColor: "aliceblue",
                }}
              >
                <CardContent style={{ marginLeft: 20, paddingTop: 0 }}>
                  <Typography variant="h6" component="div">
                    {product.productName}
                  </Typography>

                  <Typography color="text.secondary">
                    <span>Description:</span>
                    {product.description}
                  </Typography>

                  <Typography color="text.secondary">
                    <span>Price:</span>
                    {product.price}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Total Quantity:{" "}
                    {product.quantity > Number(product.stock)
                      ? product.stock
                      : product.quantity}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 1,
                    }}
                  >
                    <IconButton
                      aria-label="remove"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      style={{ width: "30%", textAlign: "center" }}
                      label="Quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleInputChange}
                    />
                    <IconButton
                      aria-label="add"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFromCart(product._id)}
                    startIcon={<DeleteIcon />}
                    style={{ marginTop: 1 }}
                  >
                    Remove
                  </Button>
                </CardContent>
                <CardMedia
                  component="img"
                  alt={product.productName}
                  height="150"
                  image={product.imageUrl}
                  sx={{
                    width: "30%", // Adjust the width of the image
                    objectFit: "contain",
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                />
              </Card>
            ))
          ) : (
            <Typography variant="h1">No items in the cart</Typography>
          )}
        </div>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
            p: 2,
            textAlign: "right",
          }}
        >
          <Typography variant="h6">
            Total Price: ${calculateTotalPrice()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            style={{ marginTop: 2 }}
          >
            Checkout
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Carts;
