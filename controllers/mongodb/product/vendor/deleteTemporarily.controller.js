import { productRepository } from "../../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../../constants/enums/index.js";

async function softDelete(req, res, next) {
  console.log("DELETE /product/:id api");
  const product_id = req.params.id;
  const { role, userId } = req.user;
  //check if role is vendor
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can delete product." });
    return;
  }
  try {
    //check if product belong to vendor
    const selectedProduct = await productRepository.getOne(product_id);
    if (selectedProduct.belongs_to_vendor.id.toString() !== userId) {
      res.status(400).send({ message: `Product ${product_id} does not belong to vendor ${userId}` });
      return;
    }
    const data = await productRepository.softDelete(product_id);
    res.status(200).send({
      message: `Product ${product_id} was deleted temporarily successfully!`,
    });
  } catch (error) {
    console.log(
      "Location: controllers/product/vendor/deleteTemporarily.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default softDelete;
