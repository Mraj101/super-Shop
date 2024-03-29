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
import DateRangeIcon from "@mui/icons-material/DateRange";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
 
  const [dailySales, setDailySales] = useState([]);

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const handleMonthChange = (month) => {
  //   // setSelectedMonth(month);
  //   // let monthDates=new Date(month);
  //   // let y=monthDates.getFullYear();
  //   // let m=monthDates.getMonth();
  //   // let startDay=new Date(y,m,1);
  //   setSelectedMonth(month);
  // };

 

  

  const handleFetchTodaySales = async () => {
    try {
      const dailySaleRes = await axios.post(
        "http://localhost:8000/api/dailySales/getSale",
        { date: selectedDate }
      );

      // Set the fetched data to the state
      setDailySales(dailySaleRes.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  console.log(dailySales,"daily sale data");

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: "80px", left: "50px" }}
      >
        <ArrowBackIcon /> Back
      </Button>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5">Select Date.</Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => handleDateChange(new Date(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchTodaySales}
            >
              Fetch Today's Sales
            </Button>
          </Grid>
        </Grid>

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
              {dailySales.map((sale, index) => (
                <React.Fragment key={sale._id}>
                  <TableRow>
                    <TableCell rowSpan={sale.data.length + 1}>
                      {index === 0
                        ? new Date(sale.date).toLocaleDateString()
                        : null}
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
    </div>
  );
};

export default DailyReport;
