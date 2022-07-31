import { brandRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function update(req, res, next) {
  console.log("PATCH /brand/:id api");
  const { id } = req.params;
  const { role } = req.user;
  if (role !== userRole.VENDOR && role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only vendor can update new brand'});
    return;
  }
  const { brand_name, description } = req.body;
  try {
    const updatedBrand = await brandRepository.updateOne(id, {
      brand_name, 
      description,
    });
    res.status(200).send({ message: `Brand ${id} was updated successfully!` });
  } catch (error) {
    console.log(
      "Location: controllers/brand/update.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default update;
