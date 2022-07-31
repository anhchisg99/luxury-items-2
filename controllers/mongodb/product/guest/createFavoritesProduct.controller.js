import { favoriteRepository } from "../../../../repositories/mongodb/index.js";

async function getAllProductOfVendor(req, res, next) {
  console.log(`GET /product/favorite-product`);
  const { userId,product_id } = req.params;
  try {
    const data = await favoriteRepository.createFavoritesProduct(userId, product_id);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/favoriteProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getAllProductOfVendor;
