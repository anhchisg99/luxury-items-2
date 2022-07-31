import express from "express";
import { userController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const userRouter = express.Router();

userRouter.post(
  "/reset-password",
  auth.verifyToken,
  userController.resetPassword
);

userRouter.post(
  "/get-image-upload-url",
  auth.verifyToken,
  userController.getImageUploadUrl
);

userRouter.get("/", auth.verifyToken, userController.getSelfProfile);
userRouter.patch("/", auth.verifyToken, userController.updateSelfProfile);
export default userRouter;
