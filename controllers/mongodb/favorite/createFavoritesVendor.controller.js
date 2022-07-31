import { favoriteRepository } from "../../../repositories/mongodb/index.js";
async function createFavoritesVendor(req, res, next) {
  console.log("GET /favorite/ api");
  const {userId} = req.user.userId
  const {vendor_id} = req.query
  try {
    const fav = await favoriteRepository.createFavoritesVendor(userId,vendor_id);
    res.status(200).send({ message: "Add Favorite Vendor Successfully" });
  } catch (error) {
    console.log(
      "Location: controllers/favorite/createFavoritesVendor.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createFavoritesVendor;
