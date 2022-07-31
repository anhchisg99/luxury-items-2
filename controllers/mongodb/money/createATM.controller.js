import { Money } from "../../../models/index.js";

async function createATM(req, res, next) {
  console.log("POST /money/user api");

  // const { userId } = req.user;
  const {userId, amount } = req.body;
  try {
    const rs = await Money.create({ userId, amount });
    res.status(200).json({
      success: true,
      message: "Added review successfully",
      data: rs,
    });
  } catch (error) {
    console.log(
      "Location: controllers/money/createATM.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createATM;
