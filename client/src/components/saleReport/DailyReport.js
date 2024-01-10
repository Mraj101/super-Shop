import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can perform any other actions when the date is changed
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
            value={selectedDate.toISOString().split("T")[0]} // Format date to 'YYYY-MM-DD'
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
      </Grid>

      {/* Your other content goes here */}
    </div>
  );
};

export default DailyReport;
