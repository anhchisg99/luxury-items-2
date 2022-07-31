import { productRepository } from "../../../../repositories/mongodb/index.js";

async function sponsoredProduct(req, res, next) {
  console.log(`GET /product/sponsored-product`);
  const {id} = req.params
  try {
    const data = await productRepository.sponsoredProduct(id);
    res.send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/sponsoredProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default sponsoredProduct;
