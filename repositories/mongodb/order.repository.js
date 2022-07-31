import { Buyer, Order, OrderDetails, Product } from "../../models/index.js";
import paypal from "paypal-rest-sdk";
import mongoose from "mongoose";

async function orderProduct(id, orderData) {
  try {
    const order = new Order({ orderData });
    return await Buyer.findByIdAndUpdate(id, { $push: { orders: order } });
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> createComment: ",
      error.message
    );
  }
}

async function orderPaypal(orderData, userId) {
  try {
    const transaction_id = orderData.id;
    const type = orderData.payer.payment_method;
    const transaction = orderData.transactions;

    //**This code is get unique vendor id and push unique array*/
    let itemList = transaction[0].item_list.items;
    const vendorIdArr = itemList.map((product) => {
      const vendorId = product.sku.split(" ")[1];
      return vendorId;
    });
    const uniqueIdArr = vendorIdArr.filter((v, i, a) => a.indexOf(v) === i);
    let order_items = [];
    let inventoryUpdate = [];
    for (let i = 0; i < uniqueIdArr.length; i++) {
      const currentVendorId = uniqueIdArr[i];
      
      let productsByVendor = [];
      for (let j = 0; j < itemList.length; j++) {
        const currentProduct = [...itemList][j];
        if (typeof [...itemList][j].sku === "string") {
          const currentVendorIdOfProduct = [...itemList][j].sku.split(
            " "
          )[1];
          if (currentVendorId === currentVendorIdOfProduct) {
            currentProduct.sku = mongoose.Types.ObjectId(
              currentProduct.sku.split(" ")[0]
            );
            productsByVendor.push(currentProduct);
            inventoryUpdate.push({sku: currentProduct.sku, quantity: currentProduct.quantity});
          }
        }
      }
      order_items.push({
        vendorId: mongoose.Types.ObjectId(currentVendorId),
        buyerId: mongoose.Types.ObjectId(userId),
        products: productsByVendor,
        subTotal: productsByVendor
          .reduce((init, subtotal) => {
            init += subtotal.quantity * subtotal.price;
            return init;
          }, 0)
          .toFixed(2),
      });
    }
    
    let orderDetails = [];
    //**Create order details */
    for (let i = 0; i < order_items.length; i++) {
      const newOrderDetails = await createOrderDetails(order_items[i]);
      orderDetails.push(newOrderDetails);
    }

    //**Create new order for user*/
    const orderOfBuyer = await createOrder({
      "payment.transaction_id": transaction_id,
      "payment.payment_method": type,
      order_items: orderDetails,
      total_price: transaction[0].amount.total,
      currency: transaction[0].amount.currency,
      is_paid: true,
      paid_at: new Date(),
    });

    //**Push order to buyer */
    const order_id = orderOfBuyer._id;
    const foundedBuyer = await Buyer.findById(userId);
    foundedBuyer.orders.push({ _id: order_id });
    await foundedBuyer.save();

    //** Decrease in stock */
    // console.log(inventoryUpdate);
    // console.log(inStock);
    for (let index = 0; index < inventoryUpdate.length; index++) {
      await Product.findOneAndUpdate({ _id: inventoryUpdate[index].sku },{
        $inc: {in_stock: -inventoryUpdate[index].quantity}
      }, {new: true});
    }
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> orderPaypal: ",
      error.message
    );
  }
}

async function shippingInformation(userId) {
  try {
    return Buyer.find({ _id: userId }).populate(
      "address",
      "full_name address phone"
    );
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> shippingInformation: ",
      error.message
    );
  }
}

export { orderProduct, orderPaypal, shippingInformation };

export async function createOrder(orderData) {
  try {
    return Order.create(orderData);
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> createOrder: ",
      error.message
    );
  }
}

export async function createOrderDetails(orderDataForVendor) {
  try {
    return OrderDetails.create(orderDataForVendor);
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> createOrderDetails: ",
      error.message
    );
  }
}

export async function saveOrder(orderData) {
  try {
    return orderData.save();
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> saveOrder: ",
      error.message
    );
  }
}

export async function getAllOrders(customer_id) {
  try {
    return Order.find({ customer_id: customer_id })
      .sort({ created_at: -1 })
      .populate("customer_id", "display_name avatar");
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> getAllOrders: ",
      error.message
    );
  }
}

export async function getAllOrdersWithStatusParams(buyerId, statusFilter) {
  try {
    return OrderDetails.find({
      $and: [
        { buyerId: buyerId },
        { status: statusFilter },
      ],
    }).populate("vendorId", "display_name avatar")
    .populate("products.sku")
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> getAllOrdersWithStatusParams: ",
      error.message
    );
  }
}

// export async function getOrderById(order_id, customer_id) {
//   try {
//     return Order.find({ _id: order_id, customer_id: customer_id })
//       .sort({ created_at: -1 })
//       .populate("customer_id", "display_name avatar");
//   } catch (error) {
//     console.log(
//       "Location: repositories/order.repository.js -> getOrderById: ",
//       error.message
//     );
//   }
// }

export async function updateOrderStatus(orderId, data) {
  try {
    return OrderDetails.findOneAndUpdate({ _id: orderId }, data, { new: true });
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> updateOrderStatus: ",
      error.message
    );
  }
}

export async function getOrderDetails(orderId) {
  try {
    return OrderDetails.findById({ _id: orderId })
  } catch (error) {
    console.log(
      "Location: repositories/order.repository.js -> getOrderDetails: ",
      error.message
    );
  }
}
