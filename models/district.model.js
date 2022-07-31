import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const DistrictSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name_with_type: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  path_with_type: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  parent_code: {
    type: String,
    required: true,
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

DistrictSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("District", DistrictSchema);

export default ProductModel;
