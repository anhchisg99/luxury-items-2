import { brandRepository } from "../../../repositories/mongodb/index.js";
async function getOne(req, res, next) {
  console.log(`GET /brand${req.url} api`);
  const brandId = req.params.id;
  try {
    const brandData = await brandRepository.getOne(brandId);

    res.send(brandData);
  } catch (error) {
    console.log(
      "Location: controllers/brand/getOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOne;
