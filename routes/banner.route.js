import express from "express";
import { bannerController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const bannerRouter = express.Router();

bannerRouter.post("/", auth.verifyToken, bannerController.createOne);
bannerRouter.get("/", bannerController.listAll);
bannerRouter.delete("/:id", auth.verifyToken, bannerController.remove);

export default bannerRouter;
