import express from "express";
import { addressController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const addressRouter = express.Router();

addressRouter.post("/", auth.verifyToken, addressController.createOne);
addressRouter.get("/", auth.verifyToken, addressController.getAllAddress);
addressRouter.patch("/:id", auth.verifyToken, addressController.update);
addressRouter.delete("/:id", auth.verifyToken, addressController.remove);

export default addressRouter;
