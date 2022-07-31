import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const PaymentSchema = new Schema({
  payment_method:{
    type:String
  },

  payment_type:{
      type:String
  },
});

const PaymentModel = mongoose.model("Payment", PaymentSchema);

export default PaymentModel;
