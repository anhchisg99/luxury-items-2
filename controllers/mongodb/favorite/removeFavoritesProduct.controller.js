import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function removeFavoritesProduct(req, res, next) {
  console.log("POST /favorite/del-favorite-product/ api");
  const {userId} = req.user
  const {product_id} = req.query
  try {
    await favoriteRepository.removeFavoritesProduct(userId,product_id);
    res.status(200).send({ message: 'Remove favorite product successfully'});
  } catch (error) {
    console.log(
      "Location: controllers/favorite/removeFavoritesProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default removeFavoritesProduct;
