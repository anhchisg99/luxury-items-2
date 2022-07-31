import { articleCategoryRepository } from "../../../repositories/mongodb/index.js";

async function getArticleCategory(req, res, next) {
  console.log("GET /article/:id/category api");

  const { id } = req.params;
  try {
    const data = await articleCategoryRepository.getCategory(id);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/article/getArticleCategory.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getArticleCategory;
