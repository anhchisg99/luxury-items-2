import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const FavoritesSchema = new Schema({
  product: [{ type: ObjectId, ref: "Product" }],
  vendor: [{ type: ObjectId, ref: "vendor" }],
  brand: [{ type: ObjectId, ref: "Brand" }],
});

const FavoritesModel = mongoose.model("Favorite", FavoritesSchema);
export default FavoritesModel;
