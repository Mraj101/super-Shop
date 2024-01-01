import React, { useState } from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StockUpdateForm = ({ onSubmit,modal }) => {
  const [stockQuantity, setStockQuantity] = useState(0);

  const handleDecrease = () => {
    if (stockQuantity > 0) setStockQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setStockQuantity((prev) => prev + 1);
  };

  const handleSubmit = () => {
    onSubmit(stockQuantity);
  };

  

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleDecrease}>
          <RemoveIcon />
        </IconButton>
        <TextField
          label="stockQuantity"
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          sx={{width:"30%",margin:"10px"}}
        />
        <IconButton onClick={handleIncrease} m={2}>
          <AddIcon />
        </IconButton>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default StockUpdateForm;
