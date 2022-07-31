import paypal from "paypal-rest-sdk";
import { configPaypal } from "../../../configs/index.js"
import { orderRepository } from "../../../repositories/mongodb/index.js";

async function old(req, res, next) {
  let return_url = configPaypal.return_url;
  let cancel_url = configPaypal.cancel_url;
  const orderId = req.params.id;
  const orderItem = await orderRepository.getOrderDetails(orderId);
  let transactions = [
    {
      "item_list": {
        "items": orderItem[0].order_items,
      },
      "amount": {
        "currency": "USD",
        "total": orderItem[0].total_price
      },
      "description": "thanh toán"
    }
  ]
  // res.sendStatus(200)
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: return_url,
      cancel_url: cancel_url,
    },
    transactions: transactions,
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.send({ 
            link: payment.links[i].href
          });
        }
      }
    }
  });
  // res.sendStatus(200);
}

export default old;

/*
import paypal from "paypal-rest-sdk";
import { configPaypal } from "../../../configs/index.js"
function payPaypal(req, res, next) {
  let return_url = configPaypal.return_url;
  let cancel_url = configPaypal.cancel_url;
  const transactions = req.body.transactions;
  // const total_amount = req.body.total_amount
  // const description = req.body.description
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: return_url,
      cancel_url: cancel_url,
    },
    transactions: transactions,
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          // console.log(payment.links[i].href)
          res.send({ link: payment.links[i].href });
          // res.redirect(payment.links[i].href);
          // res.writeHead(302, {
          //     Location: payment.links[i].href
          // });
          // res.end();
          // res.json({forwardLink: payment.links[i].href});
        }
      }
    }
  });
}
// function payPaypal(req,res,next){

//     const create_payment_json = {
//         "intent": "sale",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": "http://localhost:3001/payment/success",
//             "cancel_url": "http://localhost:3001/payment/cancel"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": [{

//                     "name": "Redhock Bar Soap dfd",
//                     "sku": "0fdfd",
//                     "price": "35.00",
//                     "currency": "USD",
//                     "quantity": 1
//                 }]
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": "35.00"
//             },
//             "description": "Washing Bar soap fdfdfd"
//         }]
//     };

//     paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             for (let i = 0; i < payment.links.length; i++) {
//                 if (payment.links[i].rel === 'approval_url') {
//                     res.redirect(payment.links[i].href);
//                 }
//             }
//         }
//     });
// }

export default payPaypal;
*/