import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_name_en: {
      type: String,
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    category: [
      {
        type: ObjectId,
        ref: "ProductCategory",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["VND", "USD"],
      default: "VND",
    },
    in_stock: {
      type: Number,
      required: true,
    },
    product_image_urls: [
      {
        type: String,
      },
    ],
    material: { type: String },
    size: { type: String },
    condition: { type: String },
    belongs_to_vendor: {
      type: ObjectId,
      ref: "User",
    },
    is_arrival: {
      type: Boolean,
    },
    is_popular: {
      type: Boolean,
    },
    provinceCode: [
      {
        type: String,
      },
    ],
    districtCode: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    description_en: {
      type: String,
    },
    visit: {
      type: Number,
    },
    avg_rating: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },
    reviews: [
      {
        type: ObjectId,
        ref: "Review",
      },
    ],
    created_at: {
      type: Date,
      default: () => new Date(),
    },
    updated_at: {
      type: Date,
      default: () => new Date(),
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

ProductSchema.index({
  product_name: "text",
});
ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(aggregatePaginate);
ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
