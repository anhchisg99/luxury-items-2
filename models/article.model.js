import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
import mongooseDelete from "mongoose-delete";

const ArticleSchema = new Schema({
  article_header_url: {
    type: String,
  },
  title: {
    type: String,
  },
  title_en: {
    type: String,
  },
  brief: {
    type: String,
  },
  brief_en: {
    type: String,
  },
  summary: {
    type: String,
  },
  content: {
    type: String,
  },
  content_en: {
    type: String,
  },
  author_name: {
    type: String,
  },
  vendor_ids: {
    type: String,
  },
  product_ids: {
    type: String,
  },
  category_id: {
    type: Array,
  },
  likes: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  views: { type: Number },
  comments: [{ type: ObjectId, ref: "Comment" }],
  article_categories: [{ type: ObjectId, ref: "ArticleCategory" }],
  is_editor_pick: {
    type: Boolean,
    default: false,
  },
  is_popular: {
    type: Boolean,
    default: false,
  },
  is_iconic: {
    type: Boolean,
    default: false,
  },
  is_exclusive: {
    type: Boolean,
    default: false,
  },
  is_highlight: {
    type: Boolean,
    default: false,
  },
  is_cover: {
    type: Boolean,
    default: false,
  },
  is_readnext: {
    type: Boolean,
    default: false,
  },
  is_feature: {
    type: Boolean,
    default: false,
  },
  en_version: {
    type: Boolean,
    default: false,
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

ArticleSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
const ArticleModel = mongoose.model("Article", ArticleSchema);
export default ArticleModel;
