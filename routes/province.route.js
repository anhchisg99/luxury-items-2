import express from "express";
import { provinceController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const provinceRouter = express.Router();

provinceRouter.get("/", provinceController.listAll);
provinceRouter.get(
  "/current-available",
  provinceController.listCurrentAvailable
);

export default provinceRouter;
