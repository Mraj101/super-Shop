const mongoose = require("mongoose");
const  Schema  = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    }, // Name of the product

    description: {
      type: String,
        required: true,
    }, // Detailed description of the product

    price: {
      type: Number,
        required: true,
    }, // Cost of the product

    status: {
      type: Boolean,
        required: true,
    }, // Status of the product (true for 'Available', false for 'Discontinued')

    isActive: {
      type: Boolean,
      default: true,
    }, // Indicates if the product is currently active

    isDeleted: {
      type: Boolean,
      default: false,
    }, // A flag to indicate if the product is deleted

    deleteDate: {
      type: Date,
      default: null,
    },
    // Date and time when the product was marked as deleted (nullable)
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Product", productSchema);
