import { Review } from "../../../models/index.js";
import {
  reviewProductRepository,
  productRepository,
} from "../../../repositories/mongodb/index.js";

async function createReview(req, res, next) {
  console.log("POST /review/:id api");

  const { userId } = req.user;
  const { id } = req.params;
  const { review_content, rating } = req.body;
  const product = await productRepository.getOne(id);
  if (!product) {
    return res.status(400).send({ message: "Product is not existed" });
  }
  try {
    const review = new Review({
      review_content,
      rating,
      user: userId,
      product: id,
    });

    const savedReview = await reviewProductRepository.saveOne(review);
    await productRepository.addReview(id, savedReview._id, savedReview.rating);

    if (savedReview) {
      return res.status(200).send({
        success: true,
        message: "Added review successfully",
      });
    }
  } catch (error) {
    console.log(
      "Location: controllers/review/createReview.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default createReview;
