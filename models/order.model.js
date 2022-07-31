import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
  payment: {
    payment_method: String,
    transaction_id: String,
  },
  total_price: Number,
  currency: String,
  is_paid: { type: Boolean, required: true, default: false },
  paid_at: Date, 
  order_items: [{ type: ObjectId, ref: 'OrderDetails'}],
  created_at: {
    type: Date,
    default: () => new Date(),
  },
  updated_at: {
    type: Date,
    default: () => new Date(),
  },
});

OrderSchema.set("toJSON", {
  virtuals: true,
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
