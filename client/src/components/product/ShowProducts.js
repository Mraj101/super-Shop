// ... (import statements)
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(true); // Set loading to true initially

  const fetchProductList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products/getAll"
      );
      console.log(response.data, "reponse for the product");
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
            <Card
              sx={{
                position: 'relative',
                width: "100%",
                height: "100%",
                border: "1px solid white",
                backgroundColor: "#D7BA89",
                borderRadius: "10px",
                boxShadow: "2px 2px 4px grey",
                margin: "px",
              }}
            >

              <Link to={`/stocks/${product._id}`}>
                <IconButton
                sx={{ position: 'absolute', top: 0, right: 0, color: 'primary.secondary' }}
                onClick={() => console.log('Edit clicked')}
                >
                <EditIcon />
              </IconButton>

              
              </Link>
              
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "10px",
                }}
              >
                <Typography variant="h5" component="div">
                  {product.productName}
                </Typography>

                <CardMedia
                  component="img"
                  alt={product.productName}
                  height="200"
                  image={product.imageUrl}
                  sx={{
                    width: "85%",
                    objectFit: "contain",
                  }}
                />

                <Typography variant="h6" color="text.secondary" m={2}>
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
