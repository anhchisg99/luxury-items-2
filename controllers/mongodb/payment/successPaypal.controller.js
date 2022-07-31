import paypal from "paypal-rest-sdk";
import { orderRepository } from "../../../repositories/mongodb/index.js";
import { vars } from "../../../configs/index.js";

function successPaypal(req, res, next) {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const { userId } = req.user;
  const execute_payment_json = {
    payer_id: payerId,
  };
  // Obtains the transaction details from paypal
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
      if (error) {
        console.log(error.response);
        return res.status(400).json({ error: error });
      } else {
        // console.log(JSON.stringify(payment));
        // res.send(payment);
        res.setHeader("Access-Control-Allow-Origin", vars.originValue);
        res.status(200).json({ message: "Successfully !" });
        //**After create payment success, create order */
        return orderRepository.orderPaypal(payment, userId);
        //callback2
      }
    }
  );
}

export default successPaypal;
