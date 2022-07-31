import { authService } from "../../../services/index.js";
import { firebaseService } from "../../../services/index.js";
import { userRepository } from "../../../repositories/mongodb/index.js";

async function requestPasswordResetLink(req, res, next) {
  console.log("POST /auth/request-link api");

  try {
    const { email } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      res.status(400).json({ message: "user not found" });
    } else {
      //modify link
      const dataFirebase = await firebaseService.generatePasswordResetLink(
        email
      );
      // login -> quên mật khẩu -> nhập email -> submit (gửi api req password reset)
      res.status(200).json({ message: "link has been generate" });
    }
  } catch (error) {
    console.log(
      "Location: controllers/auth/requestPasswordResetLink.controller.js",
      error
    );
    res.status(400).json(error);
  }
}

export default requestPasswordResetLink;
