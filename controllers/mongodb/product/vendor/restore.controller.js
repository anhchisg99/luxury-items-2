import { productRepository } from "../../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../../constants/enums/index.js";

async function restore(req, res, next) {
  console.log("PATCH /product/:id/restore api");
  const product_id = req.params.id;
  const { role, userId } = req.user;
  //check if role is vendor
  if (role !== userRole.VENDOR) {
    res.status(403).send({ message: "Only vendor can restore product." });
    return;
  }
  try {
    const data = await productRepository.restoreProduct(product_id);
    res
      .status(200)
      .send({ message: `Product ${product_id} was restored successfully!` });
  } catch (error) {
    console.log(
      "Location: controllers/product/vendor/restore.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default restore;
