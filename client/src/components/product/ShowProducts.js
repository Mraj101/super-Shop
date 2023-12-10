// ... (import statements)
import React from "react";
import { Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

// ... rest of your code

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    // imageUrl: 'url_for_product_1_image',
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    // imageUrl: 'url_for_product_2_image',
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of Product 2",
    // imageUrl: 'url_for_product_2_image',
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description of Product 2",
    // imageUrl: 'url_for_product_2_image',
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description of Product 2",
    // imageUrl: 'url_for_product_2_image',
  },
  {
    id: 6,
    name: "Product 6",
    description: "Description of Product 2",
    // imageUrl: 'url_for_product_2_image',
  },
  // Add more products as needed
];

const ShowProducts = () => {
  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh" // Set height to 100% of the viewport
      >
        <Link to="/create">
          <Button variant="contained" color="primary" sx={{margin:'50px'}}>
            Create Product
          </Button>
        </Link>



        <Grid container spacing={2}>
      {/* <Grid item lg={12} sx={{ alignItems: "center" }}>
     
      </Grid> */}

      

      {products.map((product) => (
        <Grid item key={product.id} xs={12} md={4} lg={3}>
          <Card sx={{width:"200px",}}>
            {/* Add your product image here */}
            {/* <CardMedia
              component="img"
              height="140"
              image={product.imageUrl}
              alt={product.name}
            /> */}
            <CardContent >
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Button variant="contained" color="primary">
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      </Box>

    
  );
};

export default ShowProducts;
