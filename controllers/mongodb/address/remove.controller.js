import { addressRepository } from "../../../repositories/mongodb/index.js";

async function remove(req, res, next) {
  console.log("DELETE /address/:id api");
  const { id } = req.params;
  try {
    const data = await addressRepository.deleteOne(id);
    res.status(200).send({
      message: `Address ${id} was removed successfully!`,
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
