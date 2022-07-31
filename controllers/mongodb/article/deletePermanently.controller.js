import { articleRepository } from "../../../repositories/mongodb/index.js";

async function forceDelete(req, res, next) {
  console.log("DELETE /article/:id/force api");
  const { id } = req.params;
  try {
    const data = await articleRepository.forceDelete(id);
    res.status(200).send({
      message: `Article ${id} was deleted permanently successfully!`,
    });
  } catch (error) {
    console.log(
      "Location: controllers/article/deletePermanently.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default forceDelete;
