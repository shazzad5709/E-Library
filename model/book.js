const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  id: { type: Number },
  title: { type: String, required: true },
  author: { type: String},
  summary: { type: String, required: true },
  genre: { type:  String},
  price: {type: Number}
});

BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);
