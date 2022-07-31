import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getHotPicks(req, res, next) {
  console.log("GET /product/hot-picks api");
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 5;
    const data = await productRepository.getHotPickProducts(limitRecord);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/getHotPicks.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getHotPicks;
