import { articleRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function createOne(req, res, next) {
  console.log("POST /article/ api");
  const { role } = req.user;
  if (role !== userRole.ADMIN) {
    res.status(403).send({ message: "Only admin can post article" });
    return;
  }
  const {
    article_header_url,
    title,
    title_en,
    brief,
    brief_en,
    summary,
    content,
    content_en,
    author_name,
    comments,
    created_at,
    is_editor_pick,
    is_popular,
    is_iconic,
    is_exclusive,
    is_highlight,
    is_cover,
    is_readnext,
    is_feature,
    en_version,
  } = req.body;
  if (!article_header_url || !title || !content || !brief || !author_name) {
    res.status(400).send("Invalid body");
  }
  try {
    const newArticle = await articleRepository.createArticle({
      article_header_url,
      title,
      title_en,
      brief,
      brief_en,
      summary,
      content,
      content_en,
      author_name,
      comments,
      is_editor_pick,
      is_popular,
      is_iconic,
      is_exclusive,
      is_highlight,
      is_cover,
      is_readnext,
      is_feature,
      en_version,
      created_at,
    });
    res.status(201).send(newArticle);
  } catch (error) {
    console.log(
      "Location: controllers/article/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
