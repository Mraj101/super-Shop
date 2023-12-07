const express = require("express");
const router = express.Router();

const {
  getSingleSale,
  getAllSale,
  deleteSaleById,
  updateSale,
  createSale,
} = require("../controllers/saleController");

router.get("/getAllSales", getAllSale);
router.get("/:id", getSingleSale);
router.delete("/:id", deleteSaleById);
router.post("/crt", createSale);
router.put("/:id", updateSale);

module.exports = router;
