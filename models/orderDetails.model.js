import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const OrderDetailsSchema = new Schema({
  vendorId: { type: ObjectId, ref: "vendor" },
  buyerId: { type: ObjectId, ref: "buyer" },
  products: [{
    sku:{ type: ObjectId, ref: "Product" },
    currency: String,
    tax: Number,
    quantity: Number
  }],
  status: {
    type: String,
    default: "processing",
  },
  subTotal: { type: Number, default: 0 },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
  updated_at: {
    type: Date,
    default: () => new Date(),
  },
  // is_delivered: { type: Boolean, required: true, default: false },
  delivered_at: Date,
});

const OrderDetailsModel = mongoose.model("OrderDetails", OrderDetailsSchema);
export default OrderDetailsModel;
