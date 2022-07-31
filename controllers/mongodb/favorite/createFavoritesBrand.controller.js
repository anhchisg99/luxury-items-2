import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function createFavoritesBrand(req, res, next) {
  console.log("GET /favorite/ api");
  const { userId } = req.user;
  const { brand_id } = req.query;
  try {
     await favoriteRepository.createFavoritesBrand(userId, brand_id);
    res.status(200).send({ message: "Add Favorite Brand Successfully" });
  } catch (error) {
    console.log(
      "Location: controllers/favorite/createFavoritesBrand.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createFavoritesBrand;
