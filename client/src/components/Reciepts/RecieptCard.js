import React, { useEffect, useState } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const ReceiptCard = ({ receipt }) => {
    const [loading,setIsLoading]=useState(false)
    const [saleProducts,setSaleProducts]=useState([])
    const [singleProds,setSingleProds]=useState([])

    const fetchSales = async () => {
        try {
          let saleId=receipt.soldProducts.map((sale)=>(sale.sale_id))
          for(let i=0;i<saleId.length;i++){
            const saleRes = await axios.get(
              `http://localhost:8000/api/sales/${saleId[i]}`
            );
            console.log(saleRes.data, "reponse for the product");
            setSaleProducts(saleRes.data);

            try {
              if(saleProducts){
                let prodId=saleProducts.product_Id;
                const prodRes= await axios.get(`http://localhost:8000/api/products/${prodId}`)
                setSingleProds(prodRes.data)
              }
            } catch (error) {
              console.log(error,"error of recipt card")
            }
           setIsLoading(false);
            console.log(saleProducts, "reponse for the slaessdkfskdfsdklfklsd");
          }

        } catch (err) {
          console.log(err);
        }
      };

        useEffect(()=>{
            fetchSales();
        },[])

    console.log(receipt, "recipt");
    
    console.log(saleProducts,"here is my prod id");

  
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
                <TableCell>{singleProds.productName}</TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>{singleProds.price}</TableCell>
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
