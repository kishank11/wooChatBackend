const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/woochat")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e);
  });
