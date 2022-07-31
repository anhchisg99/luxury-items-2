import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  article_id: { type: ObjectId, ref: "Article" },
  content: {
    type: String,
  },
  user: { type: ObjectId, ref: "User" },
  created_at: {
    type: Date,
    default: () => new Date(),
  },
});

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
