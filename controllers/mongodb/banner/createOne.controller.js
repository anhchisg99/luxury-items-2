import { bannerRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function createOne(req, res, next) {
  console.log("POST /banner/ api");
  const { banner_img, description } = req.body;
  const { role } = req.user;
  if (role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only admin can post banner'});
    return;
  }
  try {
    await bannerRepository.createOne({
      banner_img,
      description,
    });
    res.status(201).send({ message: 'Created banner successfully' });
  } catch (error) {
    console.log(
      "Location: controllers/banner/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
