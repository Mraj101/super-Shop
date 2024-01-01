const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    // productId: {
    //   type: mongoose.Types.ObjectId,
    //   ref:"Product",
    //   required: true,
    // },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    }, // Cost of the product

    status: {
      type: Boolean,
      default: true,
    }, // Status of the product (true for 'Available', false for 'Discontinued')

    isActive: {
      type: Boolean,
      default: true,
    }, // Indicates if the product is currently active

    isDeleted: {
      type: Boolean,
      default: false,
    }, // A flag to indicate if the product is deleted
    // Date and time when the product was marked as deleted (nullable)
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Stock", stockSchema);
