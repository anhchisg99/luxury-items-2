import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function removeFavoritesBrand(req, res, next) {
  console.log("POST /favorite/del-favorite-brand/ api");
  const {userId} = req.user
  const {brand_id} = req.query
  try {
    await favoriteRepository.removeFavoritesBrand(userId,brand_id);
    res.status(200).send({ message: 'Remove favorite brand successfully'});
  } catch (error) {
    console.log(
      "Location: controllers/favorite/removeFavoriteBrand.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default removeFavoritesBrand;
