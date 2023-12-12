import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CreateProductForm = () => {
  let navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    price: null,
    status: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === "status" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post(
      `http://localhost:8000/api/products/crt`,
      productData
    );
    navigate("/");
    // TODO: Add logic to send data to the backend/database
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box p={2}>
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          value={productData.productName}
          onChange={handleChange}
          required
        />
      </Box>
      <Box p={2}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
        />
      </Box>
      <Box p={2}>
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </Box>

      <Box p={2}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default CreateProductForm;
