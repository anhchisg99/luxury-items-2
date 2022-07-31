import { productRepository } from "../../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../../constants/enums/index.js";
async function updateOne(req, res, next) {
  console.log("PATCH /product/:id api");
  const product_id = req.params.id;

  const { role, userId } = req.user;
  if (role !== userRole.VENDOR) {
    res.sendStatus(403);
    return;
  }

  const {
    product_name,
    product_name_en,
    brand,
    category,
    price,
    currency,
    in_stock,
    product_image_urls,
    material,
    size,
    condition,
    description,
    description_en,
    is_arrival,
  } = req.body;
  try {
    const selectedProduct = await productRepository.getOne(product_id);
    if (selectedProduct.belongs_to_vendor.id.toString() !== userId) {
      res.sendStatus(403);
      return;
    }
    const updatedProduct = await productRepository.updateOne(product_id, {
      product_name,
      product_name_en,
      brand,
      category,
      price,
      currency,
      in_stock,
      product_image_urls,
      material,
      size,
      condition,
      description,
      description_en,
      is_arrival,
    });

    res.send(updatedProduct);
  } catch (error) {
    console.log(
      "Location: controllers/product/vendor/updateOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default updateOne;
