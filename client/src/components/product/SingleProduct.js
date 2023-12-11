import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setSingleProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Replace this with your actual logic to add the product to the cart
    console.log("Product added to cart:", singleProduct);
  };

  const handleIncreaseQuantity = () => {
    setStockQuantity((prevQuantity) => prevQuantity + 1);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2} p={10}>
      <Card style={{ display: "flex", width: "40%", height:"150px", border: "2px solid red", position: "relative" }}>
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleIncreaseQuantity}
        >
          <AddIcon />
        </IconButton>
        {/* <CardMedia
          component="img"
          alt={singleProduct.productName}
          height="200"
          image={`URL_FOR_PRODUCT_IMAGE/${singleProduct._id}`}
        /> */}
        <CardContent style={{ flex: 1 }}>
          <Typography variant="h5" component="div">
            {singleProduct.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {singleProduct.description}
          </Typography>
        </CardContent>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          style={{ padding: "10px", position: "absolute", bottom: 0, right: 0 }}
        >
          <IconButton color="primary" onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default SingleProduct;
