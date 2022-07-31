import { productCategoryRepository } from "../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../constants/enums/index.js";

async function deleteOne(req, res, next) {
  console.log("DELETE /product-category/:id/ api");
  const { id } = req.params;
  const { role } = req.user;
  if (role !== userRole.ADMIN) {
    res.status(403).send({ message: 'Only admin can delete a product category'});
    return;
  }
  try {
    const data = await productCategoryRepository.deleteOne(id);
    res.send({
      message: `Product Category ${id} was deleted successfully!`,
    });
  } catch (error) {
    console.log(
      "Location: controllers/productCategory/forceDelete.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default deleteOne;
