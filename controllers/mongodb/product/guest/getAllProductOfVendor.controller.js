import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getAllProductOfVendor(req, res, next) {
  console.log(`GET /product/all-product-vendor/:id`);
  const { id } = req.params;
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 4;
    const data = await productRepository.getAllProduct(id, limitRecord);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/getAllProductOfVendor.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getAllProductOfVendor;
