import { productRepository } from "../../../../repositories/mongodb/index.js";
import mongoose from "mongoose";

async function searchProductsByFilters(req, res, next) {
  console.log(`POST /product/search/`);
  try {
    const {
      keyword = "",
      brands = [],
      categories = [],
      price_min = 0,
      price_max,
      page = 1,
      limit = 1,
      vendorId = "",
      rating = 0,
      sort_by = "created_at", // currently have "created_at" value only
      order = -1, // 1 is ascending, -1 is descending
      isPaginating = false, // toggle pagination
    } = req.body;
    const filter = {};
    if (keyword != "") {
      filter.keyword = keyword;
    }
    //check is array
    if (Array.isArray(brands) && brands.length > 0) {
      filter.brands = brands.map((item) => mongoose.Types.ObjectId(item)); // Returns array of ObjectId
    }
    if (Array.isArray(categories) && categories.length > 0) {
      filter.categories = categories.map((item) => mongoose.Types.ObjectId(item));
    }
    if (!isNaN(price_min)) {
      filter.price_min = Number(price_min);
    }
    if (!isNaN(price_max)) {
      filter.price_max = Number(price_max);
    }
    if (vendorId != "") {
      filter.belongs_to_vendor = mongoose.Types.ObjectId(vendorId);
    }

    if (sort_by === "created_at") {
      filter.sort_by = sort_by;
    }
    if (!isNaN(order)) {
      filter.order = order;
    }
    if (!isNaN(rating)) {
      filter.rating = rating;
    }

    filter.isPaginating = isPaginating;

    const data = await productRepository.search(filter, page, limit);
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/searchProductsByFilters.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default searchProductsByFilters;
