import { Wishlist } from "../../../models/index.js";
import { wishlistRepository, productRepository } from "../../../repositories/mongodb/index.js";
async function addFavorites(req, res, next) {
  console.log("POST /wishlist/ api");

  const { userId } = req.user;
  const { product_id } = req.body;
  const product = await productRepository.getOne(product_id)
  if (!product) {
    res.status(400).send("Product is not existed");
  }
  try {
    let favoriteList = await wishlistRepository.findByUserId(userId);
    if (favoriteList) {
      // Check if product not exist in favorite list
      if (!favoriteList.products.includes(product_id)) {
        favoriteList.products.push(product_id);
        await wishlistRepository.saveOne(favoriteList)
        return res.status(200).send('Add Favorite Product Successfully');
      }
      return res.status(401).send('Product is already on list, pls add another product');
    }else{
      const new_favorite = new Wishlist({
        buyer: userId,
        products: [product_id],
      });
      await wishlistRepository.createOne(new_favorite)
      res.status(200).send('Add Favorite Product Successfully');
    }
  } catch (error) {
    console.log(
      "Location: controllers/wishlist/addOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default addFavorites;
