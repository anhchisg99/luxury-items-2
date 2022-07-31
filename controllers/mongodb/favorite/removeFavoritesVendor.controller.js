import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function removeFavoritesVendor(req, res, next) {
  console.log("POST /favorite/del-favorite-vendor/ api");
  const {userId} = req.user.userId
  const {vendor_id} = req.query
  try {
    await favoriteRepository.removeFavoriteVendor(userId,vendor_id);
    res.status(200).send({ message: 'Remove favorite vendor successfully'});
  } catch (error) {
    console.log(
      "Location: controllers/favorite/removeFavoritesVendor.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default removeFavoritesVendor;
