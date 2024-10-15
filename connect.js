const mongoose = require("mongoose");

function connectDB(url) {
  mongoose
    .connect(url)
    .then(console.log("mongoose connected for shourtURL"))
    .catch((err) => console.log(err));
}

module.exports = {
    connectDB,
}