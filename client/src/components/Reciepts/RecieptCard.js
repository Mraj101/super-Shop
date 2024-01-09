import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  CircularProgress
} from "@mui/material";
import axios from "axios";


const ReceiptCard = ({ receipt }) => {
  const [loading, setIsLoading] = useState(false);
  const [saleProducts, setSaleProducts] = useState([]);
  const [singleProds, setSingleProds] = useState([]);

  const fetchSales = async () => {
    try {
      console.log("here is my reciept",receipt)
      let saleId = receipt.soldProducts.map((sale) => sale.sale_id);
      for (let i = 0; i < saleId.length; i++) {
        const saleRes = await axios.get(
          `http://localhost:8000/api/sales/${saleId[i]}`
        );
        console.log(saleRes.data, "reponse for the Sale");
        setSaleProducts((prev) => {
          return [...prev, saleRes.data];
        });

        try {
          if (saleRes.data) {
            let prodId = saleRes.data.product_Id;
            const prodRes = await axios.get(
              `http://localhost:8000/api/products/${prodId}`
            );
            setSingleProds((prev) => {
              return [...prev, prodRes.data];
            });
          }
        } catch (error) {
          console.log(error, "error of recipt card");
        }
        setIsLoading(false);
        console.log(
          Array.isArray(saleProducts),
          "reponse for the slaessdkfskdfsdklfklsd"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  console.log(receipt, "recipt");

  console.log(singleProds, "here is my singleProd");
  console.log(saleProducts, "success");

 
  return (
    <Paper elevation={6} style={{ padding: 16, margin: 25 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Receipt Number: {receipt._id}
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
            {(
              singleProds.map((products, index) => (
                <TableRow key={products._id}>
                  <TableCell>{products.productName}</TableCell>
                  <TableCell>{saleProducts[index].quantitySold}</TableCell>
                  <TableCell>
                    {products.price * saleProducts[index].quantitySold}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ textAlign: "right", marginTop: 2 }}>
        <Typography variant="h6">
          Total Price: ${receipt.totalAmount}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ReceiptCard;
