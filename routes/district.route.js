import express from "express";
import { districtController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const districtRouter = express.Router();

districtRouter.get("/", districtController.listAllOfSpecificProvince);

export default districtRouter;
