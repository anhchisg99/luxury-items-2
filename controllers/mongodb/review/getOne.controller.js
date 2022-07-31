import { reviewProductRepository, productRepository } from "../../../repositories/mongodb/index.js";

async function getOne(req, res, next) {
  console.log("GET /review/:id api");
  const { id } = req.params;
  try {
    const { page, limit } = req.query;
    const totalReview = (await productRepository.getOne(id)).reviews.length;
    const pageOptions = {
      page: parseInt(page, 10) || 0,
      limitRecord: parseInt(limit, 10) || totalReview
    };
    const loadMore = pageOptions.limitRecord * pageOptions.page + pageOptions.limitRecord;
    const productReviews = await reviewProductRepository.getReview(id, loadMore);
    res.status(200).send({
      totalReview: totalReview,
      data: productReviews
    });
  } catch (error) {
    console.log(
      "Location: controllers/review/getOne.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getOne;
