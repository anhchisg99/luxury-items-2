import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const ArticleCategorySchema = new Schema({
  article_id: { type: ObjectId, ref:"Article"},
  category_name: {
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

const ArticleCategoryModel = mongoose.model(
  "ArticleCategory",
  ArticleCategorySchema
);

export default ArticleCategoryModel;
