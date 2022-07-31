import { provinceRepository } from "../../../../repositories/mongodb/index.js";

async function listAll(req, res, next) {
  console.log("GET /province/ api");

  try {
    const data = await provinceRepository.listAll();
    res.send(data);
  } catch (error) {
    console.log(
      "Location: controllers/location/province/listAll.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default listAll;
