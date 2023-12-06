const express = require("express");


const router = express.Router();


//destructuring the controllers
const {
    getAllProducts, 
    createProduct, 
    getSingleProduct,
    deleteProductById,
    updateProduct
} = require("../controllers/productControllers");

//get all workouts


router.get("/getAll", getAllProducts);
router.get("/:id",getSingleProduct);
router.post("/crt",createProduct);
router.delete("/:id",deleteProductById);
router.post("/:id",updateProduct);
module.exports = router;
