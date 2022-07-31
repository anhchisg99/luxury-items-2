import { orderRepository } from "../../../repositories/mongodb/index.js";
import { status as orderStatus } from "../../../constants/enums/index.js";

async function getOrdersFilterByStatus(req, res, next) {
  console.log("GET /order/filter-status api");

  const { userId } = req.user;
  const statusFilter = req.query.status;
  if (!Object.values(orderStatus).includes(statusFilter)) {
    return res.status(400).send({ message: "Not have this status" });
  }
  try {
    const data = await orderRepository.getAllOrdersWithStatusParams(userId, statusFilter)
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/order/getOrdersFilterByStatus.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOrdersFilterByStatus;
