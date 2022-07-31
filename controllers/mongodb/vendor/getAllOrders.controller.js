import { vendorRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function getAllOrders(req, res, next) {
  console.log("GET /vendor/all-orders api");

  const { userId, role } = req.user;
  const { page, limit } = req.query;
  
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can get orders" });
    return;
  }
  try {
    const total = (await vendorRepository.getAllOrders(userId)).length;
    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limitRecord: parseInt(limit, 10) || total,
    };
    const loadMore =
      pageOptions.limitRecord * pageOptions.page + pageOptions.limitRecord;
    const order = await vendorRepository.getAllOrders(
      userId, loadMore
    );
    res.status(200).send({ total: total, data: order });
  } catch (error) {
    console.log(
      "Location: controllers/vendor/getAllOrders.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getAllOrders;
