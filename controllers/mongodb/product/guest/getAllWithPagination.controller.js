import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getAllWithPagination(req, res, next) {
  console.log(`GET /product${req.url} api`);
  const { page = 0, limit = 0 } = req.query;

  try {
    const data = await productRepository.getAllWithPagination(page, limit);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/getAllWithPagination.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getAllWithPagination;
