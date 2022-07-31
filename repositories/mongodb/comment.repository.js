import { User, Comment } from "../../models/index.js";

async function createComment(commentData) {
  try {
    return commentData.save();
  } catch (error) {
    console.log(
      "Location: repositories/comment.repository.js -> createComment: ",
      error.message
    );
  }
}

async function getUsername(userId) {
  try {
    return User.findById(userId).select("display_name");
  } catch (error) {
    console.log(
      "Location: repositories/comment.repository.js -> getUserCommented: ",
      error.message
    );
  }
}

async function getCommentPagination(articleId, load_more) {
  try {
    return Comment.find({ article_id: articleId })
      .populate("user", "display_name avatar")
      .limit(load_more);
  } catch (error) {
    console.log(
      "Location: repositories/comment.repository.js -> getCommentPagination: ",
      error.message
    );
  }
}


export { createComment, getUsername, getCommentPagination };
