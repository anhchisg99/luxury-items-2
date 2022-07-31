import {
  addressRepository,
  userRepository,
} from "../../../repositories/mongodb/index.js";
import { Address } from "../../../models/index.js";

async function createOne(req, res, next) {
  console.log("POST /address/ api");
  //TODO: province, district
  const { userId } = req.user;
  const { streetAddress, fullAddress, phone, fullName } = req.body;
  try {
    const address = new Address({
      streetAddress,
      fullAddress,
      phone,
      fullName,
      user: userId,
    });
    const createAddress = await addressRepository.createOne(address);
    let userRelated = await userRepository.getFullDetailUser(userId);
    userRelated.addresses.push(createAddress);
    await userRepository.saveUser(userRelated);
    res.status(201).json({
      message: "Added address successfully",
    });
  } catch (error) {
    console.log(
      "Location: controllers/address/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
