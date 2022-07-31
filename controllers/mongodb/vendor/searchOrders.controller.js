import { vendorRepository, orderRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function searchOrders(req, res, next) {
  console.log("GET /vendor/search-order api");

  const { userId, role } = req.user;
  const { page, limit } = req.query;
  const filter = {

  };
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can search orders" });
    return;
  }
  try {
    const data = await orderRepository.getOrderDetails('624e63634652014148b00123')
    console.log(data);
    res.status(200).send('ok');
  } catch (error) {
    console.log(
      "Location: controllers/vendor/searchOrders.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default searchOrders;
