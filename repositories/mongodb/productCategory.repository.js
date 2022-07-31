import { ProductCategory } from "../../models/index.js";

export async function createOne(productCategoryData) {
  try {
    return ProductCategory.create(productCategoryData);
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function getSubCategories() {
  try {
    //INFO: .lean() means converting mongoose object to plain javascript object
    return ProductCategory.find({ parent: { $ne: null } })
      .select("-created_at -updated_at -__v")
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> getSubCategories: ",
      error.message
    );
  }
}

export async function getRootCategories() {
  try {
    //INFO: .lean() means converting mongoose object to plain javascript object
    return ProductCategory.find({ parent: null })
      .select("-description -parent -created_at -updated_at -__v")
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> getRootCategories: ",
      error.message
    );
  }
}

export async function getOne(productCategoryId) {
  try {
    return ProductCategory.findById(productCategoryId).select(
      "-created_at -updated_at -__v"
    );
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> getOne: ",
      error.message
    );
  }
}

export async function updateOne(productCategoryId, productCategoryData) {
  try {
    productCategoryData.updated_at = new Date();
    return ProductCategory.findByIdAndUpdate(
      productCategoryId,
      productCategoryData,
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> updateOne: ",
      error.message
    );
  }
}

export async function deleteOne(productCategoryId) {
  try {
    return ProductCategory.findByIdAndRemove(productCategoryId);
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> deleteOne: ",
      error.message
    );
  }
}

export async function getCategoriesHome(limitRecord) {
  try {
    return ProductCategory.find({ parent: null }).select('category_name category_name_vn').limit(limitRecord)
  } catch (error) {
    console.log(
      "Location: repositories/comment.repository.js -> getCategoriesHome: ",
      error.message
    );
  }
}

export async function getAllCategories() {
  try {
    return ProductCategory.find({ parent: null }).select(
      "category_name category_name_vn"
    ).sort({ created_at: -1 });
  } catch (error) {
    console.log(
      "Location: repositories/productCategory.repository.js -> getAllCategories: ",
      error.message
    );
  }
}

