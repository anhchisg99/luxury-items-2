import express from "express";
import { brandController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const brandRouter = express.Router();

brandRouter.post("/", auth.verifyToken, brandController.createOne); 
brandRouter.get("/", brandController.listAll);
brandRouter.get("/:id", brandController.getOne);
brandRouter.patch("/:id", auth.verifyToken, brandController.updateOne);

export default brandRouter;
