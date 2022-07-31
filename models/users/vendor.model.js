import mongoose from "mongoose";
import User from "./baseUser.model.js";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const VendorSchema = new Schema({
  storeLocation: {
    type: String,
  },
  storeDescription: {
    type: String,
  },
  // totalProduct:[{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const VendorModel = User.discriminator("vendor", VendorSchema);

export default VendorModel;
