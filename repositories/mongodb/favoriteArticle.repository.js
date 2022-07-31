import { FavoriteArticle } from "../../models/index.js";

export async function createOne(favoriteArticle) {
  try {
    return FavoriteArticle.create(favoriteArticle);
  } catch (error) {
    console.log(
      "Location: repositories/favoriteArticle.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function saveOne(favoriteArticle) {
  try {
    return favoriteArticle.save();
  } catch (error) {
    console.log(
      "Location: repositories/favoriteArticle.repository.js -> saveOne: ",
      error.message
    );
  }
}

export async function findByUserId(userId) {
  try {
    return FavoriteArticle.findOne({ reader: userId });
  } catch (error) {
    console.log(
      "Location: repositories/favoriteArticle.repository.js -> findByUserId: ",
      error.message
    );
  }
}

export async function getFavoriteList(readerId) {
  try {
    return FavoriteArticle.find({ reader: readerId })
      .populate("reader", "display_name")
      .populate({
        path: "articles",
        populate: {
          path: "article_categories",
          select: "category_name",
        },
        select:
          "article_header_url title title_en brief brief_en author_name created_at en_version",
      })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/favoriteArticle.repository.js -> getFavoriteList: ",
      error.message
    );
  }
}

export async function updateList(list_id, article_id) {
  try {
    return FavoriteArticle.updateOne(
      { reader: list_id },
      {
        $pullAll: {
          articles: [article_id],
        },
      }
    );
  } catch (error) {
    console.log(
      "Location: repositories/favoriteArticle.repository.js -> updateList: ",
      error.message
    );
  }
}
