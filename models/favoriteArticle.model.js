import mongoose from "mongoose";
const { Schema } = mongoose;

const ObjectId = Schema.Types.ObjectId;

const FavoriteArticleSchema = new Schema({
  reader: {
    type: ObjectId,
    ref: 'User',
  },
  articles: [
    {
      type: ObjectId,
      required: true,
      ref: 'Article',
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


const FavoriteArticleModel = mongoose.model("FavoriteArticle", FavoriteArticleSchema);

export default FavoriteArticleModel;
