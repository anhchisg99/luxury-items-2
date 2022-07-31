import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const MoneySchema = new Schema({
  userId: {
    type: String,
    // ref: "User",
  },
//   userB: {
//     type: ObjectId,
//     ref: "User",
//   },
  amount: { type: Number, required: true },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
  updated_at: {
    type: Date,
    default: () => new Date(),
  },
});

const MoneyModel = mongoose.model("Money", MoneySchema);

export default MoneyModel;
