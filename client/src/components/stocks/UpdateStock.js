import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StockUpdateForm from "../Modals/StockUpdateForm";

const UpdateStock = ({ cart, setCart, setAddedItems, addedItems }) => {
  const { id } = useParams();
  const [prod, setProd] = useState({});
  const [stock, setStock] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [stockErrorMessage, setStockErrorMessage] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [modal, setIsModal] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then((prodctRes) => {
          let stockId = prodctRes.data.stockId.toString();
          if (stockId) {
            axios
              .get(`http://localhost:8000/api/stocks/${stockId}`)
              .then((stockRes) => {
                const combinedData = {
                  product: prodctRes.data,
                  stock: stockRes.data,
                };
                console.log("Combined Data:", combinedData);
                setProd(combinedData);
                setIsLoading(false);
              })
              .catch((err) => {
                setIsLoading(false);
                console.log(err);
              });
          }
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Initialize cart and addedItems states with data from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storedAddedItems =
      JSON.parse(localStorage.getItem("addedItems")) || {};
    setAddedItems(storedAddedItems);
  }, [setCart, setAddedItems]);

  const handleStockUpdate = () => {};

  const handleChange = (e) => {
    const enteredQuantity = Number(e.target.value);
    setQuantity(enteredQuantity);
    console.log(enteredQuantity);
  };

  const handleBuyNow = () => {};

  console.log("singleprod in update stock,");

  return (
    <>
      {prod && prod.stock ? (
        <Box display="flex" justifyContent="center" mt={2} p={5}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
             
              width: "100vh",
              height: "35vw",
            
              position: "relative",
              boxShadow: "1px 1px 10px black",
            }}
          >
            <Box
              style={{
                textAlign: "center",
                alignItems:"center",
                display: "flex",
                flexDirection:"column",
              }}
            >
                  <CardContent>
                    {/* <Typography variant="h5" component="div">
              {singleProduct.productName}
            </Typography> */}
                    <Typography variant="h3" color="text.secondary">
                      <span style={{ fontWeight: "bold" }}>In Stock:</span>{" "}
                      {prod.stock.stockQuantity}
                    </Typography>
                  </CardContent>

                    <CardContent>
                  {/* <Typography variant="h5" component="div">
                      {singleProduct.productName}
                    </Typography> */}
                  <Typography variant="h6" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}>Product Name:</span>{" "}
                    {prod.product.productName}
                  </Typography>
                </CardContent>

                <CardContent>
                  {/* <Typography variant="h5" component="div">
                      {singleProduct.productName}
                    </Typography> */}
                  <Typography variant="h6" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}>Product Description:</span>{" "}
                    {prod.product.description}
                  </Typography>
                </CardContent>

                <CardMedia
            component="img"
            alt={prod.product.productName}
            height="200"
            image={`${prod.product.imageUrl}`}
            sx={{ width: "30%", height: "30%", objectFit: "contain" }}
          />
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                width: "96%",
                padding: "20px",
                margin:"10px"
              }}
            >
              <Box>
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                />
                {stockErrorMessage && (
                  <Typography color="error">{stockErrorMessage}</Typography>
                )}

                {availableStock && (
                  <Typography color="error">{availableStock}</Typography>
                )}
              </Box>

              <Box>
                <Button variant="contained" color="primary">
                  Update
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh" // You can adjust the height as needed
        >
          <CircularProgress color="primary" size={80} />
        </Box>
      )}
    </>
  );
};

export default UpdateStock;
