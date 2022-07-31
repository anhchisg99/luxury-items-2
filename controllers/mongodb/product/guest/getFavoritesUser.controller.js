import { productRepository } from "../../../../repositories/mongodb/index.js";

async function getFavoritesUser(req, res, next) {
  console.log(`GET /product/all-product-vendor`);
  const  {userId}  = req.user;
  const {product_id} = req.query
  try {
    const data = await productRepository.getFavoritesUser(userId);
    const fav_user = data.favorite.product
    const found = fav_user.find(element => element ==product_id);
    if(found !=undefined){
    res.status(200).send('success');
    }else{
    res.status(400).send('fail');
    }
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/favoriteProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getFavoritesUser;
