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

        <Box mt={5} mb={0}>
          <ShowProducts />
        </Box>
      </Container>
    </>
  );
};

export default Home;
