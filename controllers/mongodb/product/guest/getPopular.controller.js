import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getPopular(req, res, next) {
  console.log("GET /product/popular api");
  try {
    const { limit, vendorId } = req.query;
    const limitRecord = parseInt(limit, 10) || 5;
    let data;
    if (!vendorId) {
      data = await productRepository.getAllPopularProduct(limitRecord);
      res.status(200).send(data);
      return
    }
    data = await productRepository.getPopularProductOfVendor(vendorId, limitRecord);
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
