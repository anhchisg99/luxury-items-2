import {
  productRepository,
  districtRepository,
} from "../../../../repositories/mongodb/index.js";
import mongoose from "mongoose";

async function queryByKeywords(req, res, next) {
  const {
    keyword = "",
    category = [],
    page = 0,
    limit = 0,
    provinceCode = "",
    districtCode = "",
    vendorId = "",
  } = req.query;
  console.log(`GET /product${req.url} api`);
  const dbQuery = {};
  if (keyword != "") {
    dbQuery.$text = {
      $search: keyword,
    };
  }
  if (Array.isArray(category) && category.length > 0) {
    dbQuery.category = {
      $all: category.map((item) => mongoose.Types.ObjectId(item)),
    };
  } else if (category != "") {
    dbQuery.category = {
      $all: mongoose.Types.ObjectId(category),
    };
  }
  if (vendorId != "") {
    dbQuery.belongs_to_vendor = mongoose.Types.ObjectId(vendorId);
  }

  // Search for location
  no_province: if (provinceCode.length < 1) {
    if (districtCode.length > 0) {
      break no_province;
    }
  } else {
    if (districtCode.length < 0) {
      if (provinceCode != "") {
        dbQuery.provinceCode = provinceCode;
      }
    } else {
      const districtOfProvince = await districtRepository.getProvinceCode(
        districtCode
      );
      for (let i = 0; i < districtOfProvince.length; i++) {
        if (provinceCode.includes(districtOfProvince[i].parent_code)) {
          if (districtCode != "") {
            dbQuery.districtCode = districtCode;
          }
        }
      }
    }
  }
  
  try {
    const data = await productRepository.queryByKeywords(dbQuery, page, limit);
    res.send(data);
  } catch (error) {
    console.log(
      "Location: controllers/product/guest/queryByKeywords.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default queryByKeywords;
