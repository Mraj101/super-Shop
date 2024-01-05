import React, { useEffect, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const ReceiptCard = ({ receipt }) => {
    const [loading,setIsLoading]=useState(false)
    const [saleProducts,setSaleProducts]=useState([])

    // const fetchSales = async () => {
    //     try {
    //       const saleRes = await axios.get(
    //         "http://localhost:8000/api/sales/getAll"
    //       );
    //       console.log(saleRes.data, "reponse for the product");
    //       saleProducts(saleRes.data);
    //       setIsLoading(false);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    //     useEffect(()=>{
    //         fetchSales();
    //     },[])

    console.log("what is inside recipt?",receipt)
  return (
    <Paper elevation={6} style={{ padding: 16, margin: 25 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Receipt Number: {receipt.receiptNumber}
      </Typography>

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
            {receipt.soldProducts.map((soldProduct) => (
              <TableRow key={soldProduct._id}>
                <TableCell>{/* Product Name Here */}</TableCell>
                <TableCell>{soldProduct.quantity}</TableCell>
                <TableCell>{/* Subtotal Price Here */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ textAlign: 'right', marginTop: 2 }}>
        <Typography variant="h6">
          Total Price: ${receipt.totalAmount}
        </Typography>

      
      </Box>
    </Paper>
  );
};

export default ReceiptCard;
