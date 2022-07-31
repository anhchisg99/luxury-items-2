import mongoose from "mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const WishlistSchema = new Schema({
  buyer: {
    type: ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: ObjectId,
      required: true,
      ref: 'Product',
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
});


const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

export default WishlistModel;
