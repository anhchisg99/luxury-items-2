import { districtRepository } from "../../../../repositories/mongodb/index.js";

async function listAllOfSpecificProvince(req, res, next) {
  const { provinceCode } = req.query;
  console.log(`GET /district${req.url} api`);
  try {
    const data = await districtRepository.listAllOfSpecificProvince(
      provinceCode
    );
    res.send(data);
  } catch (error) {
    console.log(
      "Location: controllers/location/district/listAllOfSpecificProvince.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default listAllOfSpecificProvince;
