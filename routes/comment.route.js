import express from "express";
import { commentController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const commentRouter = express.Router();

commentRouter.post("/", auth.verifyToken, commentController.createOne);

export default commentRouter;
