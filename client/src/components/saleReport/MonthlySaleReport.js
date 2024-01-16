import React, { useState } from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EventIcon from "@mui/icons-material/Event";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const MonthlyReport = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [monthlySales, setMonthlySales] = useState([]);
    const navigate = useNavigate();
  
    const handleMonthChange = (month) => {
      setSelectedMonth(month);
    };
  
    const handleFetchMonthlySales = async () => {
      try {
        const monthlySaleRes = await axios.post(
          "http://localhost:8000/api/dailySales/getSale",
          { month: selectedMonth }
        );
        setMonthlySales(monthlySaleRes.data);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    console.log(monthlySales,"hi montly");
    return (
      <div>
        <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: "80px", left: "50px" }}
      ><ArrowBackIcon />Go Home</Button>
        {/* ... (back button and other elements remain the same) */}
        <Typography variant="h5" marginTop={8} marginBottom={3}>Select Month and Year</Typography>
  
        {/* Month and Year Picker for Monthly Sales */}
        <TextField
          sx={{ marginRight: "10px" }}
          label="Select Month and Year"
          type="month"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon />
              </InputAdornment>
            ),
          }}
        />
  
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchMonthlySales}
        >
          Fetch Monthly Sales
        </Button>
  
        {/* Display the sales report table */}
        <TableContainer
          component={Paper}
          style={{
            marginTop: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#d6f5f5",
            borderRadius: "8px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                {/* Add more table headers if needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlySales.map((sale, index) => (
                <React.Fragment key={sale._id}>
                  <TableRow>
                    <TableCell rowSpan={sale.data.length + 1}>
                      {sale.createdAt.split('T')[0]}
                    </TableCell>
                  </TableRow>
                  {sale.data.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      {/* Add more table cells if needed */}
                    </TableRow>
                  ))}
                  {/* Add a row for totals */}
                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      <strong>Total:</strong>
                    </TableCell>
                    <TableCell>
                      <strong>
                        {sale.data.reduce(
                          (total, product) => total + product.quantity,
                          0
                        )}
                      </strong>
                    </TableCell>
                    <TableCell>
                      <strong>
                        {sale.data
                          .reduce((total, product) => total + product.price, 0)
                          .toFixed(2)}
                      </strong>
                    </TableCell>
                    {/* Add more total cells if needed */}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  export default MonthlyReport;
  