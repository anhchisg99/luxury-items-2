import express from "express";
import { authController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", auth.verifyLogin, authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/change", auth.verifyToken, authController.change);
authRouter.post("/request-link", authController.requestPasswordResetLink);
authRouter.put("/forget-password", authController.forget);


export default authRouter;
