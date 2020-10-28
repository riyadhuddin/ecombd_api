const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productPrice:{
      type: Number,
      default: 0,
  },
  productImage: {
    type: String,
    default: "",
  },
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category' 
}],
brand: [{
    type: Schema.Types.ObjectId,
    ref: 'Brand' 
}],
  like: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", Product);