// Navbar.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Navbar = ({ cart, setCart }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Initialize cart state with data from local storage on mount
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, [cart.length]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            {/* <Grid item xs={2}>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Grid> */}

            <Grid item xs={10}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "cursive",
                    fontSize: "2em",
                    textShadow: "2px 4px 10px #000000",
                    color: "white",
                  }}
                >
                  Super Shop
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={2} textAlign="right">
              <Link to="/singleProduct/cart" style={{ textDecoration: "none" }}>
                <IconButton color="danger" aria-label="cart">
                  <Badge color="primary">
                    <ShoppingCartIcon />
                    <span>{cart.length === 0 ? "" : cart.length}</span>
                  </Badge>
                </IconButton>
              </Link>
            </Grid>

            
          </Grid>
        </Toolbar>
      </AppBar>
      {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>something</List>
      </Drawer> */}
    </>
  );
};

export default Navbar;
