const mongoose = require("mongoose");
const Reciepts = require("../models/recieptModels"); // Adjust the path based on your project structure

const getAllReciepts = async (req, res) => {
  try {
    const reciepts = await Reciepts.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(reciepts);
  } catch (err) {
    res.status(500).json({ error: "internal Server Error" });
  }
};

// Controller to create a new product
const createReciepts = async (req, res) => {
  try {
    let data = await Reciepts.create(req.body);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error while creating" });
  }
};



// Controller to get a single product by ID
const getSingleReciept = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "no such product is listed" });
  }
  try {
    const reciept = await Reciepts.findById(id);
    if (!reciept) res.status(404).json({ error: "no such product" });
    res.status(200).json(reciept);
  } catch (error) {
    res.status(404).json({ error: error.msg });
  }


};


// Controller to delete a product by ID
const deleteRecieptById=async(req,res)=>{
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
        res.status(404).json({error:"no such id is found"});
        const reciept = await Reciepts.findOneAndDelete({_id:id});

        if (!reciept) res.status(404).json({ error: "no such reciepts" });

        return res.status(201).json(reciept)
}


const updateReciept = async (req, res) => {
    const { id } = req.params;

 
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such recipts or id" });
    }
    const reciept = await Reciepts.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!reciept)
      return res.status(404).json({ error: "no such reciept exists" });
  
    res.status(201).json(reciept);
  };

// Controller to update a product by ID


module.exports = {
  getAllReciepts,
  createReciepts,
  getSingleReciept,
  deleteRecieptById,
  updateReciept,
};
