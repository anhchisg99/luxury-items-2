import { authService } from "../../../services/index.js";
import { firebaseService } from "../../../services/index.js";
import { userRepository } from "../../../repositories/mongodb/index.js";

async function forget(req, res, next) {
  console.log("PUT /auth/forget-password api");

  try {
    const { newPassword } = req.body;
    const { user } = req;
    if (!user) {
      res.status(400).json({ message: "user not found" });
    } else {
      const dataMongoose = userRepository.resetPassword(
        user.email,
        newPassword
      );
      const dataFirebase = firebaseService.updateUser(user.uid, {
        password: newPassword,
      });
      await Promise.all([dataMongoose, dataFirebase]);
      res.status(200).json({ message: "oke" });
    }
  } catch (error) {
    console.log("Location: controllers/auth/forget.controller.js", error);
    res.status(400).json(error);
  }
}

export default forget;
