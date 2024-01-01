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
    imageUrl: {
      type: String, // Add this field for the image URL
    },
    stockId: {
      type: String,
    },
    // quantity: {
    //   type: Number,
    //   required: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
