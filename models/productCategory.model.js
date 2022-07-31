import mongoose from "mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const ProductCategorySchema = new Schema({
  category_name: {
    type: String,
    required: true,
  },
  category_name_vn: {
    type: String,
  },
  description: {
    type: String,
  },
  parent: {
    type: ObjectId,
    ref: "ProductCategory",
  },
  category_icon_url:{
    type: String,
  },
  category_icon_active_url:{
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

const ProductCategoryModel = mongoose.model(
  "ProductCategory",
  ProductCategorySchema
);

export default ProductCategoryModel;
