const express = require("express");
const { validationResult } = require("express-validator");

const {
  getAllProducts,
  getProductByID,
  addNewProduct,
  updateExistingProduct,
  deleteProduct,
} = require("../products-model");

const createProductRules = require("./middlewares/create-product-rules");
const updateProductRules = require("./middlewares/update-product-rules");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductByID(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

router.post("/", createProductRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const created = await addNewProduct(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
});


router.put("/:id", updateProductRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = Number(req.params.id);
    const existing = await getProductByID(id);
    if (!existing) return res.status(404).json({ message: "Product not found" });

    const updated = await updateExistingProduct(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existing = await getProductByID(id);
    if (!existing) return res.status(404).json({ message: "Product not found" });

    const deleted = await deleteProduct(id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

module.exports = router;
