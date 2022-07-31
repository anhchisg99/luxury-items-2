import { vendorRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";
async function updateInformation(req, res, next) {
  console.log("PATCH /vendor/ api");

  const { role, userId } = req.user;
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can update information status." });
    return;
  }

  const {
    phone,
    email,
    storeLocation,
    storeDescription,
  } = req.body;
  try {
    const newInformation = await vendorRepository.updateInfo(userId,{
      phone,
      email,
      storeLocation,
      storeDescription,
    });

    res.status(200).send(newInformation);
  } catch (error) {
    console.log(
      "Location: controllers/product/vendor/updateInformation.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default updateInformation;
