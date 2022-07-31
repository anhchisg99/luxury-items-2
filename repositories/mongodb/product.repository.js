import { Buyer, Product } from "../../models/index.js";
import mongoose from "mongoose";
export async function createOne(productData) {
  try {
    return Product.create(productData);
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function updateOne(product_id, productData) {
  try {
    productData.updated_at = new Date();
    return Product.findByIdAndUpdate(product_id, productData, {
      new: true,
    });
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> updateOne: ",
      error.message
    );
  }
}

export async function getOne(product_id) {
  try {
    return Product.findById(product_id)
      .populate("belongs_to_vendor", "display_name avatar")
      .populate("reviews", "rating")
      .populate("brand", "brand_name")
      .populate("category", "category_name")
      .select("-created_at -updated_at -__v");
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getOne: ",
      error.message
    );
  }
}

export async function getFullDetail(product_id) {
  try {
    return Product.findById(product_id)
      .populate("belongs_to_vendor")
      .populate("reviews")
      .populate("brand")
      .populate("category");
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getFullDetail: ",
      error.message
    );
  }
}
export async function getFavoritesUser(user_id) {
  try {
    return Buyer.findById(user_id).select("favorite").populate("favorite");
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getFavoritesUser: ",
      error.message
    );
  }
}
export async function getAllWithPagination(page, limit) {
  const customLabels = {
    docs: "products",
    totalDocs: "product_count",
    pagingCounter: "first_product_index_of_page",
    nextPage: "next_page",
    prevPage: "prev_page",
    hasNextPage: "has_next_page",
    hasPrevPage: "has_prev_page",
    totalPages: "page_count",
    page: "current_page",
  };
  try {
    return Product.paginate(
      {},
      { page: page, limit: limit, customLabels: customLabels }
    );
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getAllWithPagination: ",
      error.message
    );
  }
}

export async function queryByKeywords(query, page, limit) {
  const customLabels = {
    docs: "products",
    totalDocs: "product_count",
    pagingCounter: "first_product_index_of_page",
    nextPage: "next_page",
    prevPage: "prev_page",
    hasNextPage: "has_next_page",
    hasPrevPage: "has_prev_page",
    totalPages: "page_count",
    page: "current_page",
  };
  try {
    return Product.paginate(query, {
      page: page,
      limit: limit,
      customLabels: customLabels,
    });
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> queryByKeywords: ",
      error.message
    );
  }
}

export async function findNewArrival(limitRecord) {
  try {
    return Product.find({ is_arrival: true })
      .populate({
        path: "brand",
        select: "brand_name",
      })
      .select(
        "product_name product_name_en price brand_name product_image_urls"
      )
      .sort({ created_at: -1 })
      .limit(limitRecord)
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> findNewArrival: ",
      error.message
    );
  }
}

export async function findNewArrivalOfVendor(vendorId, limitRecord) {
  try {
    return Product.find({ belongs_to_vendor: vendorId, is_arrival: true })
      .populate({
        path: "belongs_to_vendor",
        select: "display_name avatar",
      })
      .populate({
        path: "brand",
        select: "brand_name",
      })
      .select(
        "product_name product_name_en price brand_name product_image_urls"
      )
      .sort({ created_at: -1 })
      .limit(limitRecord)
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> findNewArrivalOfVendor: ",
      error.message
    );
  }
}

export async function similarProduct(product_id) {
  try {
    const categories = await Product.find({ _id: product_id }).distinct(
      "category"
    );
    return Product.find({ category: { $in: categories } })
      .limit(5)
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> similarProduct: ",
      error.message
    );
  }
}

//TODO: add field is_sponsored
export async function sponsoredProduct(product_id) {
  try {
    const vendor = await Product.find({ _id: product_id }).distinct(
      "belongs_to_vendor"
    );
    return Product.find({ belongs_to_vendor: vendor }).limit(5).lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> sponsoredProduct: ",
      error.message
    );
  }
}

export async function searchProduct(name) {
  try {
    return await Product.find({ product_name: name });
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> searchProduct: ",
      error.message
    );
  }
}
export async function searchNameProduct(data, name) {
  let count = 0;
  let arr = [];
  for (let a of data) {
    if (a == null) {
      count = count + 1;
    }
    if (a === 0) {
      count = count + 1;
    }
  }
  if (data[0]) {
    arr.push({ provinceCode: { $in: data[0] } });
  }
  if (data[1]) {
    arr.push({ brand: { $in: data[1] } });
  }
  if (data[2]) {
    arr.push({ rating: { $in: data[2] } });
  }
  if (data[3]) {
    arr.push({ price: { $gte: data[3] } });
  }
  if (data[4]) {
    arr.push({ price: { $lte: data[4] } });
  }

  let arrProduct = [];
  if (count == 5) {
    // arrProduct = [{ "product_name": name }]
    arrProduct = [{ product_name: { $regex: name } }];
  } else {
    arrProduct = [
      {
        $and: arr,
      },
      { product_name: { $regex: name } },
    ];
  }
  try {
    // console.log(arrProduct)
    return await Product.find(
      // Find documents matching any of these values
      {
        $and: arrProduct,
      }
    );
    // return await Product.find({'provinceCode':{ "$in": data }});
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> searchTotal: ",
      error.message
    );
  }
}
export async function sortFavoritesProduct() {
  try {
    return await Product.find({}).limit(2).sort({ wishlist: 1 });
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> favoriteProduct: ",
      error.message
    );
  }
}

export async function searchTotal(data, category, product_name) {
  let count = 0;
  let arr = [];
  let picker = "";
  for (let a of data) {
    if (a == null) {
      count = count + 1;
    }
    if (a === 0) {
      count = count + 1;
    }
  }
  if (data[0]) {
    arr.push({ provinceCode: { $in: data[0] } });
  }
  if (data[1]) {
    arr.push({ brand: { $in: data[1] } });
  }
  if (data[2]) {
    arr.push({ avg_rating: { $in: data[2] } });
  }
  if (data[3]) {
    arr.push({ price: { $gte: data[3] } });
  }
  if (data[4]) {
    arr.push({ price: { $lte: data[4] } });
  }

  // console.log(count)
  console.log(arr);
  if (product_name) {
    picker = { product_name: { $regex: product_name, $options: "i" } };
  } else {
    picker = { category: category };
  }
  let arrProduct = [];
  if (count == 5) {
    arrProduct = [picker];
  } else {
    arrProduct = [
      {
        $and: arr,
      },
      picker,
    ];
  }
  try {
    // console.log(arrProduct)
    return await Product.find(
      // Find documents matching any of these values
      {
        $and: arrProduct,
      }
    );
    // return await Product.find({'provinceCode':{ "$in": data }});
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> searchTotal: ",
      error.message
    );
  }
}

export async function searchTotalVendor(data, vendor, product_name) {
  let count = 0;
  let arr = [];
  let picker = "";
  for (let a of data) {
    if (a == null) {
      count = count + 1;
    }
    if (a === 0) {
      count = count + 1;
    }
  }
  if (data[0]) {
    arr.push({ provinceCode: { $in: data[0] } });
  }
  if (data[1]) {
    arr.push({ brand: { $in: data[1] } });
  }
  if (data[2]) {
    arr.push({ avg_rating: { $in: data[2] } });
  }
  if (data[3]) {
    arr.push({ price: { $gte: data[3] } });
  }
  if (data[4]) {
    arr.push({ price: { $lte: data[4] } });
  }
  if (data[5]) {
    arr.push({ category: data[5] });
  }

  console.log(count);

  console.log(arr);
  if (product_name) {
    picker = { product_name: { $regex: product_name, $options: "i" } };
  } else {
    picker = { belongs_to_vendor: mongoose.Types.ObjectId(vendor) };
  }
  let arrProduct = [];
  if (count == 6) {
    arrProduct = [picker];
  } else {
    arrProduct = [
      {
        $and: arr,
      },
      picker,
      { belongs_to_vendor: mongoose.Types.ObjectId(vendor) },
    ];
  }
  try {
    // console.log(arrProduct)
    return await Product.find(
      // Find documents matching any of these values
      {
        $and: arrProduct,
      }
    );
    // return await Product.find({'provinceCode':{ "$in": data }});
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> searchTotal: ",
      error.message
    );
  }
}
// export async function searchTotal(arrTotal){
//   try {
//         // console.log(arrProduct)
//         return await Product.find(
//           // Find documents matching any of these values
//           arrTotal
//         )
//         // return await Product.find({'provinceCode':{ "$in": data }});
//       } catch (error) {
//         console.log(
//           "Location: repositories/product.repository.js -> searchTotal: ",
//           error.message
//         );
//       }
// }

export async function getAllProduct(vendorId, limitRecord) {
  try {
    return Product.find({ belongs_to_vendor: vendorId })
      .limit(limitRecord)
      .populate("brand", "brand_name")
      .populate("category", "category_name category_name_vn")
      .select(
        "product_name product_name_en price product_image_urls in_stock created_at"
      )
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getAllProduct: ",
      error.message
    );
  }
}

export async function getPopularProductOfVendor(vendorId, limitRecord) {
  try {
    return await Product.find({ belongs_to_vendor: vendorId, is_popular: true })
      .limit(limitRecord)
      .populate("brand", "brand_name")
      .select("product_name product_name_en price product_image_urls")
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getPopularProductOfVendor: ",
      error.message
    );
  }
}

export async function getAllPopularProduct(limitRecord) {
  try {
    return await Product.find({ is_popular: true })
      .limit(limitRecord)
      .populate("brand", "brand_name")
      .select("product_name product_name_en price product_image_urls")
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getAllPopularProduct: ",
      error.message
    );
  }
}

export async function visitUp(id) {
  try {
    return Product.findByIdAndUpdate(
      { _id: id },
      { $inc: { visit: 1 } },
      { new: true }
    ).lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> visitUp: ",
      error.message
    );
  }
}

export async function getHotPickProducts(limitRecord) {
  try {
    return await Product.find()
      .limit(limitRecord)
      .populate("brand", "brand_name")
      .select("product_name product_name_en price product_image_urls")
      .sort({ visit: -1, created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getHotPickProducts: ",
      error.message
    );
  }
}

export async function addReview(product_id, review_id, new_rating) {
  try {
    const productRelated = await Product.findOne({ _id: product_id });
    const lengthOfReviews = Object.keys(productRelated.reviews).length;

    let count =
      (lengthOfReviews * productRelated.avg_rating + new_rating) /
      (lengthOfReviews + 1);
    //** find product -> có mảng reviews -> lấy (length * rating hiện tại + rating bên review mới) / length +1  */
    return Product.findOneAndUpdate(
      { _id: product_id },
      {
        $push: { reviews: review_id },
        avg_rating: parseFloat(count).toPrecision(7),
      }
    );
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> addReview: ",
      error.message
    );
  }
}

export async function getFashionProduct(limitRecord) {
  try {
    const CategoryIdWomanSwear = "6163ba3f2e391b6cd4bd663f";
    return Product.find({ category: { $in: CategoryIdWomanSwear } }).limit(
      limitRecord
    );
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getFashionProduct: ",
      error.message
    );
  }
}

export async function getInStock(productId) {
  try {
    const product = await Product.findById({ _id: productId });
    return { in_stock: product.in_stock, product_name: product.product_name };
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> getInStock: ",
      error.message
    );
  }
}

export async function softDelete(id) {
  try {
    return Product.delete({ _id: id });
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> softDelete: ",
      error.message
    );
  }
}

export async function restoreProduct(id) {
  try {
    return Product.restore({ _id: id });
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> restoreArticle: ",
      error.message
    );
  }
}

export async function search(filter, page, limit) {
  try {
    const aggregate = Product.aggregate();

    filter.keyword &&
      aggregate.match({
        product_name: {
          $regex: filter.keyword,
          $options: "i",
        },
      });

    Array.isArray(filter.brands) &&
      filter.brands.length > 0 &&
      aggregate.match({
        brand: {
          $in: filter.brands,
        },
      });

    Array.isArray(filter.categories) &&
      filter.categories.length > 0 &&
      aggregate.match({
        category: {
          $in: filter.categories,
        },
      });

    filter.price_min &&
      aggregate.match({
        price: {
          $gte: filter.price_min,
        },
      });

    filter.price_max &&
      aggregate.match({
        price: {
          $lte: filter.price_max,
        },
      });

    filter.belongs_to_vendor &&
      aggregate.match({
        belongs_to_vendor: filter.belongs_to_vendor,
      });

    filter.rating &&
      aggregate.match({
        avg_rating: {
          $gte: filter.rating,
        },
      });

    filter.sort_by === "created_at" &&
      filter.order &&
      aggregate.sort({
        created_at: filter.order,
      });

    // populate brand
    aggregate
      .lookup({
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      })
      .unwind("brand");

    // populate category
    aggregate.lookup({
      from: "productcategories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    });

    // populate vendor
    aggregate
      .lookup({
        from: "users",
        localField: "belongs_to_vendor",
        foreignField: "_id",
        as: "belongs_to_vendor",
      })
      .unwind("belongs_to_vendor");

    aggregate.project({
      brand: {
        __v: 0,
      },
      category: {
        __v: 0,
      },
      belongs_to_vendor: {
        gender: 0,
        is_email_verified: 0,
        __v: 0,
        notification: 0,
        salt: 0,
        hash: 0,
        fcm: 0,
        role: 0,
      },
      __v: 0,
    });

    if (filter.isPaginating) {
      const customLabels = {
        docs: "products",
        totalDocs: "product_count",
        pagingCounter: "first_product_index_of_page",
        nextPage: "next_page",
        prevPage: "prev_page",
        hasNextPage: "has_next_page",
        hasPrevPage: "has_prev_page",
        totalPages: "page_count",
        page: "current_page",
      };

      return Product.aggregatePaginate(aggregate, {
        page: page,
        limit: limit,
        customLabels: customLabels,
      });
    }

    return aggregate;
  } catch (error) {
    console.log(
      "Location: repositories/product.repository.js -> search: ",
      error.message
    );
  }
}
