import React, { useState,useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Button } from '@mui/material';

import axios from 'axios';
const ProductCard = ({ product }) => {
  const [stocks, setStocks] = useState({});
  const [loading, setIsLoading] = useState(true);


//   console.log(product,"inside my card.js")
//   const fetStocks = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/stocks/${product.stockQuantity}`
//       );
//       setIsLoading(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   useEffect(() => {
//     fetStocks();
//   }, []);


  const handleSubmit = () => {
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          border: '1px solid white',
          backgroundColor: 'lightblue',
          borderRadius: '10px',
          boxShadow: '2px 2px 4px grey',
          margin: 'px',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px',
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
              width: '85%',
              objectFit: 'contain',
            }}
          />

          <Typography variant="h6" color="text.secondary" m={2}>
            {`Price: $${product.price}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Description: ${product.description}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Stock: ${product.stockQuantity}`}
          </Typography>
          {/* <TextField
            label="stockQuantity"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            sx={{ width: '59%', margin: '10px' }}
          /> */}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Product Stocks
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
