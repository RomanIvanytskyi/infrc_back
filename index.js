const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ProductsDB");
const PORT = process.env.PORT || 5000;
const productRouter = require("./productRouter");

const app = express();
app.use(express.json());
app.use("/product", productRouter);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
