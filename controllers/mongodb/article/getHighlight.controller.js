import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getHighlight(req, res, next) {
  console.log("GET /article/popular api");
  const { lang = "vn" } = req.query;
  const en_version = lang === "en" ? true : false;
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 3;
    const data = await articleRepository.findHighlight(limitRecord, en_version);
    res.status(200).send(data);
  } catch (error) {
    console.log("Location: controllers/article/getHighlight.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default getHighlight;
