import { productCategoryRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function updateOne(req, res, next) {
  console.log("PATCH /product-category/:id api");
  const { id } = req.params;
  const { category_name, category_name_vn, description, parent } = req.body;
  const { role } = req.user;
  if (role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only admin can update a product category'});
    return;
  }
  try {
    const updatedCategory = await productCategoryRepository.updateOne(id, {
      category_name,
      description,
      parent,
      category_name_vn
    });
    res.status(200).send(updatedCategory);
  } catch (error) {
    console.log(
      "Location: controllers/article/update.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default updateOne;
