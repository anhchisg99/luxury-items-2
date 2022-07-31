// import { Order } from "../../../models/index.js";
import { orderRepository } from "../../../repositories/mongodb/index.js";


async function shippingInformation(req, res) {
    const userId = req.user
    try {
        const shippingInfo = await orderRepository.shippingInformation(userId)
        res.send(shippingInfo)
    } catch (error) {
        console.log(
            "Location: controllers/order/shippingInformation.controller.js",
            error.message
        );
        res.status(400).json(error.message);
    }
}

export default shippingInformation