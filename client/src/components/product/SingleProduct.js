import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const SingleProduct = ({ cart, setCart, setAddedItems, addedItems }) => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setSingleProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Initialize cart and addedItems states with data from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storedAddedItems = JSON.parse(localStorage.getItem("addedItems")) || {};
    setAddedItems(storedAddedItems);
  }, [setCart, setAddedItems]);

  const handleStockUpdate = () => {};

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < 5) setQuantity((prev) => prev + 1);
  };

  const handleBuyNow = () => {};

  const handleCart = () => {
    let itemInCart =
      Array.isArray(cart) &&
      cart.some((item) => item._id === singleProduct._id);
    if (!itemInCart) {
      const itemsToAdd = Array.from({ length: quantity }, (_, index) => ({
        ...singleProduct,
        quantity: index + 1,
      }));

      const newCart = [...cart, ...itemsToAdd];
      setCart(newCart);
      setAddedItems((prev) => ({ ...prev, [singleProduct._id]: true }));

      localStorage.setItem("cart", JSON.stringify(newCart));
      localStorage.setItem(
        "addedItems",
        JSON.stringify({ ...addedItems, [singleProduct._id]: true })
      );
    }
  };

  const handleRemove = () => {
    const updatedCart = cart.filter((item) => item._id !== singleProduct._id);
    setCart(updatedCart);
    setAddedItems((prev) => ({ ...prev, [singleProduct._id]: false }));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem(
      "addedItems",
      JSON.stringify({ ...addedItems, [singleProduct._id]: false })
    );
  };

  //console.log(cart, "final cart");

  return (
    <Box display="flex" justifyContent="center" mt={2} p={5}>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vh",
          height: "30vw",
          border: "2px solid red",
          position: "relative",
        }}
      >
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={handleStockUpdate}
        >
          <AddIcon />
        </IconButton>

        <CardMedia
          component="img"
          alt={singleProduct.productName}
          height="200"
          image={`URL_FOR_PRODUCT_IMAGE/${singleProduct._id}`}
          sx={{ border: "2px solid yellow", width: "40%" }}
        />

        <CardContent style={{ flex: 1 }}>
          {/* <Typography variant="h5" component="div">
                {singleProduct.productName}
              </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {singleProduct.description}
          </Typography>
        </CardContent>

        <Box
          display="flex"
          flexDirection="column"
          style={{
            padding: "10px",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Box display="flex" justifyContent="flex-start" flexDirection="row">
            <Typography m={0} p={0}>
              quantity
            </Typography>
            <IconButton onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" component="span">
              {`${quantity}`}
            </Typography>
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>

              {/* <IconButton
                color="primary"
                onClick={handleCart }
                disabled={flag === false ? false : true}
              >
                <AddShoppingCartIcon sx={{ fontSize: 50 }} />
              </IconButton> */}
              {addedItems[singleProduct._id] ? (
                <Button
                  onClick={handleRemove}
                  variant="contained"
                  color="secondary"
                  sx={{ fontSize: 14, marginLeft: 1 }}
                >
                  Remove from Cart
                </Button>
              ) : (
                <IconButton color="primary" onClick={handleCart}>
                  <AddShoppingCartIcon sx={{ fontSize: 50 }} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SingleProduct;
