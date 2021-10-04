const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    productID: {
      type: String,
      required: true,
    },
  },
  { collection: "Comment" }
);

module.exports = mongoose.model("Comment", CommentSchema);
