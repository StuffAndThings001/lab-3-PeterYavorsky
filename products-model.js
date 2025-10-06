const { readFile, writeToFile } = require("./shared/file-utils");

const filePath = "./data/products.json";
const toNum = (v) => Number(v);

async function getAllProducts() {
  return readFile(filePath);
}

async function getProductByID(productID) {
  if (productID === undefined || productID === null) {
    throw new Error(`Cannot use ${productID} to get product`);
  }
  const all = await getAllProducts();
  return all.find(p => toNum(p.id) === toNum(productID));
}

async function addNewProduct(newProduct) {
  if (!newProduct) throw new Error(`Cannot use ${newProduct} to add product`);
  const all = await getAllProducts();
  const nextId = all.length ? Math.max(...all.map(p => toNum(p.id) || 0)) + 1 : 1;
  const created = { id: nextId, ...newProduct };
  all.push(created);
  await writeToFile(filePath, all);
  return created;
}

async function updateExistingProduct(productID, newProduct) {
  if (!productID || !newProduct) {
    throw new Error(`Cannot use ${productID} & ${newProduct} to update product`);
  }
  const all = await getAllProducts();
  const idNum = toNum(productID);
  const index = all.findIndex(p => toNum(p.id) === idNum);
  if (index < 0) throw new Error(`Product with ${productID} doesn't exist`);
  const updated = { ...all[index], ...newProduct, id: idNum };
  all[index] = updated;
  await writeToFile(filePath, all);
  return updated;
}

async function deleteProduct(productID) {
  if (!productID) throw new Error(`Cannot use ${productID} to delete product`);
  const all = await getAllProducts();
  const idNum = toNum(productID);
  const index = all.findIndex(p => toNum(p.id) === idNum);
  if (index < 0) {
    const err = new Error(`Product with ${productID} doesn't exist`);
    err.cause = { status: 404 };
    throw err;
  }
  const [deleted] = all.splice(index, 1);
  await writeToFile(filePath, all);
  return deleted;
}

module.exports = {
  getAllProducts,
  getProductByID,
  addNewProduct,
  updateExistingProduct,
  deleteProduct,
};
