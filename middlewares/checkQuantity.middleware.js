import { productRepository } from "../repositories/mongodb/index.js";

export default async function checkQuantity(req, res, next) {
  try {
    const inCart = req.body.inCart;
    for (let index = 0; index < inCart.length; index++) {
      const element = inCart[index];
      let { in_stock, product_name } = await productRepository.getInStock(
        element.sku
      );
      if (in_stock < element.quantity) {
        return res.status(400).send({
          message: `The number of ${product_name} in stock is not satisfied`,
        });
      } else {
        next();
      }
    }
  } catch (error) {
    console.log("Location: middlewares/checkQuantity.middleware.js -> ", error.message);
    res.status(400).json(error);
  }
}
  