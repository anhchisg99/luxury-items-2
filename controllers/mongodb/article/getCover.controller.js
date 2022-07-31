import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getCover(req, res, next) {
  console.log("GET /article/cover api");
  const { lang = "vn" } = req.query;
  const en_version = lang === "en" ? true : false;
  try {
    const data = await articleRepository.findCover(en_version);
    res.status(200).send(data);
  } catch (error) {
    console.log("Location: controllers/article/getCover.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default getCover;
