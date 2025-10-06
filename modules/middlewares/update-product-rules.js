const { body } = require("express-validator");

const updateProductRules = [
  body("product_name")
    .optional()
    .isString().withMessage("Product name must be a string.")
    .isLength({ min: 3 }).withMessage("Product name must be at least 3 characters."),
  body("category")
    .optional()
    .isString().withMessage("Category must be a string."),
  body("price")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number."),
  body("description")
    .optional()
    .isString().withMessage("Description must be a string.")
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters.")
];

module.exports = updateProductRules;
