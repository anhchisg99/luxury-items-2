import { wishlistRepository } from "../../../repositories/mongodb/index.js";

async function deleteItem(req, res, next) {
  console.log("DELETE /wishlist/remove api");

  const { userId } = req.user;
  const { product_id } = req.body;
  try {
    let favoriteList = await wishlistRepository.findByUserId(userId);
    if (favoriteList.products.includes(product_id)) {
      favoriteList.products = favoriteList.products.filter(
        (item) => item.toString() !== product_id.toString()
      );
      await wishlistRepository.updateList(userId, product_id);
      return res.status(200).send('Remove product from favorite successfully ');
    } else {
      return res.status(404).send('No found in favorite list')
    }
  } catch (error) {
    console.log(
      "Location: controllers/brand/deleteItem.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default deleteItem;
