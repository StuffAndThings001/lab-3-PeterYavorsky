const { body } = require("express-validator");

const createProductRules = [
  body("product_name")
    .exists({ checkFalsy: true }).withMessage("Product name is required.")
    .isString().withMessage("Product name must be a string.")
    .isLength({ min: 6 }).withMessage("Product name must be at least 6 characters long."),
  body("category")
    .exists({ checkFalsy: true }).withMessage("Category is required.")
    .isString().withMessage("Category must be a string."),
  body("price")
    .exists({ checkFalsy: true }).withMessage("Price is required.")
    .isFloat({ gt: 0 }).withMessage("Price must be a positive number."),
  body("description")
    .optional()
    .isString().withMessage("Description must be a string.")
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters.")
];

module.exports = createProductRules;
