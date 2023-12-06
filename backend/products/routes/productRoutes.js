const express = require("express");


const router = express.Router();


//destructuring the controllers
const {
    getAllProducts, 
    createProduct 
} = require("../controllers/productControllers");

//get all workouts


router.get("/getAll", getAllProducts);
router.post("/crt",createProduct);

module.exports = router;
