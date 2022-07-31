import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getFeature(req, res, next) {
  console.log("GET /article/virtual-space api");
  try {
    const { limit } = req.query;
    const limitRecord = parseInt(limit, 10) || 3;
    const data = await articleRepository.findVirtualSpacePost(limitRecord);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/article/getFeature.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getFeature;
