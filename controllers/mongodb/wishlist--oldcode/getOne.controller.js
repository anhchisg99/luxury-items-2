import { wishlistRepository } from "../../../repositories/mongodb/index.js";

async function getOne(req, res, next) {
  console.log("GET /wishlist/ api");
  try {
    const data = await wishlistRepository.getFavoriteList();
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/wishlist/getOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOne;
