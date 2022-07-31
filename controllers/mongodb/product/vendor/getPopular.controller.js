import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getPopular(req, res, next) {
  console.log("GET /product/popular api");
  const { id } = req.params;
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 5;
    const data = await productRepository.popularProduct(id, limitRecord);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/getPopular.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getPopular;
