import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function createFavoritesProduct(req, res, next) {
  console.log("GET /favorite/ api");
  const { userId } = req.user;
  const { product_id } = req.query;
  try {
     await favoriteRepository.createFavoritesProduct(
      userId,
      product_id
    );
    res.status(200).send({ message: "Add Favorite Product Successfully" });
  } catch (error) {
    console.log(
      "Location: controllers/favorite/createFavoritesProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createFavoritesProduct;
