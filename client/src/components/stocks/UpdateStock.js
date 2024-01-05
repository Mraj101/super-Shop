import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
  const [quantity, setQuantity] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const [stockErrorMessage, setStockErrorMessage] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [modal, setIsModal] = useState(false);

  let navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
       axios
        .get(`http://localhost:8000/api/products/${id}`)
        .then((prodctRes) => {
          let stockId = prodctRes.data.stockId.toString();
          if (stockId) {
             axios.get(`http://localhost:8000/api/stocks/${stockId}`)
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

  const handleStockUpdate = (e) => {
    const enteredQuantity = Number(e.target.value);
    setQuantity(enteredQuantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/stocks/update/${prod.stock._id}`, {
      stockQuantity: quantity,
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      // Handle errors if needed
      console.error("Error updating stock:", error);
    });
  
    setQuantity(0);
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

              width: "65vw",
              height: "70vh",

              position: "relative",
              boxShadow: "1px 1px 10px black",
            }}
          >
            <Box
              style={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: "70%",
              }}
            >
              <CardContent
                sx={{
                  width: "90%",
                  height: "10%",
                }}
              >
                <Typography
                  variant="h3"
                  color="text.secondary"
                  sx={{
                    width: "90%",
                    height: "10%",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>In Stock:</span>{" "}
                  {prod.stock.stockQuantity}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  <span style={{ fontWeight: "bold" }}>Product Name:</span>{" "}
                  {prod.product.productName}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  <span style={{ fontWeight: "bold" }}>
                    Product Description:
                  </span>{" "}
                  {prod.product.description}
                </Typography>
              </CardContent>

              <CardMedia
                component="img"
                alt={prod.product.productName}
                image={`${prod.product.imageUrl}`}
                sx={{
                  width: "15%",
                  height: "30%",
                  objectFit: "contain",
                  border: "1px solid black",
                  boxShadow: "1px 1px 4px black",
                }}
              />
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box>
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleStockUpdate}
                />
                {stockErrorMessage && (
                  <Typography color="error">{stockErrorMessage}</Typography>
                )}

                {availableStock && (
                  <Typography color="error">{availableStock}</Typography>
                )}
              </Box>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmit(e)}
                >
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
