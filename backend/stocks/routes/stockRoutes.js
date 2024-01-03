const express = require("express");
const router = express.Router();

const {
  getAllStocks,
  getSingleStock,
  deleteStockById,
  createStock,
  updateStock
} = require("../controllers/stockControllers");

router.get("/getAllStocks", getAllStocks);
router.get("/:id", getSingleStock);
router.delete("/:id", deleteStockById);
router.post("/crt", createStock);
router.put("/update/:id", updateStock);

module.exports = router;
