const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
  {
    // product_Id: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    // },
    stockQuantity: {
      type: Number,
      default: 0,
    }, // Cost of the product

    status: {
      type: Boolean,
      // required: true,
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
