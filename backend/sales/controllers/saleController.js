const mongoose = require("mongoose");
const Sales = require("../models/saleModel"); // Adjust the path based on your project structure

const getAllSale = async (req, res) => {
  try {
    const sales = await Sales.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

// Controller to create a new product

const createSale = async (req, res) => {
  try {
    let data = await Sales.create(req.body);
    return res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a single product by ID
const getSingleSale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such sale is listed" });
  }

  const sale = await Sales.findById(id);

  if (!sale) res.status(404).json({ error: "no such sales document" });

  res.status(200).json(sale);
};

// Controller to delete a product by ID
const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: "no such sale doc available" });
  const sales = await Sales.findOneAndDelete({ _id: id });

  if (!sales) res.status(404).json({ error: "no such product" });

  return res.status(201).json(sales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout or id" });
  }
  const sales = await Sales.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!sales) return res.status(404).json({ error: "no such sales exists" });

  res.status(201).json(sales);
};

// Controller to update a product by ID

module.exports = {
  getAllSale,
  createSale,
  getSingleSale,
  deleteSaleById,
  updateSale,
};
