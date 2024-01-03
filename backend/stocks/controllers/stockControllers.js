const mongoose = require("mongoose");
const Stocks = require("../models/stockModels"); // Adjust the path based on your project structure

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stocks.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

// Controller to create a new product

const createStock = async (req, res) => {
  try {
    let data = await Stocks.create(req.body);
    return res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a single product by ID
const getSingleStock = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such stock is listed" });
  }

  const stock = await Stocks.findById(id);


  if (!stock) res.status(404).json({ error: "no such stock document" });

  res.status(200).json(stock);
};

// Controller to delete a product by ID
const deleteStockById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: "no such stock doc available" });
  const stock = await Stocks.findOneAndDelete({ _id: id });

  if (!stock) res.status(404).json({ error: "no such product" });

  return res.status(201).json(stock);
};

const updateStock = async (req, res) => {
  const { id } = req.params;
  let stockQty = {...req.body}
  let qty = stockQty.stockQuantity

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout or id" });
  }
  console.log(req.body,"beckedn stock");
  const singleStock = await Stocks.findById(id);
  const stock = await Stocks.findByIdAndUpdate(
    { _id: id },
    {
      stockQuantity:singleStock.stockQuantity+qty
    },
    { new: true } 
  );


  if (!stock) return res.status(404).json({ error: "no such stocks exists" });

  res.status(201).json(stock);
};

// Controller to update a product by ID

module.exports = {
  getAllStocks,
  createStock,
  getSingleStock,
  deleteStockById,
  updateStock,
};
