import React, { useState } from "react";
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";

const Carts = ({
  cart,
  setCart,
  removeFromCart,
  singleProduct,
  setQuantity,
  setStockErrorMessage,
  quantity,
}) => {
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState("");
  const [sellerName, setSellerName] = useState("");

  console.log(cart, "cart in cart.js");

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (const item of cart) {
      // Assuming each item in 'cart' has a 'price' property
      if (item.hasOwnProperty("price" && "quantity")) {
        let ItemPrice = parseInt(item.price * item.quantity);
        totalPrice += ItemPrice || 0;
      }
    }

    console.log("total price:", totalPrice);
    return totalPrice;
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

  const handleCheckout = async () => {
    try {
      let data = [];

      for (const item of cart) {
        const { _id, price, quantity, stockId } = item;

        let saleData = {
          product_Id: _id,
          stockId: stockId,
          quantitySold: quantity,
          soldPrice: price,
        };

        let Saleres = await axios.post(
          "http://localhost:8000/api/sales/crt",
          saleData
        );
        console.log(Saleres, "salaar");
        data.push(Saleres.data._id);
        console.log(data, "ar");
      }
      

      try {
        const receiptData = {
          totalAmount: calculateTotalPrice(),
          soldProducts: data.map((saleid) => ({ sale_id: saleid })),
        };
        const reciptRes = await axios.post(
          "http://localhost:8000/api/reciepts/crt",
          receiptData
        );
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/");

        // try {
        //   console.log(data,"trying the scope")
        // } catch (error) {
        //   console.log(error)
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <Paper elevation={6} style={{ padding: 16 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Subtotal Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price * product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ textAlign: "right", marginTop: 2 }}>
            {cart.length > 0 && (
              <>
                {/* <TextField
            label="Buyer Name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            style={{ marginBottom: 1 }}
          />
          <TextField
            label="Seller Name"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            style={{ marginBottom: 1 }}
          /> */}
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
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Carts;
