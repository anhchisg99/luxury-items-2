import { Buyer, Vendor, Admin } from "../../../models/index.js";
import { firebaseService } from "../../../services/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function signup(req, res, next) {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid body" });
  }
  console.log("POST /auth/sign-up api");

  try {
    const lowerCaseEmail = email.toLowerCase();
    let createdUser;
    let user;
    switch (role) {
      case userRole.BUYER:
        user = new Buyer({
          email: lowerCaseEmail,
          display_name: lowerCaseEmail,
        });
        createdUser = await Buyer.register(user, password);
        break;

      case userRole.VENDOR:
        user = new Vendor({
          email: lowerCaseEmail,
          display_name: lowerCaseEmail,
        });
        createdUser = await Vendor.register(user, password);
        break;

      case userRole.ADMIN:
        user = new Admin({
          email: lowerCaseEmail,
          display_name: 'admin',
        });
        createdUser = await Admin.register(user, password);
        break;

      default:
        console.log(
          "Location: controllers/auth/signUp.controller.js",
          "invalid role"
        );
        res.status(400).json({ message: "invalid role" });
        return;
    }

    const firebaseUserData = {
      email: lowerCaseEmail,
      uid: createdUser.id,
      password: password,
      displayName: lowerCaseEmail,
      // emailVerified: false,
      // TODO: phoneNumber
    };
    const userRecord = await firebaseService.createNewUser(firebaseUserData);
    // console.log(userRecord)
    res.status(200).json({
      email: user.email,
      role: user.role,
      display_name: user.display_name,
    });
  } catch (error) {
    console.log(
      "Location: controllers/auth/signUp.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default signup;
