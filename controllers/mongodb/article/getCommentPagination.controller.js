import {
  articleRepository,
  commentRepository,
} from "../../../repositories/mongodb/index.js";

async function getCommentPaginate(req, res, next) {
  console.log("GET /article/:id/comment?page=:page&limit=:limit api");
  const { id } = req.params;
  try {
    const { page, limit } = req.query;

    const articleDetails = await articleRepository.getDetail(id);
    const totalComments = articleDetails.comments.length
    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limitRecord: parseInt(limit, 10) || totalComments,
    };
    const loadMore =
      pageOptions.limitRecord * pageOptions.page + pageOptions.limitRecord;
    const data = await commentRepository.getCommentPagination(id, loadMore);

    return res.status(200).send({
      total: totalComments,
      comments: data,
    });
  } catch (error) {
    console.log(
      "Location: controllers/article/getCommentPaginate.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getCommentPaginate;
