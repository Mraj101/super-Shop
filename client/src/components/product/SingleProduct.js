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
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StockUpdateForm from "../Modals/StockUpdateForm";

const SingleProduct = ({ cart, setCart, setAddedItems, addedItems }) => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setIsLoading] = useState(false);
  const [stockErrorMessage, setStockErrorMessage] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [modal,setIsModal]=useState(false)
  

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

    const storedAddedItems =
      JSON.parse(localStorage.getItem("addedItems")) || {};
    setAddedItems(storedAddedItems);
  }, [setCart, setAddedItems]);


 const handleStockUpdate=()=>{

  }
  

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < Number(singleProduct.stock)) setQuantity((prev) => prev + 1);
  };

  const handleChange = (e) => {
    const enteredQuantity = Number(e.target.value);

    if (enteredQuantity <= Number(singleProduct.stock)) {
      setQuantity(enteredQuantity);
      setStockErrorMessage("");
     
    } else {
      setStockErrorMessage(
        `you only have ${singleProduct.stock} products in stock`
      );
    }
  };

  const handleBuyNow = () => {};

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
      if (ct._id === id && ct.quantity < Number(singleProduct.stock)) {
        if (ct.quantity > Number(singleProduct.stock)) {
          return ct.quantity =singleProduct.stock 

        }
        if(singleProduct.quantity>=Number(singleProduct.stock))
          setAvailableStock("Added all items in the cart")
        
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
    setAddedItems((prev) => ({ ...prev, [singleProduct._id]: true }));

    localStorage.setItem("cart", JSON.stringify(newInfo));
    localStorage.setItem(
      "addedItems",
      JSON.stringify({ ...addedItems, [singleProduct._id]: true })
    );
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
    <Box display="flex" justifyContent="center" mt={2} p={5}>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vh",
          height: "30vw",
          border: "1px solid aqua",
          position: "relative",
          boxShadow: "1px 1px 10px black",
        }}
      >
        <Box style={{ height: "65%",position:"relative" }}>
          <IconButton
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={()=>setIsModal(!modal)}
          >
            <AddIcon />
          </IconButton>


          <CardMedia
            component="img"
            alt={singleProduct.productName}
            height="200"
            image={`${singleProduct.imageUrl}`}
            sx={{ width: "50%", height: "40%", objectFit: "contain" }}
            />
          <CardContent>
            {/* <Typography variant="h5" component="div">
                {singleProduct.productName}
              </Typography> */}
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Product Name:</span>{" "}
              {singleProduct.productName}
            </Typography>
          </CardContent>

          <CardContent style={{ flex: 1 }}>
            {/* <Typography variant="h5" component="div">
                {singleProduct.productName}
              </Typography> */}
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: "bold" }}> Product Description:</span>{" "}
              {singleProduct.description}
            </Typography>
          </CardContent>

          {modal && <Box sx={{width:"40%",height:"200px",position:"absolute",right:"40px",top:"14px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"5px",backgroundColor:"aqua",boxShadow:"1px 1px 4px red"}}>
             <StockUpdateForm  />
          </Box> }

          <CardContent>
            {/* <Typography variant="h5" component="div">
                {singleProduct.productName}
              </Typography> */}
            <Typography variant="body2" color="text.secondary">
              <span style={{ fontWeight: "bold" }}>Stock:</span>{" "}
              {singleProduct.stock}
            </Typography>
          </CardContent>
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          style={{
            width: "96%",
            padding: "10px",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Box display="flex" flexDirection="row" sx={{ width: "30%" }}>
            <IconButton onClick={handleDecrease}>
              <RemoveIcon />
            </IconButton>

            {/* {`${quantity}`} */}
            <Box>
              <TextField
                style={{ width: "90%" }}
                label="Quantity"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
              {stockErrorMessage &&  (
                <Typography color="error">{ stockErrorMessage }</Typography>
              )}

              {availableStock && (
                <Typography color="error">{ availableStock }</Typography>
              )
              }
            </Box>
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box sx={{ width: "250px", position: "relative" }}>
            {/* <IconButton
                color="primary"
                onClick={handleCart }
                disabled={flag === false ? false : true}
              >
                <AddShoppingCartIcon sx={{ fontSize: 50 }} />
              </IconButton> */}

            {/* {addedItems[singleProduct._id] ? (
              <Button
                onClick={handleRemove}
                variant="contained"
                color="secondary"
                sx={{
                  fontSize: 14,
                  marginLeft: 1,
                  position: "absolute",
                  right: "1px",
                }}
              >
                Remove from Cart
              </Button>
            )  */}
            <IconButton
              sx={{ position: "absolute", right: "0" }}
              color="primary"
              onClick={handleCart}
            >
              <AddShoppingCartIcon
                disabled={quantity > Number(singleProduct.stock)}
                sx={{ fontSize: 50 }}
              />
            </IconButton>
          </Box>
        </Box>
        
      </Card>
    </Box>
  );
};

export default SingleProduct;
