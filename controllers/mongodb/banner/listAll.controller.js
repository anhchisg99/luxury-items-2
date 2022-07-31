import { bannerRepository } from "../../../repositories/mongodb/index.js";
async function listAll(req, res, next) {
  console.log("GET /banner/ api");
  try {
    const banners = await bannerRepository.listAll();
    res.status(200).send(banners);
  } catch (error) {
    console.log(
      "Location: controllers/banner/listAll.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default listAll;
