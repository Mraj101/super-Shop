// ... (import statements)
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true);  // Set loading to true initially

  const fetchProductList = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products/getAll");
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh" // You can adjust the height as needed
      >
        <CircularProgress color="primary" size={80} />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={1}
    >
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ width: "100%", height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Price: $${product.price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`Description:${product.description}`}
                </Typography>
                <Link to={`/product/${product._id}`}>
                  <Button variant="contained" color="primary">
                      View Details
                  </Button>                
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowProducts;
