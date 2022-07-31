import { provinceRepository } from "../../../../repositories/mongodb/index.js";

async function listCurrentAvailable(req, res, next) {
  console.log("GET /province/ api");

  try {
    const data = await provinceRepository.listCurrentAvailable();
    res.send(data);
  } catch (error) {
    console.log(
      "Location: controllers/location/province/listCurrentAvailable.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default listCurrentAvailable;
