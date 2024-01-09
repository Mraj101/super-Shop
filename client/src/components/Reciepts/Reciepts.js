import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReceiptCard from './RecieptCard'; // Adjust the import path accordingly
import { Grid } from '@mui/material';

const Reciepts = () => {
  const [receipts, setReceipts] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [singleProds, setSingleProds] = useState([]);
  const [loading, setIsLoading] = useState(false);




  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reciepts/getAll/');
      setReceipts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
  
    fetchData();
  }, []);



 
  return (
    <Grid container spacing={2}>
      {receipts.map((receipt) => (
        <ReceiptCard
          key={receipt._id} // Adjust the key based on your data structure
          receipt={receipt}
          // Include any additional props if needed
        />
      ))}
    </Grid>
  );
};

export default Reciepts;
