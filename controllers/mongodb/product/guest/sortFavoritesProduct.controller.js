import { productRepository } from "../../../../repositories/mongodb/index.js";

async function sortFavoritesProduct(req, res, next) {
  console.log(`GET /product/favorite-product`);
  
  try {
    const data = await productRepository.sortFavoritesProduct();
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/sortFavoritesProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default sortFavoritesProduct;
