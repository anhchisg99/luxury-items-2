import { bannerRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function remove(req, res, next) {
  console.log("DELETE /banner/:id api");
  const { id } = req.params;
  const { role } = req.user;
  if (role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only admin can delete banner'});
    return;
  }
  try {
    const data = await bannerRepository.deleteOne(id);
    res.status(200).send({
      message: `Banner ${id} was removed successfully!`,
    });
  } catch (error) {
    console.log(
      "Location: controllers/address/remove.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default remove;
