import { productCategoryRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function createOne(req, res, next) {
  console.log("POST /product-category/ api");
  const { category_name, category_name_vn, description, parent = null } = req.body;
  const { role } = req.user;
  if (role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only admin can create new product category'});
    return;
  }
  try {
    await productCategoryRepository.createOne({
      category_name,
      category_name_vn,
      description,
      parent,
    });
    res.status(200).send({ 
      message: 'Create new product category successfully'
    });
  } catch (error) {
    console.log(
      "Location: controllers/productCategory/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
