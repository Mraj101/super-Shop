import { React, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Badge,
  List,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Fetch the cart quantity from localStorage on mount
    const storedQuantity = localStorage.getItem("cartQuantity");

    console.log("before null",storedQuantity);
    if (storedQuantity) {
      setCartQuantity(parseInt(storedQuantity, 10));
    }

    // Subscribe to changes in localStorage
    
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={8}>
              <Link to={'/  '} style={{textDecoration:"none"}}>
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "cursive",
                    fontSize: "2em",
                    textShadow: "2px 4px 10px #000000",
                    color:"white",
                  }}
                >
                  Super Shop
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={2} textAlign="right">
              <IconButton color="inherit" aria-label="cart">
                <Badge badgeContent={cartQuantity} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>something</List>
      </Drawer>
    </>
  );
};

export default Navbar;
