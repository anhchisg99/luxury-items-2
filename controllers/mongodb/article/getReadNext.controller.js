import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getReadNext(req, res, next) {
  console.log("GET /article/readnext api");
  const { lang = "vn" } = req.query;
  const en_version = lang === "en" ? true : false;
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 4;
    const data = await articleRepository.getWhatToReadNext(limitRecord, en_version);
    res.status(200).send(data);
  } catch (error) {
    console.log("Location: controllers/article/getEditorPick.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default getReadNext;
