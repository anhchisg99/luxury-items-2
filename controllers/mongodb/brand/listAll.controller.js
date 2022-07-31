import { brandRepository } from "../../../repositories/mongodb/index.js";
async function listAll(req, res, next) {
  console.log("GET /brand/ api");
  try {
    const brands = await brandRepository.listAll();
    res.send(brands);
  } catch (error) {
    console.log(
      "Location: controllers/brand/listAll.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default listAll;
