import { articleRepository } from "../../../repositories/mongodb/index.js";

async function update(req, res, next) {
  console.log("PATCH /article/:id api");
  const { id } = req.params;
  try {
    const updatedArticle = await articleRepository.updateOne(id, req.body);
    res.status(200).send(updatedArticle);
  } catch (error) {
    console.log(
      "Location: controllers/article/update.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default update;
