import { productCategoryRepository } from "../../../repositories/mongodb/index.js";
import mongoose from "mongoose";
async function listAll(req, res, next) {
  console.log("GET /product-category/ api");
  try {
    const rootCategories = await productCategoryRepository.getRootCategories();
    const subCategories = await productCategoryRepository.getSubCategories();
    const formattedCategories = rootCategories.map((rootCategory) => {
      //INFO: First level
      rootCategory.subCategories = subCategories.filter(
        (subCategory) =>
          subCategory.parent.toString() === rootCategory._id.toString()
      );

      //INFO: Second level
      rootCategory.subCategories.map((parentCategory) => {
        parentCategory.subCategories = subCategories.filter(
          (subCategory) =>
            subCategory.parent.toString() === parentCategory._id.toString()
        );
      });
      return rootCategory;
    });

    res.send(formattedCategories);
  } catch (error) {
    console.log("Location: controllers/listAll.controller.js", error.message);
    res.status(400).json(error.message);
  }
}

export default listAll;
