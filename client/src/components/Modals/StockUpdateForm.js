import React, { useState } from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StockUpdateForm = ({ onSubmit,modal }) => {
  const [quantity, setQuantity] = useState(0);

  const handleDecrease = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleSubmit = () => {
    onSubmit(quantity);
  };

  

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleDecrease}>
          <RemoveIcon />
        </IconButton>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
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
