const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deleteDate: {
      type: Date,
      default: null,
    },
    stock:{
      type:String,
      default:0,
    },
    imageUrl: {
      type: String, // Add this field for the image URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
