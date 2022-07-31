import { ArticleCategory } from "../../models/index.js";

export async function createOne(articleCategoryData) {
  try {
    return articleCategoryData.save();
  } catch (error) {
    console.log(
      "Location: repositories/articleCategory.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function listAll() {
  try {
    return ArticleCategory.find().distinct("category_name");
  } catch (error) {
    console.log(
      "Location: repositories/articleCategory.repository.js -> listAll: ",
      error.message
    );
  }
}

export async function getCategory(articleId) {
  try {
    return ArticleCategory.find({ article_id: articleId }).select(
      "_id category_name"
    );
  } catch (error) {
    console.log(
      "Location: repositories/articleCategory.repository.js -> getCategory: ",
      error.message
    );
  }
}

export async function findArticleSameCategory(category_name) {
  try {
    return ArticleCategory.find({
      category_name: { $regex: category_name, $options: "i" },
    }).populate("article_id","_id article_header_url title title_en brief brief_en author_name")
    .select("article_id");
  } catch (error) {
    console.log(
      "Location: repositories/articleCategory.repository.js -> getCategory: ",
      error.message
    );
  }
}

