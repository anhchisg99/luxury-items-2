import { Review } from "../../models/index.js";

export async function createOne(reviewData) {
  try {
    return Review.create(reviewData);
  } catch (error) {
    console.log(
      "Location: repositories/review.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function saveOne(reviewData) {
  try {
    return reviewData.save();
  } catch (error) {
    console.log(
      "Location: repositories/review.repository.js -> saveOne: ",
      error.message
    );
  }
}

export async function getReview(productId, limitRecord) {
  try {
    return Review.find({ product: productId })
    .limit(limitRecord)
    .populate("user", "display_name avatar")
    .select("-product -updated_at -__v")
    .sort({ created_at: -1 })
  } catch (error) {
    console.log(
      "Location: repositories/review.repository.js -> getReview: ",
      error.message
    );
  }
}

// export async function getFavoriteList() {
//   try {
//     return review.find()
//       .populate("buyer","display_name")
//       .populate("products")
//       .lean();
//   } catch (error) {
//     console.log(
//       "Location: repositories/review.repository.js -> getFavoriteList: ",
//       error.message
//     );
//   }
// }

// export async function updateFavoriteList(wistlist_id) {
//   try {
//     return review.updateOne(
//     { wistlist_id},
//     { $addToSet: { products: product._id }})
//   } catch (error) {
//     console.log(
//       "Location: repositories/review.repository.js -> updateFavoriteList: ",
//       error.message
//     );
//   }
// }