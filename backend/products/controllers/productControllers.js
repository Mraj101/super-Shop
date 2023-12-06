const Product=require('../models/productModels') // Adjust the path based on your project structure


const getAllProducts=async(req,res)=>{
    try{
        const products=await Product.find({isDeleted:false});
        res.status(200).json(products)
    }catch(err){
        res.status(500).json({error:'internal Server Error'})
    }
};



// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get a single product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a product by ID
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a product by ID
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndUpdate(
      productId,
      { isDeleted: true, deleteDate: new Date() },
      { new: true }
    );
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
