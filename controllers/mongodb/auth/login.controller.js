import { authService } from "../../../services/index.js";
import { vars } from "../../../configs/index.js";

async function login(req, res, next) {
  console.log("POST /auth/login api");

  try {
    const { user } = req;
    if (!user) {
      res.status(400).json("user not found");
    } else {
      const accessToken = authService.generateToken(user.email, user.id, user.role);
      res.cookie("__session", `Bearer ${accessToken}`, {
        // domain: "luxury-items-staging.web.app",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
        sameSite: "None",
        httpOnly: true,
        secure: true, // Disable this options when run on localhost
      });
      res.status(200).json({
        email: user.email,
        role: user.role,
        display_name: user.display_name,
        default_language: user.default_language,
        currency: user.currency,
        role: user.role,
        avatar: user.avatar,
        birthday: user.birthday,
        phone: user.phone,
        gender: user.gender,
        _id: user._id,
      });
    }
  } catch (error) {
    console.log("Location: controllers/auth/login.controller.js", error);
    res.status(400).json(error);
  }
}

export default login;
