import { React, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  List,
  Drawer,
} from "@mui/material";
import MenuIcon  from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
              <Typography
                variant="h6"
                style={{
                  fontFamily: "cursive",
                  fontSize: "2em",
                  textShadow: "2px 4px 10px #000000",
                }}
              >
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
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>something</List>
      </Drawer>
    </>
  );
};

export default Navbar;