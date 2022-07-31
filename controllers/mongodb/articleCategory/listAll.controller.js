import { articleCategoryRepository } from "../../../repositories/mongodb/index.js";

async function listAllCategory(req, res, next) {
  console.log("GET /article-category/ api");
  try {
    const data = await articleCategoryRepository.listAll();
    res.status(200).json({
      "category": data
    });
  } catch (error) {
    console.log(
      "Location: controllers/listAllCategory.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default listAllCategory;
