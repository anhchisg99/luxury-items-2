import { orderRepository, userRepository } from "../../../repositories/mongodb/index.js";

async function createOrder(req, res, next) {
  console.log("POST /order/ api");

  const { userId } = req.user;
  const { order_items, payment_method, total_price } = req.body;
  try {
    if (!order_items && !order_items.length) {
        return res.status(400).json({
          message: "No items order",
        });
      }
    const newOrder = await orderRepository.createOrder({
      order_items,
      customer_id: userId,
      payment_method,
      total_price,
    });
    let userRelated = await userRepository.getFullDetailUser(userId);
    userRelated.orders.push(newOrder);
    await userRepository.saveUser(userRelated)
    res.status(200).send(newOrder);
  } catch (error) {
    console.log(
      "Location: controllers/order/createOrder.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOrder;
