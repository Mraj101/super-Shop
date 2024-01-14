const mongoose = require("mongoose");

const DailySaleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    data: [
      {
        product_Id: {
          type: String,
        },
        productName: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const DailySale = mongoose.model("DailySaleModels", DailySaleSchema);

module.exports = DailySale;
