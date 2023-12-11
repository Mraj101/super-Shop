// Home.js

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  Box,
  Grid,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShowProducts from "./product/ShowProducts";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">

            <Grid item xs={2}>
              <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={8}>
              <Typography variant="h6" style={{ fontFamily: 'cursive', fontSize: '2em', color: 'purple', textShadow: '2px 2px 4px #000000' }}>
                Super Shop
              </Typography>
            </Grid>

            <Grid item xs={2} textAlign="right">
              <IconButton color="inherit" aria-label="cart">
                <ShoppingCartIcon />
              </IconButton>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={5} mb={0}>
          <ShowProducts />
        </Box>
      </Container>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
           <Link to="/create" style={{ textDecoration: "none" }}>
            <Button color="primary" variant="contained" startIcon={<AddCircleIcon />}>
              Add Products
            </Button>
          </Link>

        </List>
      </Drawer>
    </>
  );
};

export default Home;
