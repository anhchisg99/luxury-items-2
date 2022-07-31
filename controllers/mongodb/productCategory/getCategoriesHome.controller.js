import { productCategoryRepository } from "../../../repositories/mongodb/index.js";

async function getCategoriesHome(req, res, next) {
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 6;
    const data = await productCategoryRepository.getCategoriesHome(limitRecord);
    res.status(200).send(data)
  } catch (error) {
    res.status(400).json(error.message);
  }
}
export default getCategoriesHome;
