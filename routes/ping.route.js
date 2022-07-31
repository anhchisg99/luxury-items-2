import express from "express";
import { pingController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const pingRouter = express.Router();

pingRouter.get("/", pingController.pingWithoutAuth);
pingRouter.get("/with-auth", auth.verifyToken, pingController.pingWithAuth);

export default pingRouter;
