import { React, useState } from "react";
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

const Navbar = ({ cart }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  //console.log(cartQuantity, "cart");
 console.log(cart.length, "navbarcart")
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
              <IconButton color="inherit" aria-label="cart">
                <Badge color="secondary">
                  <ShoppingCartIcon />
                  <span>{(cart.length===0)?'':cart.length}</span>
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
