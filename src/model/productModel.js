const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_code: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: Number,
      require:true,
      default: 0,
      trim:true
    },

  },{ timestamps: true,versionKey: false }
  
);

module.exports = mongoose.model("product", productSchema);
