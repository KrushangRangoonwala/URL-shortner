const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      require: true,
    },
    shortURL: {
      type: String,
      require: true,
    },
    watchCount : {
        type : Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const url = mongoose.model("url", urlSchema);

module.exports = url;