import { authService } from "../../../services/index.js";
import { firebaseService } from "../../../services/index.js";
import { userRepository } from "../../../repositories/mongodb/index.js"

async function change(req, res, next) {
  console.log("POST /auth/reset api");

  try {
    const { user } = req;
    const { currentPassword, newPassword } = req.body;
    if (!user) {
      res.status(400).json({ message: "user not found"});
    } else {
      const dataMongoose = userRepository.changePassword(user.email, currentPassword, newPassword);
      const userEmail = firebaseService.getUserByEmail(user.email)
      await Promise.all([dataMongoose, userEmail])
      const dataFirebase = await firebaseService.updateUser(userEmail.uid, {
        password: newPassword
      })
      res.status(200).json({ message: "change password successfully"});
    }   
  } catch (error) {
    console.log("Location: controllers/auth/change.controller.js", error);
    res.status(400).json(error);
  }
}

export default change;
