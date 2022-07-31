import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const AddressSchema = new Schema({
  user: { 
    type: ObjectId, 
    ref: "User" 
  },
  country: {
    type: String,
    default: 'Vietnam'
  },
  streetAdress: {
    type: String,
  },
  // district: {
  //   type: ObjectId,
  //   ref: "District",
  // },
  // province: { 
  //   type: ObjectId, 
  //   ref: "Province" 
  // },
  fullName: {
    type: String,
  },
  fullAddress: {
    type: String,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
  },
  orders: [{type: ObjectId, ref: 'Order'}]
});

const AddressModel = mongoose.model("Address", AddressSchema);

export default AddressModel;
