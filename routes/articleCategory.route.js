import express from "express";
import { articleCategoryController } from "../controllers/mongodb/index.js";

const articleCategoryRouter = express.Router();

articleCategoryRouter.post("/", articleCategoryController.createOne);
articleCategoryRouter.get("/", articleCategoryController.listAll);

export default articleCategoryRouter;
