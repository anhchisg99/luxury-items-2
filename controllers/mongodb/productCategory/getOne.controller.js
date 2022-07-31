import { productCategoryRepository } from "../../../repositories/mongodb/index.js";
async function getOne(req, res, next) {
  console.log(`GET /product-category/:id api`);
  const productCategoryId = req.params.id;
  try {
    const productCategoryData = await productCategoryRepository.getOne(
      productCategoryId
    );
    res.send(productCategoryData);
  } catch (error) {
    console.log(
      "Location: controllers/productCategory/getOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOne;
