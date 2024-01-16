import React, { useState } from "react";
import { Container, Box, Button } from "@mui/material";

import ShowProducts from "./product/ShowProducts";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Container maxWidth={"90%"}>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            color="success"
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ margin: "30px", marginRight: "auto" }}
          >
            Add Products
          </Button>

          
        </Link>
        
        <Link to="/reciepts" style={{ textDecoration: "none" }}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ margin: "30px", marginRight: "auto" }}
          >
            Show Reciepts
          </Button>

          
        </Link>

        <Link to="/daily-sales-report" style={{ textDecoration: "none" }}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ margin: "30px" }}
          >
            Daily Sales Report
          </Button>
        </Link>
        
         <Link to="/monthly-sales-report" style={{ textDecoration: "none" }}>
          <Button
            color="error"
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{ margin: "30px" }}
          >
            Monthly Sales Report
          </Button>
        </Link>

        <Box mt={5} mb={0}>
          <ShowProducts />
        </Box>
      </Container>
    </>
  );
};

export default Home;
