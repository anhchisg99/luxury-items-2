import { Comment } from "../../../models/index.js";
import {
  commentRepository,
  articleRepository,
} from "../../../repositories/mongodb/index.js";
import mongoose from "mongoose";

async function createOne(req, res, next) {
  console.log("POST /comment/ api");
  const { article_id, content } = req.body;
  const { user } = req;
  if (!user || !content) {
    res.send("Invalid body");
  }
  try {
    const comment = new Comment({
      article_id,
      content,
      user: mongoose.Types.ObjectId(user.userId),
    });
    const createComment = await commentRepository.createComment(comment);
    let articleRelated = await articleRepository.getFullDetail(article_id);
    articleRelated.comments.push(comment);
    await articleRepository.saveArticle(articleRelated);
    res.status(201).send(createComment);
  } catch (error) {
    console.log(
      "Location: controllers/comment/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
