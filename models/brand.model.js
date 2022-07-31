import mongoose from "mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const BrandSchema = new Schema({
  brand_name: {
    type: String,
    required: true,
  },
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

const BrandModel = mongoose.model("Brand", BrandSchema);

export default BrandModel;
