const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Brand = new Schema({
    title: {
        type: String,
        required: true
    },
    brandImage: {
        type: String,
        default: "",
      },
});
module.exports = mongoose.model("Brand", Brand);