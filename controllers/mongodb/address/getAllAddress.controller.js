import { userRepository } from "../../../repositories/mongodb/index.js";

async function getAllAddress(req, res, next) {
  console.log("GET /address/ api");

  const { userId } = req.user;
  if (!userId) {
    res.status(400).send("Invalid body");
  }
  try {
    const data = await userRepository.getAddressesOfUser(userId);
    if(Boolean(data.addresses)) {
      return res.status(200).send(data.addresses);
    }
  } catch (error) {
    console.log(
      "Location: controllers/address/getAllAddress.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getAllAddress;
