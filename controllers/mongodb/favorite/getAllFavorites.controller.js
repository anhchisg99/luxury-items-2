import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function getAllFavorites(req, res, next) {
  console.log("GET /favorite/ api");
  const {userId} = req.user
  try {
    const favorites = await favoriteRepository.getAllFavorite(userId);
    res.status(200).send(favorites)
  } catch (error) {
    console.log(
      "Location: controllers/favorite/getAllFavorite.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getAllFavorites;
