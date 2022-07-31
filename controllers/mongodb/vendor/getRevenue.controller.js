import {
  vendorRepository,
  orderRepository,
} from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";
import mongoose from "mongoose";

async function getRevenue(req, res, next) {
  console.log("GET /vendor/revenue api");

  const vendorId = req.user.userId;
  const { role } = req.user;
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can see it" });
    return;
  }
  try {
    const data = await vendorRepository.getAllOrders(vendorId);
    
    const totalOrder = data.length;
    console.log(totalOrder);
    const revenue = data.reduce((init, subtotal) => {
      init += subtotal.subTotal;
      return init
    }, 0);
    
    res.status(200).json({ 
      totalOrder: totalOrder,
      revenue: revenue,
      orderDetails: data,
    });
  } catch (error) {
    console.log(
      "Location: controllers/vendor/getRevenue.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getRevenue;
