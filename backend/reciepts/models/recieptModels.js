const mongoose = require("mongoose");
const { Schema } = mongoose;

const recieptSchema = new Schema(
  {
    // Unique identifier for the receipt
    receiptNumber: {
      type: String,
      required: true,
    }, // A unique receipt number or code
    totalAmount: {
      type: Number,
      required: true,
    }, // Total amount of the purchase

    // Date and time of the receipt generation

    status: {
      type: Boolean,
      requred: true,
    }, // Status of the receipt (true for 'Generated', false for 'Pending' or 'Invalid')
    isActive: {
      type: Boolean,
      required: true,
    }, // Indicates if the receipt is currently active
    isDeleted: {
      type: Boolean,
      required: true,
    }, // A flag to indicate if the receipt is deleted
    soldProducts: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
          required: true,
        },
        salePrice: {
          type: Number,
          required: true,
        },
      },
    ],
    // Date and time when the receipt was marked as deleted (nullable)

    //Adds createdAt and updatedAt timestamps
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reciept", recieptSchema);
