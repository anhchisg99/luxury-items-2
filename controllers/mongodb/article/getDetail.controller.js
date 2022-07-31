import { articleRepository } from "../../../repositories/mongodb/index.js";

async function getDetail(req, res, next) {
  console.log("GET /article/:id api");
  const { id } = req.params;
  console.log(id);
  try {
    const data = await articleRepository.getDetail(id);
    if(!data){
      return res.status(503).send({message: "Article is not existed"})
    }
    else{
      await articleRepository.visitUp(id);
      return res.status(200).send(data);
    }
  } catch (error) {
    console.log(
      "Location: controllers/article/getDetail.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getDetail;
