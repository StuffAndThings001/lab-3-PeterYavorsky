# Lab 2

> Weightage: 2.5  
> Deadline: 11:59 PM tonight (Oct 2).  
> _Submissions after the deadline will receive only **75%** of the points earned._

---

### Overview:

In this lab activity, you will work on:

- Creating modular Express routes for product-related endpoints.
- Implementing input validation using `express-validator`.
- Handling CRUD operations using functions defined in `products-model.js`.
- Adding application-level middlewares for parsing request bodies and error handling.
- Returning proper HTTP responses with correct status codes.

---

### File Instructions

You will work on **4 main files**:

1. `modules/products/products-routes.js`
2. `modules/products/middlewares/create-product-rules.js`
3. `modules/products/middlewares/update-product-rules.js`
4. `server.js`

> ###### Note:
>
> All product-related operations must use the functions defined in **`products-model.js`**. **Do not write your own implementation of these functions.** You can use these functions in your routes to:
>
> - Fetch all products (`getAllProducts()`)
> - Fetch a product by ID (`getProductByID()`)
> - Add a new product (`addNewProduct()`)
> - Update an existing product (`updateExistingProduct()`)
> - Delete a product (`deleteProduct()`)

---

#### 1. `modules/products/products-routes.js`

- **Step 1: Create an Express Router instance**

  - Router is used to define modular, mountable route handlers.
  - All product-related routes will be defined on this router.

- **Step 2: GET /products**

  - Fetch all products using the `getAllProducts()` function defined in `products-model.js`.
  - If no products exist, send response with an empty array.
  - Send response with the products in JSON format.

- **Step 3: GET /products/:id**

  - Fetch a single product by its ID using `getProductByID()` from `products-model.js`.
  - If product not found, send response with 404 error message.
  - If found, send response with the product in JSON format.

- **Step 4: POST /products**

  - Apply validation middleware (`createProductRules`) before handling request.
  - Use `validationResult()` to check for any validation errors.
  - If validation fails, send response with 400 and error details.
  - If validation passes, call `addNewProduct()` from `products-model.js` to save the product.
  - Send response with the newly added product in JSON format.
  - Handle potential server errors with a 500 response.

- **Step 5: PUT /products/:id**

  - Apply validation middleware (`updateProductRules`) before handling request.
  - Use `validationResult()` to check for any validation errors.
  - If validation fails, send response with 400 and error details.
  - Fetch the product by ID using `getProductByID()` from `products-model.js` to ensure it exists.
  - If product not found, send response with 404 error message.
  - If found, call `updateExistingProduct()` from `products-model.js` to update the product.
  - Send response with the updated product in JSON format.
  - Handle potential server errors with a 500 response.

- **Step 6: DELETE /products/:id**

  - Fetch the product by ID using `getProductByID()` from `products-model.js` to ensure it exists.
  - If product not found, send response with 404 error message.
  - If found, call `deleteProduct()` from `products-model.js` to remove the product.
  - Send response with the deleted product in JSON format.
  - Handle potential server errors with a 500 response.

---

#### 2. `modules/products/middlewares/create-product-rules.js`

- **Step 1: Define validation rules for creating a product**

  - `product_name`: required, string, min length 6
  - `category`: required, string
  - `price`: required, positive number
  - `description`: optional, string, max length 500

- **Step 2: Combine rules into an array**

  - This array will be used as middleware in the POST `/products` route

---

#### 3. `modules/products/middlewares/update-product-rules.js`

- **Step 1: Define validation rules for updating a product**

  - `product_name`: optional, string, min length 3
  - `category`: optional, string
  - `price`: optional, positive number
  - `description`: optional, string, max length 500

  - **Note:** Fields are optional because an update request may only include some fields.

- **Step 2: Combine rules into an array**

  - This array will be used as middleware in the PUT `/products/:id` route

---

#### 4. `server.js`

- **Step 1: Add built-in middlewares to parse request body at the application level**

- **Step 2: Mount all the routes**

  - Attach Products Route so that all product-related endpoints are handled.

- **Step 3: Add error-handling middleware at the application level**

  - Logs the error for debugging.
  - Returns a generic 500 response to the client.

---

#### Additional Notes

- Ensure proper HTTP status codes are returned:
  - 200 for success
  - 400 for validation errors
  - 404 for resource not found
  - 500 for server errors

---
