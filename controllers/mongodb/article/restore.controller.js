import { articleRepository } from "../../../repositories/mongodb/index.js";

async function restore(req, res, next) {
  console.log("PATCH /article/:id/restore api");
  const { id } = req.params;
  try {
    const data = await articleRepository.restoreArticle(id);
    res
      .status(200)
      .send({ message: `Article ${id} was restored successfully!` });
  } catch (error) {
    console.log(
      "Location: controllers/article/restore.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default restore;
