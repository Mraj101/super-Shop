// Install MUI using: npm install @mui/material @emotion/react @emotion/styled

import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Invoice = () => {
    const [latestReceipt, setLatestReceipt] = useState(null);
  // Sample data for the invoice
  const invoiceData = [
    { item: 'Service 1', description: 'Consulting', quantity: 5, unitPrice: 100, total: 500 },
    { item: 'Service 2', description: 'Development', quantity: 8, unitPrice: 150, total: 1200 },
    { item: 'Service 3', description: 'Design', quantity: 3, unitPrice: 200, total: 600 },
  ];

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reciepts/getAll/');
        const receipts = response.data;
        const latest = receipts.length > 0 ? receipts[0] : null;
        setLatestReceipt(latest);
      } catch (error) {
        console.error('Error fetching receipts:', error);
      }
    };

    fetchReceipts();
  }, []);


  // Calculate total amount
  const totalAmount = invoiceData.reduce((acc, item) => acc + item.total, 0);

  return (
    <Paper style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Invoice
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Unit Price</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">${row.unitPrice}</TableCell>
                <TableCell align="center">${row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" align="right" style={{ marginTop: '20px' }}>
        Total: ${totalAmount}
      </Typography>
    </Paper>
  );
};

export default Invoice;
