const mongoose = require('mongoose');
const Product = require('../models/product.model');

// Create and Save a new Product
exports.create = async (req, res) => {
  console.log("Create request received with body:", req.body);
  const product = new Product(req.body);
  try {
    const data = await product.save();
    console.log("Product created successfully:", data);
    res.status(201).send(data);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ message: error.message });
  }
};

// Retrieve all Products from the database
exports.findAll = async (req, res) => {
  console.log("FindAll request received");
  try {
    const data = await Product.find();
    console.log("Products retrieved successfully:", data);
    res.status(200).send(data);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send({ message: error.message });
  }
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  console.log(`FindOne request received for id: ${id}`);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: `Invalid product id: ${id}` });
  }
  try {
    const data = await Product.findById(id);
    if (!data) {
      console.log(`Product with id ${id} not found`);
      res.status(404).send({ message: `Product with id ${id} not found` });
    } else {
      console.log("Product retrieved successfully:", data);
      res.status(200).send(data);
    }
  } catch (error) {
    console.error("Error finding product:", error);
    res.status(500).send({ message: error.message });
  }
};
// Update a Product by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  console.log(`Update request received for id: ${id} with body:`, req.body);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: `Invalid product id: ${id}` });
  }
  try {
    const data = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
    if (!data) {
      console.log(`Product with id ${id} not found`);
      res.status(404).send({ message: `Product with id ${id} not found` });
    } else {
      console.log("Product updated successfully");
      res.status(200).send({ message: "Product was updated successfully" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(`Delete request received for id: ${id}`);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: `Invalid product id: ${id}` });
  }
  try {
    const data = await Product.findByIdAndDelete(id);
    if (!data) {
      console.log(`Product with id ${id} not found`);
      res.status(404).send({ message: `Product with id ${id} not found` });
    } else {
      console.log("Product deleted successfully");
      res.status(200).send({ message: "Product was deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: error.message });
  }
};

// Delete all Products from the database
exports.deleteAll = async (req, res) => {
  console.log("DeleteAll request received");
  try {
    const data = await Product.deleteMany();
    console.log("All products deleted successfully");
    res.status(200).send({ message: "All Products were deleted successfully" });
  } catch (error) {
    console.error("Error deleting all products:", error);
    res.status(500).send({ message: error.message });
  }
};