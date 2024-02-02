const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  id: { type: Number, unique: true, required: true},
  title: { type: String, required: true },
  author: { type: String, required: true},
  genre: { type:  String, required: true},
  price: {type: Number, required: true},
});

BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);
