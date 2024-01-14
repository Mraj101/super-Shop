const mongoose = require("mongoose");
const DailySale = require("../models/DailySale");

const getDailySale = async (req, res) => {
  try {
    

  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

// Controller to create a new product
// const createDailySale = async (req, res) => {
//   try {
//     let date=req.body
//     console.log("ji hello")

//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Internal Server Error and daily sale not found" });
//   }
// };

// Controller to get a single product by ID
const single = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in getSingleProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a product by ID
const deleteDailysale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: "no such id is found" });
  const product = await Products.findOneAndDelete({ _id: id });

  if (!product) res.status(404).json({ error: "no such product" });

  return res.status(201).json(product);
};

const updateDailysale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout or id" });
  }
  const product = await Products.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product)
    return res.status(404).json({ error: "no such product exists" });

  res.status(201).json(product);
};

// Controller to update a product by ID

module.exports = {
  getDailySale
  // createDailySale,
  // single,
  // deleteDailysale,
  // updateDailysale,
};
