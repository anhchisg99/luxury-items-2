import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getExclusive(req, res, next) {
  console.log("GET /article/exclusive api");
  const { lang = "vn" } = req.query;
  const en_version = lang === "en" ? true : false;
  try {
    let total = (await articleRepository.findExclusive()).length;
    const { page, limit } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limitRecord: parseInt(limit, 10) || total,
    };
    const loadMore = pageOptions.limitRecord * pageOptions.page + pageOptions.limitRecord;
    const data = await articleRepository.findExclusive(loadMore, en_version);
    res.status(200).send({ total: total, data: data });
  } catch (error) {
    console.log("Location: controllers/article/getExclusive.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default getExclusive;
