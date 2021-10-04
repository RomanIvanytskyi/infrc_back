const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ProductsDB");
const Product = require("./models/products");
const Comment = require("./models/Comment");

let Calendar = Date();

class ProductController {
  async newComment(req, res) {
    try {
      const comment = new Comment({
        comment: req.body.comment,
        date: Calendar,
        productID: req.body.productID,
      });
      await comment.save();
      res.send(comment);
      return;
    } catch (e) {
      return res.send({ err: e });
    }
  }

  async getComments(req, res) {
    try {
      await Comment.find({ productID: req.body.productID }, (err, found) => {
        res.json(found);
        return;
      });
    } catch (e) {
      return res.send({ err: e });
    }
  }

  async deleteComment(req, res) {
    try {
      console.log(req.body.id);
      await Comment.deleteOne({ _id: req.body.id }, (err, found) => {
        return res.send("deleted " + req.body.id);
      });
    } catch (e) {
      return res.send({ err: e });
    }
  }

  async deleteComments(req, res) {
    try {
      await Comment.deleteMany(
        { productID: req.body.productID },
        (err, found) => {
          return res.json(found);
        }
      );
    } catch (e) {
      return res.send({ err: e });
    }
  }

  async getProducts(req, res) {
    try {
      Product.find({}, (err, found) => {
        res.json(found);
        return;
      });
    } catch (e) {
      return res.send({ err: e });
    }
  }
  async getProduct(req, res) {
    await Product.findById(req.body.id, (err, found) => {
      if (err) {
        return;
      }
      return res.send(found);
    });
  }

  async newProduct(req, res) {
    try {
      const product = new Product({
        image: req.body.image,
        name: req.body.name,
        count: req.body.count,
        width: req.body.width,
        height: req.body.height,
        weight: req.body.weight,
      });
      await product.save();
      console.log(product);
      return res.send(product);
    } catch (e) {
      return res.send({ err: e });
    }
  }
  async deleteProduct(req, res) {
    try {
      await Product.deleteOne({ _id: req.body.id });
      return res.send("deleted " + req.body.id);
    } catch (e) {
      return res.send({ err: e });
    }
  }

  async editProduct(req, res) {
    await Product.findOneAndUpdate(
      { _id: req.body.id },
      {
        image: req.body.image,
        name: req.body.name,
        count: req.body.count,
        width: req.body.width,
        height: req.body.height,
        weight: req.body.weight,
      },
      {
        upsert: true,
      }
    )
      .then(() => {
        return res.status(201).json({
          message: "Updated successfully!",
        });
      })
      .catch((error) => {
        return res.send({ err: e });
      });
  }
}

module.exports = new ProductController();
