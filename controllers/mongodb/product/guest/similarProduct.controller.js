import { productRepository } from "../../../../repositories/mongodb/index.js";

async function similarProduct(req, res, next) {
  console.log(`GET /product/similar-product/:id`);
  const { id } = req.params
  try {
    const data = await productRepository.similarProduct(id);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/similarProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default similarProduct;
