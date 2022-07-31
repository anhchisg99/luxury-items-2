import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getProductDetail(req, res, next) {
  console.log("GET /product/:id api");
  const { id } = req.params;
  try {
    const data = await productRepository.getOne(id);
    if(!data) {
      res.status(400).send({ message: "Not found this product"});
      return 
    }
    await productRepository.visitUp(id);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/getProductDetail.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getProductDetail;
