import { favoriteArticleRepository } from "../../../repositories/mongodb/index.js";

async function removeFavorite(req, res, next) {
  console.log("DELETE /favoriteArticle/remove api");

  const { userId } = req.user;
  const { article_id } = req.body;
  try {
    let favoriteList = await favoriteArticleRepository.findByUserId(userId);
    //check if article is on list
    if (favoriteList.articles.includes(article_id)) {
      favoriteList.articles = favoriteList.articles.filter(
        (item) => item.toString() !== article_id.toString()
      );
      await favoriteArticleRepository.updateList(userId, article_id);
      res.status(200).send({ message: 'Remove article successfully'});
      return;
    }
    res.status(404).send({ message: 'No found in favorite list'})
  } catch (error) {
    console.log(
      "Location: controllers/favoriteArticle/removeFavorite.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default removeFavorite;
