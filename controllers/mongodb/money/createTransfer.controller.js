import mongoose from "mongoose";
import { Money } from "../../../models/index.js";

async function createTransfer(req, res, next) {
  console.log("POST /money/transfer api");

  const session = await mongoose.startSession();

  try {
    const { fromID, toID, amount } = req.body;
    session.startTransaction();
    const amountFrom = await Money.findOneAndUpdate({ userId: +fromID },{
      $inc: {amount: -amount}
    }, {session, new: true});
    // console.log(`Acc ${fromID} is:::`, amountFrom);
    
    if (amountFrom.amount<0) {
      throw new Error('Not enough money to transfer');

    }

    const amountTo = await Money.findOneAndUpdate({ userId: +toID },{
      $inc: {amount: amount}
    }, {session, new: true});
    // console.log(`Acc ${toID} is:::`, amountTo);
    
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Transfer is done",
    });
  } catch (error) {
    console.log(
      "Location: controllers/money/createTransfer.controller.js",
      error.message
    );
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({message: error.message});
  }
}

export default createTransfer;
