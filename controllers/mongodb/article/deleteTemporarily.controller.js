import { articleRepository } from "../../../repositories/mongodb/index.js";

async function softDelete(req, res, next) {
  console.log("DELETE /article/:id api");
  const { id } = req.params;
  try {
    const data = await articleRepository.softDelete(id);
    res.status(200).send({
      message: `Article ${id} was deleted temporarily successfully!`,
    });
  } catch (error) {
    console.log(
      "Location: controllers/article/deleteTemporarily.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default softDelete;
