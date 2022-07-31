import { ArticleCategory } from "../../../models/index.js";
import {
  articleCategoryRepository,
  articleRepository,
} from "../../../repositories/mongodb/index.js";

async function createOne(req, res, next) {
  console.log("POST /article-category/ api");
  const { article_id, category_name, description } = req.body;
  if (!article_id || !category_name) {
    res.status(400).send("Invalid body");
  }
  try {
    const category = new ArticleCategory({
      article_id,
      category_name,
      description,
    });
    const createArticleCategory = await articleCategoryRepository.createOne(category);
    //NOTE: Use save when have full detail document
    const articleRelated = await articleRepository.getFullDetail(article_id);
    articleRelated.article_categories.push(category);
    await articleRepository.saveArticle(articleRelated);
    res.status(201).send(createArticleCategory);
    next();
  } catch (error) {
    console.log(
      "Location: controllers/articleCategory/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
