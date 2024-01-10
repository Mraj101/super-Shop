import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReceiptCard from './RecieptCard'; // Adjust the import path accordingly
import { Grid, Box, CircularProgress, Skeleton } from '@mui/material';

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reciepts/getAll/');
        setReceipts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false after data fetching, regardless of success or failure
      }
    };

    fetchData();
  }, []);

  // Return the JSX inside the component
  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh" // You can adjust the height as needed
        >
          <CircularProgress color="primary" size={80} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {receipts.map((receipt) => (
            <ReceiptCard
              key={receipt._id} // Adjust the key based on your data structure
              receipt={receipt}
              // Include any additional props if needed
            />
          ))}
          {receipts.length === 0 && (
            // Display loading skeletons if no receipts are available
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={150} animation="wave" />
            ))
          )}
        </Grid>
      )}
    </div>
  );
};

export default Receipts;
