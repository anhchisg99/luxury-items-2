import express from "express";
import { moneyController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";

const moneyRouter = express.Router();

//chuyen tien tu A qua B
moneyRouter.post("/transfer", moneyController.createTransfer);
moneyRouter.post("/user", moneyController.createATM);

export default moneyRouter;
