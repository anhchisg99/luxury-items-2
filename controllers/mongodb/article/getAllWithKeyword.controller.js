import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getAllWithKeyword(req, res, next) {
  console.log("GET /article/search api");

  let { keyword = "", page = 0, limit = 0, author = "", category = "" } = req.query;

  keyword = keyword.replaceAll("+", " ");
  author = author.replaceAll("+", " ");
  category = category.replaceAll("+", " ");

  try {
    const data = await articleRepository.searchByKeyword(keyword, author, page, limit, category);
    return res.status(200).send(data);
  } catch (error) {
    console.log("Location: controllers/article/getAllWithKeyword.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default getAllWithKeyword;
