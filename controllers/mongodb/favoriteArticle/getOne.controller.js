import { favoriteArticleRepository } from "../../../repositories/mongodb/index.js";

async function getOne(req, res, next) {
  console.log("GET /favoriteArticle/ api");
  const { userId } = req.user;

  try {
    const data = await favoriteArticleRepository.getFavoriteList(userId);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/favoriteArticle/getOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOne;
