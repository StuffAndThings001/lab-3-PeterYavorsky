const express = require("express");
const productsRoutes = require("./modules/products-routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productsRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
