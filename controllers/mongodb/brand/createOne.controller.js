import { brandRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function createOne(req, res, next) {
  console.log("POST /brand/ api");
  const { brand_name, description } = req.body;
  const { role } = req.user;
  if (role !== userRole.VENDOR && role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only vendor can create new brand'});
    return;
  }
  try {
    await brandRepository.createOne({
      brand_name,
      description,
    });
    res.status(200).send({ 
      message: 'Create new brand successfully',
    });
  } catch (error) {
    console.log(
      "Location: controllers/brand/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
