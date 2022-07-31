import mongoose from "mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const ReviewSchema = new Schema({
  review_content: {
    type: String,
    required: [true, 'Review cannot be empty!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  product: {
    type: ObjectId,
    ref: 'Product',
    required: [true, 'Review must belong to a product']
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
  updated_at: {
    type: Date,
    default: () => new Date(),
  }
});


const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;
