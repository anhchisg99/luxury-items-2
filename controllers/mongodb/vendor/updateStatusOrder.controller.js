import { orderRepository  } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";
import { status as orderStatus } from "../../../constants/enums/index.js";

async function updateStatusOrder(req, res, next) {
  console.log("PATCH /vendor/:id/change-status api");

  const { role, userId } = req.user;
  const orderId = req.params.id;
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can update order status." });
    return;
  }
  const { status } = req.body;
  try {
    //check if order details id belong to vendorId
    const orderDetailRelated = await orderRepository.getOrderDetails(orderId)
    if(orderDetailRelated.vendorId.toString() !== userId) {
      res.status(403).send({ message: `The order ${orderId} does not belong to vendor ${userId}`});
      return;
    }
    const newStatus = await orderRepository.updateOrderStatus(orderId, {
      status: status,
    });
    res.status(200).send({ message: `The order ${orderId} is updated`});
  } catch (error) {
    console.log(
      "Location: controllers/product/vendor/updateStatusOrder.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default updateStatusOrder;
