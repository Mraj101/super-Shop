const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    product_Id: {
      type: String,
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
    }, // Cost of the product
    soldPrice:{
      type:String,
      required:true,
    },

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

module.exports = mongoose.model("Sale", saleSchema);
