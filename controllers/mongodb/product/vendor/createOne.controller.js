import { productRepository } from "../../../../repositories/mongodb/index.js";
import { role as userRole } from "../../../../constants/enums/index.js";
async function createOne(req, res, next) {
  console.log("POST /product/ api");

  const { role, userId } = req.user;
  if (role !== userRole.VENDOR) {
    res.sendStatus(403);
    return;
  }
  //check
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
    product_details,
    is_arrival = false
  } = req.body;
  try {
    const newProduct = await productRepository.createOne({
      product_name,
      product_name_en,
      brand,
      category,
      price,
      currency,
      in_stock,
      product_image_urls,
      belongs_to_vendor: userId,
      description,
      description_en,
      product_details,
      is_arrival,
      material,
      size,
      condition
    });

    res.send(newProduct);
  } catch (error) {
    console.log(
      "Location: controllers/product/vendor/createOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createOne;
