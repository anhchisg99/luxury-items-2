import mongoose from "mongoose";
const { Schema } = mongoose;

const BannerSchema = new Schema({
  banner_img: {
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

const BannerModel = mongoose.model("Banner", BannerSchema);

export default BannerModel;
