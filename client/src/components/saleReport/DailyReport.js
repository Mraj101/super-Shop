import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import axios from 'axios';

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFetchTodaySales = async () => {
    try {

      // You can handle the received data as needed
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <Grid container justifyContent="flex-end" spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h5">
            Select Date.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            style={{ margin: "20px" }}
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
          <Button variant="contained" color="primary" onClick={handleFetchTodaySales}>
            Fetch Today's Sales
          </Button>
        </Grid>
      </Grid>

      {/* Your other content goes here */}
    </div>
  );
};

export default DailyReport;
