const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    _id: Schema.Types.ObjectId, // Unique identifier for the product
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

    createDate: {
      type: Date,
      default: Date.now,
    }, // Date and time when the product was added to the database

    deleteDate: {
      type: Date,
      default: null,
    },
    // Date and time when the product was marked as deleted (nullable)
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model('Product', productSchema);
