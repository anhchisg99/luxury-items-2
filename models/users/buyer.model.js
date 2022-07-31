import mongoose from "mongoose";
import User from "./baseUser.model.js";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const BuyerSchema = new Schema({
  orders: [
    {
      order: { type: ObjectId, ref: "Order" },
    },
  ],
  favorite: { type: ObjectId, ref: "Favorite" },
  addresses: [{ type: ObjectId, ref: "Address" }],
});

const BuyerModel = User.discriminator("buyer", BuyerSchema);

export default BuyerModel;
