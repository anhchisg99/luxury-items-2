import { userRepository, vendorRepository } from "../../../repositories/mongodb/index.js";
import { status as orderStatus } from "../../../constants/enums/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function getOrdersFilterByStatus(req, res, next) {
  console.log("GET /vendor/filter-order api");

  const { userId, role } = req.user;
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can get orders" });
    return;
  }
  const statusFilter = req.query.status;
  if (!Object.values(orderStatus).includes(statusFilter)) {
    return res.status(400).send({ message: "Not have this status" });
  }
  try {
    const order = await vendorRepository.getAllOrdersWithStatusParams(
      userId,
      statusFilter
    );
    res.status(200).send(order);
  } catch (error) {
    console.log(
      "Location: controllers/vendor/getOrdersFilterByStatus.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOrdersFilterByStatus;
