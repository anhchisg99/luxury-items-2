import paypal from "paypal-rest-sdk";
import { configPaypal } from "../../../configs/index.js";
function payPaypal(req, res, next) {
  let return_url = configPaypal.return_url;
  let cancel_url = configPaypal.cancel_url;
  let transactions = req.body.transactions;
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
            link: payment.links[i].href,
          });
        }
      }
    }
  });
}
export default payPaypal;
