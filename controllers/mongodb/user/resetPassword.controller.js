import { userRepository } from "../../../repositories/mongodb/index.js";

async function resetPassword(req, res, next) {
  console.log("POST /user/reset-password api");
  try {
    const { current_password, new_password } = req.body;
    if (!req.user) {
      res.status(400).json("user not found");
    } else {
      const userAfterReset = await userRepository.resetPassword(
        req.user.email,
        current_password,
        new_password
      );
      if (userAfterReset) {
        res.sendStatus(200);
      } else {
        res.status(400).json("Current password is not correct");
      }
    }
  } catch (error) {
    console.log(
      "Location: controllers/user/resetPassword.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default resetPassword;
