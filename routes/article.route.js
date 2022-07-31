import express from "express";
import { articleController } from "../controllers/mongodb/index.js";
import { authMiddleware as auth } from "../middlewares/index.js";
const articleRouter = express.Router();

articleRouter.get("/", articleController.getAll);
articleRouter.post("/", auth.verifyToken, articleController.createOne);
articleRouter.get("/search", articleController.getAllWithKeyword);
articleRouter.get("/cover", articleController.getCover);
articleRouter.get("/virtual-space", articleController.getFeature);
articleRouter.get("/read-next", articleController.getReadNext);
articleRouter.get("/popular", articleController.getPopular);
articleRouter.get("/editor-pick", articleController.getEditorPick);
articleRouter.get("/iconic", articleController.getIconic);
articleRouter.get("/highlight", articleController.getHighlight);
articleRouter.get("/exclusive", articleController.getExclusive);
articleRouter.get("/:id/categories", articleController.getArticleCategory);
articleRouter.get("/:id/comment", articleController.getCommentPagination);
articleRouter.get("/:id", articleController.getDetail);
articleRouter.patch("/:id", articleController.update);
articleRouter.patch("/:id/restore", articleController.restore);
articleRouter.delete("/:id", articleController.deleteTemporarily);
articleRouter.delete("/:id/force", articleController.deletePermanently);

export default articleRouter;
