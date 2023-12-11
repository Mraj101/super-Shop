import { React, useEffect, useState } from "react";
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

const products = [
  {
    _id: "65703b5f5f144ba78b05bfb3",
    productName: "Chips",
    description: "Something we can eat",
    price: 15,
    status: true,
    isActive: true,
    isDeleted: false,
    deleteDate: null,
    createdAt: "2023-12-06T09:14:07.683+00:00",
    updatedAt: "2023-12-06T09:14:07.683+00:00",
    __v: 0,
  },
];

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const fetchProductList = async () => {
    setIsLoading(true);
    await axios
      .get("http://localhost:8000/api/products/getAll")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  if (loading) return <CircularProgress />;

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
