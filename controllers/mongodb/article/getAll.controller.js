import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getAll(req, res, next) {
  console.log("GET /article/ api");
  const { lang = "vn" } = req.query;
  const en_version = lang === "en" ? true : false;
  try {
    const { page, limit } = req.query;
    const pageOptions = {
      page: parseInt(page, 10) || 1,
      limitRecord: parseInt(limit, 10) || 10,
    };
    let result = {
      count: await articleRepository.countArticle(),
      data: [],
    };
    if (!page || !limit) {
      result.data = await articleRepository.findAll(en_version);
    } else {
      const skipRecord = pageOptions.page * pageOptions.limitRecord - pageOptions.limitRecord;
      const limitRecord = pageOptions.limitRecord;
      result.data = await articleRepository.findAllPagination(skipRecord, limitRecord, en_version);
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("Location: controllers/article/getAll.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default getAll;
