import { addressRepository } from "../../../repositories/mongodb/index.js";

async function update(req, res, next) {
  console.log("PATCH /address/:id api");
  const { id } = req.params;
  const { userId } = req.user;
  const { streetAddress, fullAddress, phone, fullName, country } = req.body;
  try {
    const updatedAddress = await addressRepository.updateOne(id, {
      streetAddress,
      fullAddress,
      phone,
      fullName,
      country,
    });
    res.status(200).send({ message: `Address ${id} was updated successfully!` });
  } catch (error) {
    console.log(
      "Location: controllers/address/update.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default update;
