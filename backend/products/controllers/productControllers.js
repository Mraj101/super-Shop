const mongoose = require("mongoose");
const Products = require("../models/productModels"); // Adjust the path based on your project structure

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    let data = await Products.create(req.body);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Controller to get a single product by ID
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such product is listed" });
  }
  const product = await Products.findById(id);

  if (!product) res.status(404).json({ error: "no such product" });

  res.status(200).json(product);
};


// Controller to delete a product by ID
const deleteProductById=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({error:"no such id is found"});
        const product = await Products.findOneAndDelete({_id:id});

        if (!product) res.status(404).json({ error: "no such product" });

        return res.status(201).json(product)
}


const updateProduct = async (req, res) => {
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
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProductById,
  updateProduct,
};
