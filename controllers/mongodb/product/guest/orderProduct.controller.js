import { orderRepository } from "../../../../repositories/mongodb/index.js";

async function orderProduct(req, res, next) {
  console.log(`GET /product/orderProduct`);

  const { product, quantity, phone, address, coupon, shipping_fee, buyer } = req.body;
  const { id } = req.params;
  try {
    const data = await orderRepository.orderProduct(id, {
      product,
      quantity,
      phone,
      address,
      coupon,
      shipping_fee,
      buyer,
    });
    res.send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/orderProduct.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default orderProduct;
