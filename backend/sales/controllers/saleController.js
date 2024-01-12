const mongoose = require("mongoose");
const Stocks=require("../../stocks/models/stockModels")
const Sales = require("../models/saleModel"); // Adjust the path based on your project structure
const SaleService=require('../../services/SaleService')

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
    // Create the sale
    let data = await Sales.create(req.body);
    



    //updating the stock
    if (data) {
      const stock = await Stocks.findById(data.stockId);
      try {
        const updatedStock = await Stocks.findByIdAndUpdate(
          { _id: data.stockId },
          {
            stockQuantity: stock.stockQuantity - data.quantitySold,
          },
          { new: true }
        );
      } catch (error) {
        res.status(500).json({error:"error while updating stock"});
      }
    }




    // Get today's sales
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let todaySales = await Sales.find({
      isDeleted: false,
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    // response = await SaleService.dailysale(data);

  
    console.log("today sales",todaySales);

    //sending the data for processing to the services 
    const dailySale=await SaleService.dailysale(todaySales);

    // console.log(`sshould return hi ${dailySale} `)

    



    // let allSale=await Sales.find({isDeleted:false})

    return res.status(201).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ messeg: "hi", error: "Internal Server Error" });
  }
};


// Controller to get a single product by ID
const getSingleSale = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "get sale");

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such sale is listed" });
    }

    const sale = await Sales.findById(id);
    console.log(sale, "sale ar");

    if (!sale) {
      return res.status(404).json({ error: "no such sales document" });
    }

    return res.status(200).json(sale);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ messege: "could not retrieve sale" });
  }
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
