import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SingleProduct = ({ cart, setCart, setAddedItems, addedItems }) => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [stockErrorMessage, setStockErrorMessage] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setSingleProduct(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // const fetchStock = async()=>{
    //   setIsLoading(true);
    //   const stockData = axios.get(`https://localhost:8000/stock`)
    // }

    fetchProduct();
  }, [id]);

  // Initialize cart and addedItems states with data from local storage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // const storedAddedItems =
    //   JSON.parse(localStorage.getItem("addedItems")) || {};
    // setAddedItems(storedAddedItems);
  }, [setCart]);

  const handleStockUpdate = () => {};

  // const handleDecrease = () => {
  //   if (quantity > 1) setQuantity((prev) => prev - 1);
  // };

  // const handleIncrease = () => {
  //   if (quantity < Number(singleProduct.stock)) setQuantity((prev) => prev + 1);
  // };

  // const handleChange = (e) => {
  //   const enteredQuantity = Number(e.target.value);

  //   if (enteredQuantity <= Number(singleProduct.stock)) {
  //     setQuantity(enteredQuantity);
  //     setStockErrorMessage("");
  //   } else {
  //     setStockErrorMessage(
  //       `you only have ${singleProduct.stock} products in stock`
  //     );
  //   }
  // };
  const handleChange = (e) => {
    const enteredQuantity = Number(e.target.value);

    if (enteredQuantity <= Number(singleProduct.stockQuantity)) {
      setQuantity(enteredQuantity);
      setStockErrorMessage("");
    } else {
      setStockErrorMessage(
        `You can only have ${singleProduct.stockQuantity} products in stock`
      );
    }
  };

  const handleCart = () => {
    // let itemInCart =Array.isArray(cart) && cart.some((item) => item._id === singleProduct._id);

    // if (!itemInCart) {
    //   const itemsToAdd = Array.from({ length: quantity }, (_, index) => ({
    //     ...singleProduct,
    //     quantity: index + 1,
    //   }));

    // let newInfo = cart.map(ct => {
    //   if(ct._id === id){
    //     ct.quantity =+ quantity
    //   }else{
    //     let newCart = [...singleProduct, {quantity:quantity}];
    //   }
    //   return(
    //     cart
    //   )
    // })
    let newInfo = cart.map((ct) => {
      if (ct._id === id) {
        if (ct.quantity > Number(singleProduct.stockQuantity)) {
          return (ct.quantity = singleProduct.stockQuantity);
        }
        if (singleProduct.quantity >= Number(singleProduct.stockQuantity))
          setAvailableStock("Added all items in the cart");

        ct.quantity += quantity; // Update quantity for the matching item
      }
      return ct; // Return the updated or unchanged item
    });

    // Check if the item with the given id was not found in the cart
    if (!newInfo.some((ct) => ct._id === id)) {
      // If not found, add a new item to the cart
      newInfo = [...newInfo, { ...singleProduct, quantity: quantity }];
      console.log("here is my quantity");
    }

    // Now, `newInfo` contains the updated cart with the quantity changes or a new item added

    setCart(newInfo);
    // setAddedItems((prev) => ({ ...prev, [singleProduct._id]: true }));

    localStorage.setItem("cart", JSON.stringify(newInfo));
    // localStorage.setItem(
    //   "addedItems",
    //   JSON.stringify({ ...addedItems, [singleProduct._id]: true })
    // );
  };

  // const handleRemove = () => {
  //   const updatedCart = cart.filter((item) => item._id !== singleProduct._id);
  //   setCart(updatedCart);
  //   setAddedItems((prev) => ({ ...prev, [singleProduct._id]: false }));
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  //   localStorage.setItem(
  //     "addedItems",
  //     JSON.stringify({ ...addedItems, [singleProduct._id]: false })
  //   );
  // };
  console.log("i wonder what is in my single product,", singleProduct);
  console.log("here is my added items", addedItems);

  //console.log(cart, "final cart");

  return (
    <>
      {singleProduct.imageUrl ? (
        <Box display="flex" justifyContent="center" mt={2} p={5}>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ position: "absolute", top: "80px", left: "50px" }}
          >
            <ArrowBackIcon /> Back
          </Button>

          <Box display="flex" justifyContent="center" mt={2} p={5}>
            <Card
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80vh",
                height: "38vh",
                border: "1px solid aqua",
                position: "relative",
                boxShadow: "1px 1px 10px black",
              }}
            >
              <CardMedia
                component="img"
                alt={singleProduct.productName}
                height="200"
                image={`${singleProduct.imageUrl}`}
                sx={{ width: "35%", height: "100%", objectFit: "contain" }}
              />
              <CardContent style={{ flex: 1, padding: "16px" }}>
                <Typography variant="h5" component="div">
                  {singleProduct.productName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <span style={{ fontWeight: "bold" }}>
                    Product Description:
                  </span>{" "}
                  {singleProduct.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
                  {singleProduct.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <span style={{ fontWeight: "bold" }}>Stock:</span>{" "}
                  {singleProduct.stockQuantity}
                </Typography>

                <TextField
                  style={{ marginTop: "16px", width: "80%" }}
                  label="Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />

                {/* Add your error messages here if needed */}

                {stockErrorMessage && (
                  <Typography color="error">{stockErrorMessage}</Typography>
                )}
                <IconButton
                  color="primary"
                  onClick={handleCart}
                  disabled={quantity > Number(singleProduct.stockQuantity)}
                  sx={{ position: "absolute", bottom: "0" }}
                >
                  <AddShoppingCartIcon sx={{ fontSize: 50 }} />
                </IconButton>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh" // You can adjust the height as needed
        >
          <CircularProgress color="primary" size={80} />
        </Box>
      )}
    </>
  );
};

export default SingleProduct;
