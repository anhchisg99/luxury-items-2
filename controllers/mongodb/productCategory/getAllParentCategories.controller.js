import { productCategoryRepository } from "../../../repositories/mongodb/index.js";

async function getAllParentCategories(req, res, next) {
  try {
    const data = await productCategoryRepository.getRootCategories();
    res.status(200).send(data)
  } catch (error) {
    res.status(400).json(error.message);
  }
}
export default getAllParentCategories;
