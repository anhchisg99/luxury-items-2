async function createPayment(req, res, next) {
  console.log("POST /payment/ api");
  try {
    res.send(req.vnpay)
  } catch (error) {
    console.log(
      "Location: controllers/payment/createPayment.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createPayment;
