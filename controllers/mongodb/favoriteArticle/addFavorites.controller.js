import { FavoriteArticle } from "../../../models/index.js";
import { favoriteArticleRepository, articleRepository } from "../../../repositories/mongodb/index.js";

async function addFavorites(req, res, next) {
  console.log("POST /favoriteArticle/ api");

  const { userId } = req.user;
  const { article_id } = req.body;
  const article = await articleRepository.getDetail(article_id)
  if (!article) {
    res.status(400).send({ message: "Article is not existed" });
  }
  try {
    let favoriteList = await favoriteArticleRepository.findByUserId(userId);
    if (favoriteList) {
      // Check if article not exist in favorite list
      if (!favoriteList.articles.includes(article_id)) {
        favoriteList.articles.push(article_id);
        await favoriteArticleRepository.saveOne(favoriteList)
        return res.status(200).send({ message: 'Add Favorite Article Successfully'});
      }
      return res.status(401).send({ message: 'Article is already on list, please add another product'});
    }else{
      const new_favorite = new FavoriteArticle({
        reader: userId,
        articles: [article_id],
      });
      await favoriteArticleRepository.createOne(new_favorite)
      res.status(200).send({ message: 'Add Favorite Article Successfully'});
    }
    console.log(favoriteList);
  } catch (error) {
    console.log(
      "Location: controllers/favoriteArticle/addFavorite.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default addFavorites;
