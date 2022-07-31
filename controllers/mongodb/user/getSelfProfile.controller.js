import { userRepository } from "../../../repositories/mongodb/index.js";
async function getSelfProfile(req, res, next) {
  console.log("GET /user/ api");
  try {
    if (req.user) {
      const userId = req.user.userId;
      const user = await userRepository.findById(userId);
      res.send(user);
    } else {
      res.status(400).json("Cannot find this user");
    }
  } catch (error) {
    console.log(
      "Location: controllers/user/getSelfProfile.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getSelfProfile;
