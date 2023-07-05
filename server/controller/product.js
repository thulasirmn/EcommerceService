import Product from "../models/Product.js";

// Create a new product
export const createProduct = async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a specific product by ID
export const getProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    // const products = await Product.find().populate('owner', '-firstname -email').lean(false);
    const product = await Product.findById(_id).populate('owner').populate('reviews').lean(false);
    if (!product) {
      return res.status(404).send();
    }
    
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  // const allowedUpdates = ["productName", "description", "price", "productImage","catagory","quantity"];
  // const isValidUpdate = updates.every((update) =>
  //   allowedUpdates.includes(update)
  // );
  // if (!isValidUpdate) {
  //   return res.status(400).send({ error: "Invalid updates!" });
  // }
  const _id = req.params.id;
  try {
    const product = await Product.findOne({ _id, owner: req.user._id });
    if (!product) {
      return res.status(404).send();
    }
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOneAndDelete({ _id, owner: req.user._id });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};
