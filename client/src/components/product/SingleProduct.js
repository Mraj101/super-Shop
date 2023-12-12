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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [stockQuantity, setStockQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setSingleProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Replace this with your actual logic to add the product to the cart
    console.log("Product added to cart:", singleProduct);
  };

  const handleBuyNow = () => {};

  return (
    <Box display="flex" justifyContent="center" mt={2} p={5}>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vh",
          height: "30vw",
          border: "2px solid red",
          position: "relative",
        }}
      >
            <IconButton
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={handleIncreaseQuantity}
            >
              <AddIcon />
            </IconButton>

            <CardMedia
              component="img"
              alt={singleProduct.productName}
              height="200"
              image={`URL_FOR_PRODUCT_IMAGE/${singleProduct._id}`}
              sx={{ border: "2px solid red", width: "40%" }}
            />

            <CardContent style={{ flex: 1 }}>
              {/* <Typography variant="h5" component="div">
                {singleProduct.productName}
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                {singleProduct.description}
              </Typography>
            </CardContent>

            <Box display="flex" alignItems="center">
              <Box>
                <IconButton onClick={handleDecreaseQuantity}>
                  <Typography mr={2}>quantity</Typography>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" component="span">
                  {` ${quantity}`}
                </Typography>
                <IconButton onClick={handleIncreaseQuantity}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
                style={{
                  padding: "10px",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                  <IconButton color="primary" onClick={handleAddToCart}>
                    <AddShoppingCartIcon sx={{ fontSize: 50 }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
      </Card>
    </Box>
  );
};

export default SingleProduct;