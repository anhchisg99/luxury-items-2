import { vnpay } from "../middlewares/index.js";
import express from "express";
import { paymentController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth, checkQuantity } from "../middlewares/index.js";

const paymentRouter = express.Router();

paymentRouter.post("/", vnpay.create_payment_url, paymentController.createPayment);
// paymentRouter.get("/vnpay_ipn", vnpay.get_vnpay_ipn, paymentController.createPayment);
// paymentRouter.get("/vnpay_return", vnpay.get_vnpay_return, paymentController.createPayment);
paymentRouter.post("/pay", auth.verifyToken, paymentController.payPaypal);
paymentRouter.post("/success", auth.verifyToken, paymentController.successPaypal);

export default paymentRouter;
